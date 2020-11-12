<?php


namespace App\Controller;


use App\Entity\User;
use App\Form\UserType;
use Exception;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


class UsersController extends AbstractFOSRestController
{

    /**
     * @Route(name="login", path="/log-in", methods={"POST"})
     * @param Request $request
     * @param JWTTokenManagerInterface $JWTManager
     * @param UserPasswordEncoderInterface $encoder
     * @return JsonResponse
     */
    public function loginAction(Request $request, JWTTokenManagerInterface $JWTManager, UserPasswordEncoderInterface $encoder)
    {
        $repository = $this->getDoctrine()->getRepository(User::class);

        $data = json_decode($request->getContent(), true);

        /** @var User $user */
        $user = $repository->findOneBy(["username" => $data['username']]);

        if ($user->getPassword() == $encoder->encodePassword($user, $data['password'])){
            return new JsonResponse(['token' => $JWTManager->create($user)]);
        } else {
            return new JsonResponse([
                401,
                'message' => "Invalid Credentials."
                ]);
        }

    }

    /**
     * @Route(name="register", path="/register", methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return JsonResponse $user
     * @throws Exception
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];


        $serializer = new Serializer( $normalizers, $encoders);

        $data = json_decode($request->getContent(), true);

        $user = new User;
        /*$user->setUsername($data['username']);
        $user->setFirstName($data['first_name']);
        $user->setLastName($data['last_name']);
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);*/


        $em = $this->getDoctrine()->getManager();
        $user->setCreatedAt(new \DateTime());

        //throw Exception if password do not match
        if ($data['password'] != $data['retyped_password'])
        {
            throw new Exception("Passwords do not match");
        }

        //Encoded password using sodium algorithm
        $data['password'] = $encoder->encodePassword($user, $data['password']);

        $form = $this->get('form.factory')->create(UserType::class, $user);


        /** @var Form $form*/
        $form->submit($data);

        if ($form->isSubmitted())
        {
            $em->persist($user);
            $em->flush();
        }

        return $this->json($user);

    }

}
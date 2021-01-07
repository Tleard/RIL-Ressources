<?php


namespace App\Controller;


use App\Entity\User;
use App\Form\UsersType;
use Exception;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use FOS\RestBundle\View\View as FosRestView;
use Symfony\Component\HttpFoundation\Response;


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
                'message' => "Invalid Credentials."
                ], Response::HTTP_UNAUTHORIZED);
        }

    }

    /**
     * @Route(name="register", path="/register", methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return FosRestView|Response
     * @throws Exception
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $encoder)
    {

        $data = json_decode($request->getContent(), true);

        $user = new User;

        $em = $this->getDoctrine()->getManager();
        $user->setCreatedAt(new \DateTime());

        //throw Exception if password do not match
        if ($data['password'] != $data['retyped_password'])
        {
            throw new Exception("Passwords do not match");
        }

        //Encoded password using sodium algorithm
        $data['password'] = $encoder->encodePassword($user, $data['password']);

        try {
            $form = $this->createForm(UsersType::class, $user);

            /** @var Form $form*/
            $form->submit($data);

            if (!$form->isValid())
            {
                $errors = array();

                //Parse errors to print in Json format
                foreach ($form->getErrors() as $error) {
                    $errors[$form->getName()][] = $error->getMessage();
                }

                foreach ($form as $child /** @var Form $child */) {
                    if (!$child->isValid()) {
                        foreach ($child->getErrors() as $error) {
                            $errors[$child->getName()][] = $error->getMessage();
                        }
                    }
                }

                return new JsonResponse([
                    $errors
                ], Response::HTTP_BAD_REQUEST);
            }

            if ($form->isSubmitted())
            {
                $em->persist($user);
                $em->flush();
            }

            return new JsonResponse([
                $user
            ], Response::HTTP_CREATED);

            //return $user;
        } catch (\Exception $exception) {
            return new JsonResponse(['message' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }

    }

}
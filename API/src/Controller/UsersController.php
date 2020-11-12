<?php


namespace App\Controller;


use App\Entity\User;
use App\Form\UserType;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Constraints\Json;
use Symfony\Component\Form\FormFactoryInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class UsersController extends AbstractFOSRestController
{

    /**
     * @Route(name="login", path="/log-in", methods={"POST"})
     * @param Request $request
     * @param JWTTokenManagerInterface $JWTManager
     * @return JsonResponse
     */
    public function loginAction(Request $request, JWTTokenManagerInterface $JWTManager)
    {
        $repository = $this->getDoctrine()->getRepository(User::class);

        $content = json_decode($request->getContent(), true);


        /** @var User $user */
        $user = $repository->findOneBy(["username" => $content['username']]);

        if ($user->getPassword() == $content['password']){
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
     * @return JsonResponse $user
     */
    public function registerAction(Request $request)
    {

        $data = json_decode($request->getContent(), true);

        $em = $this->getDoctrine()->getManager();
        $user = new User;
        $user->setCreatedAt(new \DateTime());

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
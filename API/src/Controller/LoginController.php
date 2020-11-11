<?php


namespace App\Controller;


use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;


class LoginController extends AbstractController
{
    /**
     * @Route(name="lagin", path="/log-in", methods={"POST"})
     * @param Request $request
     * @param JWTTokenManagerInterface $JWTManager
     * @return JsonResponse
     */
    public function lagin(Request $request, JWTTokenManagerInterface $JWTManager)
    {
        //Todo: Replace By Repository function
        $repository = $this->getDoctrine()->getRepository(User::class);

        $parameters = json_decode($request->getContent(), true);

        /** @var User $user */
        $user = $repository->findOneBy(["username" => $parameters['username']]);

        if ($user->getPassword() == $parameters['password']){
            return new JsonResponse(['token' => $JWTManager->create($user)]);
        } else {
            return new JsonResponse([
                401,
                'message' => "Invalid Credentials."
                ]);
        }

    }
}
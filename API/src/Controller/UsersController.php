<?php


namespace App\Controller;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\Form\UsersType;
use App\Kernel;
use Exception;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Tests\Functional\Utils\CallableEventSubscriber;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use FOS\RestBundle\View\View as FosRestView;
use Symfony\Component\HttpFoundation\Response;
use App\Controller\EmailSubscriberController;



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

        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);

        /** @var User $user */
        $user = $repository->findOneBy(["username" => $data['username']]);

        $userPassword = $em->getRepository(User::class)->findOneByUserForPassword($data['username']);

        if ($userPassword == $encoder->encodePassword($user, $data['password'])){
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
     * @param $mailer
     * @return FosRestView|Response
     * @throws Exception
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $encoder, \Swift_Mailer $mailer)
    {

        $data = json_decode($request->getContent(), true);

        $user = new User;

        $em = $this->getDoctrine()->getManager();
        $user->setCreatedAt(new \DateTime());
        //Todo :Improve
        $user->setIsBanned(false);
        $user->setRoles([User::ROLE_USER]);


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
                function generateRandomString($length = 10) {
                    $bytes = random_bytes($length);
                    return substr(strtr(base64_encode($bytes), '+/', '-_'), 0, $length);
                }
                $code = generateRandomString($length = 10);
                $user->setCodeConfirmation($code);
                $em->persist($user);
                $em->flush();
                $message = (new \Swift_Message('Hello Email'))
                    ->setFrom('ressourcesrelationelle@gmail.com')
                    ->setTo('barbe.maxime.pro@gmail.com')
                    ->setSubject('Veuillez confirmer votre compte')
                    ->setBody("Bienvenue sur Ressources Relationelles veuillez confirmer 
                    votre compte via l'addresse suivante : http://localhost:8000/confirmation/?code=$code");
                ;


                $mailer->send($message);




                ;


            }
            return $this->json($message, Response::HTTP_CREATED);


            //return $user;
        } catch (\Exception $exception) {
            return new JsonResponse(['message' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * @Route(name="confirmation", path="/confirmation", methods={"GET"})
     * @return FosRestView|Response
     * @throws Exception
     * @param Request $request
     */
    public function confirmation(Request $request){
        $code = $_GET['code'];

        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->findBy([
            'codeConfirmation' => $code
        ]);


        $user[0]->setIsValid(true);

        $entityManager->flush();




        return $this->json($user, Response::HTTP_CREATED);

    }

/*
    /**
     * @Route(name="testMail", path="/testMail", methods={"POST"})
     * @param $mailer

    public function testMail(\Swift_Mailer $mailer){
        $message = (new \Swift_Message('Hello Email'))
            ->setFrom('ressourcerelationelle@gmail.com')
            ->setTo('barbe.maxime.pro@gmail.com')
            ->setBody('You should see me from the profiler!')
        ;

        $mailer->send($message);


    }

*/

}
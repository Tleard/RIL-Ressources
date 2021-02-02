<?php


namespace App\Controller;



use ApiPlatform\Core\EventListener\EventPriorities;

use App\Entity\Asset;

use App\Entity\Report;
use App\Entity\Resource;
use App\Entity\User;
use App\Form\UsersPatchType;
use App\Form\UsersType;

use App\Kernel;

use App\Service\FileManager;
use Doctrine\ORM\NonUniqueResultException;

use Exception;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Tests\Functional\Utils\CallableEventSubscriber;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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


use Symfony\Component\Validator\Constraints as Assert;



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
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);

        /** @var User $user */
        $user = $em->getRepository(User::class)->findOneBy(["username" => $data['username']]);

        $userPassword = $em->getRepository(User::class)->findOneByUserForPassword($data['username']);

        if ($userPassword == $encoder->encodePassword($user, $data['password'])){
            return $this->json([
                'token' => $JWTManager->create($user),
                'user' => $user
            ]);
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
                    ->setTo($user->getEmail())
                    ->setSubject('Veuillez confirmer votre compte')
                    ->setBody("Bienvenue sur Ressources Relationelles veuillez confirmer 
                    votre compte via l'addresse suivante : http://localhost:8000/confirmation/?code=$code");



                $mailer->send($message);







            }
            return $this->json($message, Response::HTTP_CREATED);


            //return $user;
        } catch (\Exception $exception) {
            return new JsonResponse(['message' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }

    }
    //Todo : patchUser & DeleteUser

    /**
     * @Route(name="add_profile_picture", path="/api/user/profile_picture/{userId}", methods={"POST"})
     * @param Request $request
     * @param FileManager $fileManager
     * @throws Exception
     */
    public function addProfilePicture(Request $request, FileManager $fileManager)
    {
        $userId= $request->get('userId');
        $em = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user =$em->getRepository(User::class)->find($userId);

        if(empty($user))
        {
            throw new Exception("Could not find user n°" . $userId , Response::HTTP_NOT_FOUND);
        }

        if ($this->getUser() != $user|| !in_array('ROLE_ADMIN', $this->getUser()->getRoles()))
        {
            throw new Exception("You do not have the authorization to modify this user." , Response::HTTP_UNAUTHORIZED);
        }

        if (!$request->files->get('asset'))
        {
            throw new Exception("Your request was incorrect", Response::HTTP_BAD_REQUEST);
        }

        /** @var UploadedFile $profilePicture */
        $profilePicture = $request->files->get('asset');
        if (!in_array($profilePicture->getMimeType(), $fileManager::AUTHORIZED_IMAGE_TYPE))
        {
            throw new Exception("File format '" . $profilePicture->getType() . "' is not valid");
        }

        $asset = $fileManager->UploadFile($profilePicture, $this->getParameter("kernel.project_dir"));

        if ($user->getProfilePicture() !== NULL)
        {
            $profilePicturePath = $this->getParameter('kernel.project_dir') . "/public/uploads/" . $user->getProfilePicture()->getFileName();
            unlink($profilePicturePath);
        }

        $user->setProfilePicture($asset);
        $em->persist($user);
        $em->flush();

        return $this->json($asset, Response::HTTP_CREATED);
    }

    /**
     * @Route(name="show_user", path="/api/user/{userId}", methods={"GET"})
     * @param Request $request
     * @throws Exception
     */
    public function showUserAction(Request $request): JsonResponse
    {
        $userId = $request->get('userId');
        $em = $this->getDoctrine()->getManager();

        try {
            $user = $em->getRepository(User::class)->find($userId);
        } catch (NonUniqueResultException $nonUniqueResultException)  {
            throw new Exception($nonUniqueResultException->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        if ($user == NULL)
        {
            throw new Exception("Could not find user n°" . $userId , Response::HTTP_NOT_FOUND);
        }

        return $this->json($user, Response::HTTP_FOUND);
    }

    /**
     * @Route(name="delete_user", path="/api/user/{userId}", methods={"DELETE"})
     * @param Request $request
     * @throws Exception
     */
    public function deleteUserAction(Request $request)
    {
        $userId = $request->get('userId');
        $em = $this->getDoctrine()->getManager();

        try {
            $user = $em->getRepository(User::class)->find($userId);
        } catch (NonUniqueResultException $nonUniqueResultException)  {
            throw new Exception($nonUniqueResultException->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        if ($user == NULL)
        {
            throw new Exception("Could not find user n°" . $userId , Response::HTTP_NOT_FOUND);
        }

        $em->remove($user);

        $this->json('User n°' . $userId . " deleted.");
    }

    /**
     * @Route(name="patch_user", path="/api/user/{userId}", methods={"PATCH"})
     * @param Request $request
     * @throws Exception
     */
    public function patchUserAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $userId = $request->get('userId');
        $em = $this->getDoctrine()->getManager();

        try {
            $user = $em->getRepository(User::class)->find($userId);
        } catch (NonUniqueResultException $nonUniqueResultException)  {
            throw new Exception($nonUniqueResultException->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        if ($user == NULL)
        {
            throw new Exception("Could not find user n°" . $userId , Response::HTTP_NOT_FOUND);
        }

        try {
            //Todo: Pass option to UsersType instead
            $form = $this->createForm(UsersPatchType::class, $user);

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
            return $this->json($user, Response::HTTP_CREATED);

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
        $code = $request->query->get('code');


        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->findBy([
            'codeConfirmation' => $code
        ]);


        $user[0]->setIsValid(true);
        $entityManager->persist($user);
        $entityManager->flush();




        return $this->json(['message' => 'votre compte a bien ete valide '], Response::HTTP_CREATED);

    }
    /**
     * @Route(name="report_user", path="/api/user/report_user", methods={"POST"})
     * @param Request $request
     * @throws Exception
     */
    public function reportUser(Request $request){
        $em = $this->getDoctrine()->getManager();
        $userId = $request->get('user_id');
        $userReported = $em->getRepository(User::class)->findBy([
            'id' => $userId
        ]);

        if ($request->get('comment') != ""){
            $comment = $request->get('comment');
        }
       $reporterId = $this->getUser()->getId();

       $reporter = $em->getRepository(User::class)->findBy([
           'id' => $reporterId
       ]);

       $report = new Report();
       $report->setDate(new \DateTime());
       $report->setReportedUser($userReported[0]);
       $report->setReportBy($reporter[0]);
       if ($comment){
           $report->setComment($comment);
       }
       $em->persist($report);
       $em->flush();

        return $this->json(['message' => 'Merci pour votre signalement'], Response::HTTP_CREATED);
    }

    /**
     * @Route (name="report_ressource", path="/api/user/report_ressource", methods="POST")
     * @param Request $request
     * @throws Exception
     */
    public function reportRessource(Request $request){
        $em = $this->getDoctrine()->getManager();
        $ressId = $request->get('ressource_id');
        $ressource = $em->getRepository(Resource::class)->findBy([
            'id' => $ressId
        ]);
        if ($request->get('comment') != ""){
            $comment = $request->get('comment');
        }
        $reporterId = $this->getUser()->getId();

        $reporter = $em->getRepository(User::class)->findBy([
            'id' => $reporterId
        ]);
        $report = new Report();
        $report->setDate(new \DateTime());
        $report->setReportRessource($ressource[0]);
        $report->setReportBy($reporter[0]);
        if ($comment){
            $report->setComment($comment);
        }
        $em->persist($report);
        $em->flush();
        return $this->json(['message' => 'Merci pour votre signalement'], Response::HTTP_CREATED);
    }

    /**
     * @Route (name="saveResInLib", path="/api/user/saveResInLib", methods={"POST"})
     * @param Request $request
     * @throws Exception
     */
    public function saveResInLib(Request $request){
        $em = $this->getDoctrine()->getManager();
        $ressId = $request->get('ressource_id');
        $ressource = $em->getRepository(Resource::class)->find([
            'id' => $ressId
        ]);
        $userId = $this->getUser()->getId();
        $user = $em->getRepository(User::class)->find([
            'id' => $userId
        ]);
        $user->addLibrary($ressource);
        $em->persist($user);
        $em->flush();
        return $this->json(['message' => 'ressource ajoutée à la bibliothèque'], Response::HTTP_CREATED);
    }

    /**
     * @Route(name="getLibrary", path="/api/user/getLib", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function getMyLib(Request $request){
        $userId = $this->getUser()->getId();
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find([
            'id' => $userId
        ]);
        $lib = $user->getLibrary();
        if (count($lib) > 0){
            return $this->json($lib, Response::HTTP_CREATED);
        } else {
            return $this->json(['message' => "vous n'avez aucune ressource enregistrée"]);
        }
    }

    /**
     * @Route(name="removeFromLib", path="/api/user/removeFromLib", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function removeFromLib(Request $request){
        $resId = $request->get('ressource_id');
        $userId = $this->getUser()->getId();
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find([
            'id' => $userId
        ]);
        $res = $em->getRepository(Resource::class)->find([
            'id' => $resId
        ]);
        $user->removeLibrary($res);
        $em->persist($user);
        $em->flush();
        return $this->json(['message' => 'ressource retirée de la bibliothèque']);

    }

    /**
     * @Route(name="getRoles", path="/api/user/getRoles", methods={"POST"})
     * @return JsonResponse
     */
    public function getRoles(){
        $role = $this->getUser()->getRoles();
        if ($role[0] == "ROLE_ADMIN"){
            return $this->json(['roles' => 'admin']);
        } else {
            return $this->json(['roles' => 'user']);
        }
    }

}
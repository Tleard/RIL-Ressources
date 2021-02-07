<?php


namespace App\Controller;


use App\Entity\Report;
use App\Entity\Resource;
use App\Entity\User;
use App\Entity\Warning;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\Exception\Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use PhpParser\Node\Scalar\String_;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\View\View as FosRestView;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractFOSRestController


{ /*
    /**
     * @Route(name="adminHome", path="/admin/logadmin", methods={"GET"})
     * @return String
     */
    /*
    public function adminHome(){

        return $this->render('admin.html.twig', [
            'message' => ''
        ]);
    }
    */





    /**
     * @Route(name="getAllReportsResUnclosed", path="/api/admin/getReportResUnClosed", methods={"POST"})
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     *
     */
    public function getAllReportRessUnclosed(){
        $null = null;
        $em = $this->getDoctrine()->getManager();
        $rQ = $em->getRepository(Report::class)->createQueryBuilder('r')
            ->andWhere('r.is_closed IS  null AND r.report_ressource IS NOT null');

        $reports = $rQ->getQuery()->getResult();
        return $this->json($reports);
    }
    /**
     * @Route(name="getAllReportsUserUnclosed", path="/api/admin/getAllReportUserUnClosed", methods={"POST"})
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     *
     */
    public function getAllReportUsersUnclosed(){
        $null = null;
        $em = $this->getDoctrine()->getManager();
        $uQ = $em->getRepository(Report::class)->createQueryBuilder('r')
            ->andWhere('r.is_closed IS  null AND r.report_user IS NOT null');

        $users = $uQ->getQuery()->getResult();
        return $this->json($users);
    }

    /**
     * @Route(name="getAllReports", path="/api/admin/reportsHistory", methods={"POST"})
     * @throws Exception
     * @return JsonResponse
     *
     */
    public function getAllReports(){
        $em = $this->getDoctrine()->getManager();
        $reports = $em->getRepository(Report::class)->findAll();

        return $this->json($reports,Response::HTTP_CREATED);
    }

    /**
     * @Route(name="showReportByCase", path="/api/admin/reportByCase", methods={"GET"})
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     */
    public function showReportByCase(Request $request){

        $repId = $request->query->get('report_id');

        $em = $this->getDoctrine()->getManager();

        $report = $em->getRepository(Report::class)->find([
            'id' => $repId
        ]);

        return $this->json($report,Response::HTTP_CREATED);
    }

    /**
     * @Route(name="closeReport", path="/api/admin/closeReport", methods={"GET"})
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     */
    public function closeReport(Request $request){
        $em = $this->getDoctrine()->getManager();
        $repId = $request->query->get('report_id');

        $report = $em->getRepository(Report::class)->find([
            'id' => $repId
        ]);

        $report->setIsClosed(true);
        $em->flush();
        $em->persist($report);


        return $this->json('Signalement traité');

    }



    /**
     * @Route(name="closeAndWarnUser", path="/api/admin/closeAndWarnUser", methods={"POST"})
     * @param Request $request
     * @param $mailer
     * @throws Exception
     * @return JsonResponse
     */

    public function closeAndWarnUser(Request $request, \Swift_Mailer $mailer){
        $em = $this->getDoctrine()->getManager();

        $repId = $request->query->get('report_id');
        $report = $em->getRepository(Report::class)->find([
            'id' => $repId
        ]);

        $user = $em->getRepository(User::class)->find([
            'id' => $report->getReportedUser()
        ]);

        $warn = new Warning();

        $warn->setCreatedAt(new \DateTime());
        $warn->setUserWarned($user);

        $message = (new \Swift_Message('Hello Email'))
            ->setFrom('ressourcesrelationelle@gmail.com')
            ->setTo($user->getEmail())
            ->setSubject('Nouvel Avertissement')
            ->setBody("Votre activité sur l'application resosurce relationnelle a 
            été signalé, suite à l'observation de ce signalement nous avons décidé de vous faire 
            écoper d'un avertissement, veuillez désormais prêter attention à vos agissements 
            ou nous serons contraints d'apporter des sanctions plus lourdes, veuillez noter 
            que tout les incidents sont conservés en vu de possibles poursuites
            
            Cordialement l'équipe de Ressource Relationnelle ");




        $mailer->send($message);
        $report->setIsClosed(true);

        $em->persist($user);
        $em->persist($warn);
        $em->persist($report);

        $em->flush();

        return $this->json("Singalement traité, utilisateur averti");



    }

    /**
     * @Route(name="closeAndBlockUser", path="/api/admin/closeAndBlockUser", methods={"POST"})
     * @param Request $request
     * @param $mailer
     * @throws Exception
     * @return JsonResponse
     */
    public function closeAndBlockUser(Request $request, \Swift_Mailer $mailer){
        $em = $this->getDoctrine()->getManager();

        $repId = $request->query->get('report_id');
        $report = $em->getRepository(Report::class)->find([
            'id' => $repId
        ]);

        $user = $em->getRepository(User::class)->find([
            'id' => $report->getReportedUser()
        ]);

        $user->setIsBanned(true);
        $message = (new \Swift_Message('Hello Email'))
            ->setFrom('ressourcesrelationelle@gmail.com')
            ->setTo($user->getEmail())
            ->setSubject('Nouvel Avertissement')
            ->setBody("Votre activité sur l'application resosurce relationnelle a été signalé, 
                             suite à l'observation de ce signalement nous avons décidé 
                            de bloquer l'accès à votre compte, veuillez noter que si vous avez enfreint la loi, 
                            ce blocage peut faire l'objet de poursuite judiciaire
                            
                            Cordialement l'équipe de Ressource Relationnelle ");




        $mailer->send($message);
        $report->setIsClosed(true);

        $em->persist($user);

        $em->persist($report);

        $em->flush();

        return $this->json("Singalement traité, utilisateur bloqué");

    }

    /**
     * @Route(name="getUserBlockedList", path="/api/admin/getUserBlockedList", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     *
     */
    public function getUserBlockedList(Request $request){
        $em = $this->getDoctrine()->getManager();
        $userList = $em->getRepository(User::class)->findBy(
            ['isBanned' => true]
        );

            return $this->json($userList);

        
    }

    /**
     * @Route(name="getResBlockedList", path="/api/admin/getResBlockedList", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     *
     */
    public function getResBlockedList(Request $request){
        $em = $this->getDoctrine()->getManager();
        $userList = $em->getRepository(Resource::class)->findBy(
            ['is_blocked' => true]
        );

        return $this->json($userList);


    }

    /**
     * @Rest\Post(
     *     path = "/api/admin/deblockUser",
     *     name = "deblock_user"
     * )
     * @param Request $request
     * @return FosRestView|Response
     * @throws \Exception
     */
    public function deblockUserAction(Request $request)
    {


        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);


        //  return $this->json($categoryId);
        try {
            $user = $em->getRepository(User::class)->find($data['u']);
            if ($user == null)
            {
                throw new \Exception('User could not be find', Response::HTTP_NOT_FOUND);
            }
            /** @var User $user*/
            $user->setIsBanned(false);
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $em->persist($user);
        $em->flush();

        return $this->json($user,
            Response::HTTP_FOUND);

    }

    /**
     * @Rest\Post(
     *     path = "/api/admin/deblockRes",
     *     name = "deblock_res"
     * )
     * @param Request $request
     * @return FosRestView|Response
     * @throws \Exception
     */
    public function deblockResAction(Request $request)
    {


        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);


        //  return $this->json($categoryId);
        try {
            $res = $em->getRepository(Resource::class)->find($data['r']);
            if ($res == null)
            {
                throw new \Exception('User could not be find', Response::HTTP_NOT_FOUND);
            }
            /** @var Resource $res*/
            $res->setIsBlocked(false);
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $em->persist($res);
        $em->flush();

        return $this->json($res,
            Response::HTTP_FOUND);

    }
    /**
     * @Route(name="closeAndDeleteRessource", path="api/admin/closeandblockres", methods={"POST"})
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     *
     */

    public function closeAndBlockRessource(Request $request){

        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);
        $report = $em->getRepository(Report::class)->find([
            'id' => $data['r']
        ]);

        $resource = $em->getRepository(Resource::class)->find([
            'id' => $report->getReportRessource()
        ]);

        $resource->setIsBlocked(true);
        $report->setIsClosed(true);

        $em->flush();
        $em->persist($resource);
        $em->persist($report);


        return $this->json('Signalement traité, ressource bloquée');


    }
}
<?php


namespace App\Controller;


use App\Entity\Report;
use App\Entity\Resource;
use App\Entity\User;
use App\Entity\Warning;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use JMS\Serializer\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractFOSRestController


{
    /**
     * @Route(name="getAllReportsUnclosed", path="/api/admin/getAllReportUnClosed", methods={"POST"})
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     *
     */
    public function getAllReportsUnclosed(){
        $em = $this->getDoctrine()->getManager();
        $reports = $em->getRepository(Report::class)->findBy([
            'is_closed' => null
        ]);

        return $this->json($reports);
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
     * @Route(name="closeAndDeleteRessource", path="api/admin/closeandblockres", methods={"POST"})
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     *
     */

    public function closeAndBlockRessource(Request $request){
        $em = $this->getDoctrine()->getManager();

        $repId = $request->query->get('report_id');
        $report = $em->getRepository(Report::class)->find([
            'id' => $repId
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
            ->setBody("Votre activité sur l'application resosurce relationnelle a été signalé, suite à l'observation de ce signalement nous avons décidé de vous faire 
            écoper d'un avertissement, veuillez désormais prêter attention à vos agissements ou nous serons contraints d'apporter des sanctions plus lourdes, veuillez noter 
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
            ->setBody("Votre activité sur l'application resosurce relationnelle a été signalé, suite à l'observation de ce signalement nous avons décidé de bloquer l'accès à votre 
            compte, veuillez noter que si vous avez enfreint la loi, ce blocage peut faire l'objet de poursuite judiciaire
            
            Cordialement l'équipe de Ressource Relationnelle ");




        $mailer->send($message);
        $report->setIsClosed(true);

        $em->persist($user);

        $em->persist($report);

        $em->flush();

        return $this->json("Singalement traité, utilisateur bloqué");

    }
}
<?php


namespace App\Controller;


use App\Entity\Report;
use App\Entity\Resource;
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
     * @Route(name="closeAndDeleteRessource", path="api/admin/closeanndelres", methods={"POST"})
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     *
     */

    public function closeAndDeleteRessource(Request $request){
        $em = $this->getDoctrine()->getManager();

        $repId = $request->query->get('report_id');
        $report = $em->getRepository(Report::class)->find([
            'id' => $repId
        ]);

        $resource = $em->getRepository(Resource::class)->find([
            'id' => $report->getReportRessource()
        ]);

        $em->remove($resource);

        $report->setIsClosed(true);
// TODO spécifier si la ressource doit être bloquée ou supprimer
        $em->flush();
        $em->persist($resource);
        $em->persist($report);


        return $this->json('Signalement traité, ressource supprimée');


    }



}
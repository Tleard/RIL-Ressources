<?php


namespace App\Controller;


use App\Entity\Report;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use JMS\Serializer\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractFOSRestController


{
    /**
     * @Route(name="getAllReportsUnclosed", path="/api/admin/getAllRessourceUnClosed", methods={"POST"})
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
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     *
     */
    public function getAllReports(){
        $em = $this->getDoctrine()->getManager();
        $reports = $em->getRepository(Report::class)->findAll();

        return $this->json($reports);
    }

    /**
     *
     */
    public function showReportRessource(){

        $em = $this->getDoctrine()->getManager();
    }
}
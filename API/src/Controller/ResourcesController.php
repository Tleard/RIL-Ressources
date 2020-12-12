<?php

namespace App\Controller;

use App\Entity\Resources;
use App\Repository\ResourcesRepository;
use Doctrine\ORM\NonUniqueResultException;
use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use FOS\RestBundle\View\View as FosRestView;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ResourcesController extends AbstractController
{
    /**
     * @Rest\Get(
     *     path = "/api/resources/{id}",
     *     name = "get_resource"
     * )
     * @param Request $request
     * @return FosRestView|Response
     */
    public function showAction(Request $request) :Response
    {
        if ($request->get('id') == '{id}') {
            return FosRestView::create(
                ['Message' => 'The resource id should be mentioned!'],
                Response::HTTP_BAD_REQUEST
            );
        }

        $em = $this->getDoctrine()->getManager();

        try {
            $qb = $em->getRepository(Resources::class)
                ->createQueryBuilder('r');

            $qb->where('r.id = :id')->setParameter('id', $request->get('id'));
            $resources = $qb->getQuery()->getArrayResult();


        } catch (NonUniqueResultException $nonUniqueResultException) {
            return FosRestView::create(['message' => 'Non unique result'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $response = new Response(json_encode($resources));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Rest\Get(
     *     path = "/api/resources",
     *     name = "list_resource"
     * )
     * @param Request $request
     * @return FosRestView|Response
     */
    public function listAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        try {
            $qb = $em->getRepository(Resources::class)
                ->createQueryBuilder('r');

            $resources = $qb->getQuery()->getArrayResult();


        } catch (NonUniqueResultException $nonUniqueResultException) {
            return FosRestView::create(['message' => 'Non unique result'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $response = new Response(json_encode($resources));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }
}

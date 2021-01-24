<?php

namespace App\Controller;

use App\Entity\ResourceCategory;
use Doctrine\ORM\NonUniqueResultException;
use FOS\RestBundle\View\View as FosRestView;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;

class ResourcesCategoryController extends AbstractController
{
    /**
     * @Rest\Get(
     *     path = "/api/resources_category",
     *     name = "list_resource_category"
     * )
     * @param Request $request
     * @return FosRestView|Response
     */
    public function listResourcesAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        try {
            $qb = $em->getRepository(ResourceCategory::class)
                ->createQueryBuilder('rc');

            $resources = $qb->getQuery()->getResult();

        } catch (NonUniqueResultException $nonUniqueResultException) {
            return FosRestView::create(['message' => 'Non unique result'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($resources,
            Response::HTTP_CREATED);

    }
}

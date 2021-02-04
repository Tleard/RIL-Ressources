<?php

namespace App\Controller;

use App\Entity\ResourceCategory;
use Doctrine\ORM\NonUniqueResultException;
use FOS\RestBundle\View\View as FosRestView;
use mysql_xdevapi\Exception;
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
    public function listCategoriesAction(Request $request)
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
            Response::HTTP_FOUND);

    }

    /**
     * @Rest\Post (
     *     path = "/api/admin/addCategory",
     *     name = "create_resource_category"
     * )
     * @param Request $request
     * @return FosRestView|Response
     * @throws \Exception
     */
    public function createCategoriesAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);


        if ($data['name'] == null || gettype($data['name']) !== "string")
        {
            throw new \Exception('You should provide a name to the category', Response::HTTP_BAD_REQUEST);
        }

        $category = new ResourceCategory();
        $category->setName($data['name']);
        $category->setStatus(0);

        $em->persist($category);
        $em->flush();

        return $this->json($category,
            Response::HTTP_CREATED);
    }


    /**
     * @Rest\Post(
     *     path = "/api/admin/delete_category",
     *     name = "delete_resource_category"
     * )
     * @param Request $request
     * @return FosRestView|Response
     * @throws \Exception
     */
    public function deleteCategoriesAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);


        //  return $this->json($categoryId);
      try {
            $category = $em->getRepository(ResourceCategory::class)->find($data['c']);
            if ($category == null)
            {
                throw new \Exception('Category could not be find', Response::HTTP_NOT_FOUND);
            }
            /** @var ResourceCategory $category*/
           $category->setStatus(false);
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $em->persist($category);
        $em->flush();

        return $this->json($category,
            Response::HTTP_FOUND);

    }
    /**
     * @Rest\Post (
     *     path = "/api/admin/active_category",
     *     name = "active_resource_category"
     * )
     * @param Request $request
     * @return FosRestView|Response
     * @throws \Exception
     */
    public function activeCategoriesAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);


        //  return $this->json($categoryId);
        try {
            $category = $em->getRepository(ResourceCategory::class)->find($data['c']);
            if ($category == null)
            {
                throw new \Exception('Category could not be find', Response::HTTP_NOT_FOUND);
            }
            /** @var ResourceCategory $category*/
            $category->setStatus(true);
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $em->persist($category);
        $em->flush();

        return $this->json($category,
            Response::HTTP_FOUND);
    }
}

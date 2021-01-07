<?php

namespace App\Controller;

use App\Entity\Resource;
use App\Entity\ResourceCategory;
use App\Entity\ResourceStatus;
use App\Entity\ResourceType;
use App\Entity\User;
use App\Form\ResourcesType;
use Doctrine\ORM\NonUniqueResultException;
use Exception;
use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use FOS\RestBundle\View\View as FosRestView;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ResourcesController
 * @package App\Controller
 */
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
    public function showResourcesAction(Request $request) :Response
    {
        if ($request->get('id') == '{id}') {
            return FosRestView::create(
                ['Message' => 'The resource id should be mentioned!'],
                Response::HTTP_BAD_REQUEST
            );
        }

        $em = $this->getDoctrine()->getManager();

        try {
            $qb = $em->getRepository(Resource::class)
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
    public function listResourcesAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        try {
            $qb = $em->getRepository(Resource::class)
                ->createQueryBuilder('r');

            $resources = $qb->getQuery()->getResult();


        } catch (NonUniqueResultException $nonUniqueResultException) {
            return FosRestView::create(['message' => 'Non unique result'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($resources,
            Response::HTTP_CREATED);

    }

    /**
     * @Rest\Post(
     *     path = "/api/resources",
     *     name = "create_resource"
     * )
     * @param Request $request
     * @return FosRestView|Response
     */
    public function createRessourcesAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data = json_decode($request->getContent(), true);

        $resource = new Resource();

        //Default Status
        $resource->setStatus($em->getRepository(ResourceStatus::class)->findOneBy(['name' => 'queued']));

        //Todo : Improve
        //Set Data
        $resource->setCategories($em->getRepository(ResourceCategory::class)->findBy(['name' => $data['categories']]));
        $resource->setType($em->getRepository(ResourceType::class)->findOneBy(['type_name' => $data['type']]));
        $resource->setAuthor($this->getUser());

        $em = $this->getDoctrine()->getManager();

        $resource->setCreatedAt(new \DateTime());
        try {

            $form = $this->createForm(ResourcesType::class, $resource);

            /** @var Form $form*/

            $data = [
              'title' => "This is a title",
              'categories' => ["e04b51e6-5003-11eb-9a4e-f859719570ef"],
              'description' =>  "Lorem Ipsum",
              'type' => "1"
            ];
            $link = $form->submit($data);



            //Check if form as correct data Todo: Create UtilsFile To check form /!\ Duplicate fragment
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
                    500,
                    $errors
                ]);
            }

            if ($form->isSubmitted())
            {
                $em->persist($resource);
                $em->flush();
            }

            return $this->json($resource,
                Response::HTTP_CREATED);

            //return $user;
        } catch (Exception $exception) {
            return new JsonResponse(['message' => $exception->getMessage()], $exception->getCode());
        }

    }

    /**
     * @Rest\Get(
     *     path = "/api/resources/user/{param}",
     *     name = "list_resource_user"
     * )
     * @param Request $request
     * @return FosRestView|Response
     */
    public function showResourceByUserAction(Request $request)
    {
        $authorId = $request->get("param");
        //Todo : Add Condition to check if data is uiid
        //Make as independent function
        if (preg_match('/([a-z]+)(\b=DESC\b)|(\b=ASC\b)/', $authorId))
        {
            $query = explode('^', $authorId);
            $authorId = $query[0];
            $orderBy = explode('=', $query[1]);
        }

        $categoriesArray = explode('&',$authorId);

        $em = $this->getDoctrine()->getManager();

        if($em->getRepository(User::class)->find($authorId) == NULL)
        {
            return New JsonResponse([
                "The user ". $authorId . "does not exist."],
                Response::HTTP_NOT_FOUND);
        }

        try {

            if (isset($orderBy))
            {
                $resources = $em->getRepository(Resource::class)
                    ->createQueryBuilder('r')->where('r.author = :author')
                    ->OrderBy('r.'. $orderBy[0], $orderBy[1])
                    ->setParameter('author', $authorId)->getQuery()->getResult();
            } else {
                $resources = $em->getRepository(Resource::class)
                    ->createQueryBuilder('r')->where('r.author = :author')
                    ->setParameter('author', $authorId)->getQuery()->getResult();
            }

            if (empty($resources))
            {
                return New JsonResponse([
                    "The user has no ressource"],
                    Response::HTTP_NOT_FOUND);
            }

        } catch (NonUniqueResultException $nonUniqueResultException) {
            return FosRestView::create(['message' => 'Non unique result'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($resources,
            Response::HTTP_ACCEPTED
        );
    }

    /**
     * @Rest\Get(
     *     path = "/api/resources/category/{param}",
     *     name = "get_resource_category"
     * )
     * @param Request $request
     * @return Exception|FosRestView|Response
     */
    public function showResourceByCategoryAction(Request $request)
    {
        $categoriesId = $request->get("param");
        //Todo : Add Condition to check if data is uiid
        //Make as independent function
        if (preg_match('/([a-z]+)(\b=DESC\b)|(\b=ASC\b)/', $categoriesId))
        {
            $query = explode('^', $categoriesId);
            $categoriesId = $query[0];
            $orderBy = explode('=', $query[1]);
        }

        $categoriesArray = explode('&',$categoriesId);

        $em = $this->getDoctrine()->getManager();

        if (sizeof($categoriesArray) !== 1) {
            $resources = [];
            $index = 0;
            foreach ($categoriesArray as $item)
            {
                try {
                    //Search
                    if (isset($orderBy))
                    {
                        $categoryElement = $em->getRepository(Resource::class)
                            ->createQueryBuilder('r')->join('r.categories', 'c')->where('c.name = :name')
                            ->OrderBy('r.'. $orderBy[0], $orderBy[1])
                            ->setParameter('name', $item)->getQuery()->getResult();
                    } else {
                        $categoryElement = $em->getRepository(Resource::class)
                            ->createQueryBuilder('r')->join('r.categories', 'c')->where('c.name = :name')
                            ->setParameter('name', $item)->getQuery()->getResult();
                    }

                    if (empty($categoryElement))
                    {
                        return New JsonResponse([
                            "Category " . $item ." could not be found"],
                            Response::HTTP_NOT_FOUND);
                    }

                    //Add Result to Array
                    $resources[$index] = $categoryElement;
                    $index++;
                } catch (Exception $exception) {
                    return new JsonResponse($exception->getMessage(),
                        Response::HTTP_BAD_REQUEST);
                }
            }
        } else {
            try {
                //Search
                $resources = $em->getRepository(Resource::class)
                    ->createQueryBuilder('r')->join('r.categories', 'c')->where('c.name = :name')
                    ->setParameter('name', $categoriesId)->getQuery()->getResult();
                if (empty($resources))
                {
                    return New JsonResponse([
                        "Category " . $categoriesId ." could not be found"],
                        Response::HTTP_NOT_FOUND);
                }
            } catch (Exception $exception) {
                return new JsonResponse([$exception->getMessage()],
                    Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->json($resources,
            Response::HTTP_ACCEPTED
        );
    }

    /**
     * @Rest\Get(
     *     path = "/api/resources/type/{param}",
     *     name = "get_resource_type"
     * )
     * @param Request $request
     * @return Exception|FosRestView|Response
     */
    public function showResourceByTypeAction(Request $request)
    {
        $typeid = $request->get("param");
        //Todo : Add Condition to check if data is uiid
        //Make as independent function
        if (preg_match('/([a-z]+)(\b=DESC\b)|(\b=ASC\b)/', $typeid))
        {
            $query = explode('^', $typeid);
            $typeid = $query[0];
            $orderBy = explode('=', $query[1]);
        }

        $typeArray = explode('&',$typeid);

        $em = $this->getDoctrine()->getManager();

        if (sizeof($typeArray) !== 1) {
            $resources = [];
            $index = 0;
            foreach ($typeArray as $item)
            {
                try {
                    //Search
                    if (isset($orderBy))
                    {
                        $typeElement = $em->getRepository(Resource::class)
                            ->createQueryBuilder('r')->join('r.type', 't')->where('t.type_name = :name')
                            ->OrderBy('r.'. $orderBy[0], $orderBy[1])
                            ->setParameter('name', $item)->getQuery()->getResult();
                    } else {
                        $typeElement = $em->getRepository(Resource::class)
                            ->createQueryBuilder('r')->join('r.type', 't')->where('t.type_name = :name')
                            ->setParameter('name', $item)->getQuery()->getResult();
                    }

                    if (empty($typeElement))
                    {
                        return New JsonResponse([
                            "Type " . $item ." could not be found"],
                            Response::HTTP_NOT_FOUND);
                    }

                    //Add Result to Array
                    $resources[$index] = $typeElement;
                    $index++;
                } catch (Exception $exception) {
                    return new JsonResponse($exception->getMessage(),
                        Response::HTTP_BAD_REQUEST);
                }
            }
        } else {
            try {
                //Search
                $resources = $em->getRepository(Resource::class)
                    ->createQueryBuilder('r')->join('r.type', 't')->where('t.type_name = :name')
                    ->setParameter('name', $typeid)->getQuery()->getResult();
                if (empty($resources))
                {
                    return New JsonResponse([
                        "Type " . $typeid ." could not be found"],
                        Response::HTTP_NOT_FOUND);
                }
            } catch (Exception $exception) {
                return new JsonResponse([$exception->getMessage()],
                    Response::HTTP_BAD_REQUEST);
            }
        }

        return $this->json($resources,
            Response::HTTP_ACCEPTED
        );
    }

}

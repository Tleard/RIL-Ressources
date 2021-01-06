<?php

namespace App\Controller;

use App\Entity\Resource;
use App\Entity\ResourceCategory;
use App\Entity\ResourceStatus;
use App\Entity\ResourceType;
use App\Entity\User;
use App\Form\ResourcesType;
use Doctrine\ORM\NonUniqueResultException;
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

            $resources = $qb->getQuery()->getArrayResult();


        } catch (NonUniqueResultException $nonUniqueResultException) {
            return FosRestView::create(['message' => 'Non unique result'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $response = new Response(json_encode($resources));
        $response->headers->set('Content-Type', 'application/json');
        return $response;

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

        //Todo : Improve
        $resource->setStatus($em->getRepository(ResourceStatus::class)->findOneBy(['name' => 'queued']));
        $resource->setCategories($em->getRepository(ResourceCategory::class)->findOneBy(['name' => $data['categories']]));
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

            return $this->json($resource);

            //return $user;
        } catch (\Exception $exception) {
            return new JsonResponse(['message' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
        }


    }
}

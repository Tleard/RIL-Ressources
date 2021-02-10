<?php


namespace App\Controller;


use App\Entity\Resource;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Exception;
use FOS\RestBundle\Controller\Annotations as Rest;


class LibrariesController extends AbstractController
{
    /**
     * @Rest\Post(
     *     path = "api/librairy/add-resource",
     *     name = "save_resource_in_library"
     * )
     * @param Request $request
     * @throws Exception
     */
    public function addResourceAction(Request $request): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);

        $ressource = $em->getRepository(Resource::class)->find([
            'id' => $data['id']
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
     * @Rest\Get(
     *     path = "api/librairy/add-resource",
     *     name = "add_library_resource"
     * )
     * @return JsonResponse
     */
    public function getLibraryAction() :JsonResponse
    {
        $userId = $this->getUser()->getId();
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find([
            'user_id' => $userId
        ]);
        $lib = $user->getLibrary();
        if (count($lib) > 0) {
            return $this->json($lib, Response::HTTP_CREATED);
        } else {
            return $this->json(['message' => "vous n'avez aucune ressource enregistrée"]);
        }
    }

    /**
     * @Rest\Delete(
     *     path = "api/librairy/remove/{resource_id}",
     *     name = "delete_library_resource"
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function DeleteResourceAction(Request $request): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();
        $resourceId = $request->get('resource_id');

        $resource = $em->getRepository(Resource::class)->find([
            'id' => $resourceId
        ]);

        $userId = $this->getUser()->getId();

        $user = $em->getRepository(User::class)->find([
            'id' => $userId
        ]);
        $user->removeLibrary($resource);

        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'ressource retirée de la bibliothèque']);
    }

}
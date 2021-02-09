<?php


namespace App\Controller;


use App\Entity\Resource;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Exception;


class LibrariesController extends AbstractController
{
    /**
     * @Rest\Post(
     *     path = "api/librairy/add-ressource",
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
     *     path = "api/librairy/add-ressource",
     *     name = "get_library"
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
     *     path = "api/librairy/remove/{ressource_id}",
     *     name = "get_library"
     * )
     * @Route(name="removeFromLib", path="/api/user/removeFromLib", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function DeleteResourceAction(Request $request): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();
        $resourceId = $request->get('ressource_id');

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
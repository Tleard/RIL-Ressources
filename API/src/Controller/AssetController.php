<?php

namespace App\Controller;

use App\Entity\Asset;
use App\Entity\Resource;
use Doctrine\ORM\NonUniqueResultException;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;

class AssetController extends AbstractController
{
    /**
     * @Rest\Get(
     *     path = "/api/asset/file/{asset_id}",
     *     name = "get_resource_asset_file"
     * )
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function showRessourceAssetFile(Request $request)
    {
        $assetId =$request->get('asset_id');
        $em = $this->getDoctrine()->getManager();

        try {
            $asset = $em->getRepository(Asset::class)->find($assetId);
        } catch (NonUniqueResultException $nonUniqueResultException)  {
            throw new Exception($nonUniqueResultException->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        if (empty($asset)) {
            throw new Exception("The asset n°" . $assetId. " could not be found", Response::HTTP_NOT_FOUND);
        }
        return new BinaryFileResponse($this->getParameter('kernel.project_dir') . "/public/uploads/" . $asset->getFileName(), Response::HTTP_ACCEPTED);
    }

    /**
     * @Rest\Get(
     *     path = "/api/asset/{asset_id}",
     *     name = "get_resource_asset"
     * )
     * @param Request $request
     * @return FosRestView|Response
     * @throws Exception
     */
    public function showRessourceAsset(Request $request)
    {
        $assetId =$request->get('asset_id');
        $em = $this->getDoctrine()->getManager();

        try {
            $asset = $em->getRepository(Asset::class)->find($assetId);
        } catch (NonUniqueResultException $nonUniqueResultException)  {
            throw new Exception($nonUniqueResultException->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        if (empty($asset)) {
            throw new Exception("The asset n°" . $assetId. " could not be found", Response::HTTP_NOT_FOUND);
        }

        return $this->json($asset, Response::HTTP_ACCEPTED);
    }

    /**
     * @Rest\Delete(
     *     path = "/api/asset/{asset_id}",
     *     name = "delete_resource_asset"
     * )
     * @param Request $request
     * @return FosRestView|Response
     */
    public function deleteRessourceAsset(Request $request)
    {
        $assetId =$request->get('asset_id');
        $em = $this->getDoctrine()->getManager();

        try {
            $asset = $em->getRepository(Asset::class)->find($assetId);
        } catch (NonUniqueResultException $nonUniqueResultException)  {
            throw new Exception($nonUniqueResultException->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        if (empty($asset)) {
            throw new Exception("The asset n°" . $assetId. " could not be found", Response::HTTP_NOT_FOUND);
        }

        $em->remove($asset);
        unlink($this->getParameter('kernel.project_dir') . "/public/uploads/" . $asset->getFileName());

        return $this->json('Sucess', Response::HTTP_ACCEPTED);
    }

    /**
     * @Rest\Patch(
     *     path = "/api/asset/{asset_id}",
     *     name = "patch_resource_asset"
     * )
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function patchResourceAsset(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $assetId = $request->get('asset_id');
        $em = $this->getDoctrine()->getManager();

        try {
            $asset = $em->getRepository(Asset::class)->find($assetId);
        } catch (NonUniqueResultException $nonUniqueResultException)  {
            throw new Exception($nonUniqueResultException->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        if (empty($asset)) {
            throw new Exception("The asset n°" . $assetId. " could not be found", Response::HTTP_NOT_FOUND);
        }


        if (!isset($data['title']))
        {
            throw new Exception("Incorrect body", Response::HTTP_UNAUTHORIZED);
        }
        /** @var Asset $asset */
        $asset->setTitle($data['title']);

        return $this->json($asset, Response::HTTP_ACCEPTED);
    }
}

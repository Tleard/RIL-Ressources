<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ResourcesAssetController extends AbstractController
{
    /**
     * @Route("/resources/asset", name="resources_asset")
     */
    public function index(): Response
    {
        return $this->render('resources_asset/index.html.twig', [
            'controller_name' => 'ResourcesAssetController',
        ]);
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ResourcesTypeController extends AbstractController
{
    /**
     * @Route("/resources/type", name="resources_type")
     */
    public function index(): Response
    {
        return $this->render('resources_type/index.html.twig', [
            'controller_name' => 'ResourcesTypeController',
        ]);
    }
}

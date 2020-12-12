<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ResourcesCategoryController extends AbstractController
{
    /**
     * @Route("/resources/category", name="resources_category")
     */
    public function index(): Response
    {
        return $this->render('resources_category/index.html.twig', [
            'controller_name' => 'ResourcesCategoryController',
        ]);
    }
}

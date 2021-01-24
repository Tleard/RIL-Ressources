<?php


namespace App\Controller;


use App\Entity\User;
use App\Form\UsersType;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PageController extends AbstractFOSRestController

{
    /**
     * @Route(name="test", path="/test", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function homeAction(Request $request){

        $form = $this->createForm(UsersType::class);
        return new JsonResponse(['test' => $form]);
    }


}
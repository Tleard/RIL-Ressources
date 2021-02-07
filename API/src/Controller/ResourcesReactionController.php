<?php


namespace App\Controller;


use App\Entity\Resource;
use App\Entity\ResourceReaction;
use App\Form\ReactionType;
use App\Form\ResourcesType;
use App\Form\UsersType;
use App\Repository\ResourcesReactionRepository;
use DateTime;
use Exception;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;


/**
 * Class ResourcesReactionController
 * @package App\Controller
 */
class ResourcesReactionController extends AbstractController
{

    /**
     * @param Request $request
     * @Rest\Post (
     *     path = "/api/resources/reaction/{id}",
     *     name = "create_resource_reaction"
     * )
     * @return JsonResponse
     * @throws Exception
     */
     public function CreateRessourcesReactions(Request $request)
     {
         $authorizedReaction = [
             "like",
             "care",
             "sad",
             "happy",
             "nice",
             "hm"
         ];

         $em = $this->getDoctrine()->getManager();
         $resourceId = $request->get('id');
         $reactionName= json_decode($request->getContent(), true);
         if ($reactionName['reaction'] != null)
         {
             if (!in_array($reactionName['reaction'], $authorizedReaction))
             {
                 throw new Exception("Unauthorized reaction", Response::HTTP_UNAUTHORIZED);
             }
         }

         try {
            $resource = $em->getRepository(Resource::class)->find($resourceId);
            if ($resource == null)
            {
                throw new Exception("could not find resource n°" . $resourceId, Response::HTTP_UNAUTHORIZED);
            }
         } catch (Exception $exception) {
             throw new Exception($exception);
         }

         $reaction = new ResourceReaction();
         $reaction->setReaction($reactionName['reaction']);
         $reaction->setUser($this->getUser());
         $reaction->setCreationDate(new DateTime());

         $resource->addReactions($reaction);

         try {

             $form = $this->createForm(ReactionType::class, $reaction);

             /** @var Form $form*/
             $form->submit($reactionName);


             //Check if form as correct data Todo: Create Service To check form /!\ Duplicate fragment
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
             return new JsonResponse(['message' => $exception->getMessage()], Response::HTTP_BAD_REQUEST);
         }
     }

    /**
     * @param Request $request
     * @Rest\Get (
     *     path = "/api/resources/reaction/{id}",
     *     name = "show_reaction_by_resources"
     * )
     * @return JsonResponse
     * @throws Exception
     */
     public function showReactionByResources(Request $request)
     {
         $em = $this->getDoctrine()->getManager();
         $resourceId = $request->get('id');

         try {
             $resource = $em->getRepository(Resource::class)->find($resourceId);
             $reactionArray= [];
             foreach ($resource->getReactions() as $resourceReaction)
             {
                 array_push($reactionArray,$resourceReaction);
             }

             if ($resource == null)
             {
                 throw new Exception("could not find resource n°" . $resourceId, Response::HTTP_UNAUTHORIZED);
             }
         } catch (Exception $exception) {
             throw new Exception($exception);
         }
         return $this->json($reactionArray, Response::HTTP_FOUND);
     }

    /**
     * @param Request $request
     * @Rest\Get (
     *     path = "/api/user/reaction/{id}",
     *     name = "show_reaction_by_user"
     * )
     * @return JsonResponse
     * @throws Exception
     */
    public function showReactionByUser(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $userId = $request->get('id');

        try {
            $resourceReaction = $em->getRepository(ResourceReaction::class)->findBy(['user' => $userId]);

            if (empty($resourceReaction))
            {
                return New JsonResponse([
                    "The user has no reactions"],
                    Response::HTTP_NOT_FOUND);
            }

        } catch (Exception $exception) {
            throw new Exception($exception);
        }
         return $this->json($resourceReaction, Response::HTTP_FOUND);
    }
}
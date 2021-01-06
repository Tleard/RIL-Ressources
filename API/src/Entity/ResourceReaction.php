<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class ResourceReaction
 * @package App\Entity
 * @ORM\Table("ressources_reactions")
 * @ORM\Entity(repositoryClass="App\Repository\ResourcesReactionRepository")
 */
class ResourceReaction
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(name="id", type="guid", unique=true)
     */
    private $id;

    /**
     * 2D array with user & like type
     * @ORM\ManyToMany(targetEntity="App\Entity\User")
     * @ORM\JoinTable()
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $reaction;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creation_date;

}
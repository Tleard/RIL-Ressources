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
     * @ORM\ManyToOne(targetEntity="App\Entity\User", cascade={"persist"})
     * @ORM\JoinColumn(name="author_id", referencedColumnName="id", nullable=true)
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

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     *
     * @return mixed
    */
    public function getUser()
    {
        return $this->user->getId();
    }

    /**
     * @param mixed $user
     */
    public function setUser($user): void
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getReaction()
    {
        return $this->reaction;
    }

    /**
     * @param mixed $reaction
     */
    public function setReaction($reaction): void
    {
        $this->reaction = $reaction;
    }

    /**
     * @return mixed
     */
    public function getCreationDate()
    {
        return $this->creation_date;
    }

    /**
     * @param mixed $creation_date
     */
    public function setCreationDate($creation_date): void
    {
        $this->creation_date = $creation_date;
    }

}
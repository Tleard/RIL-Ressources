<?php


namespace App\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Resource
 * @package App\Entity
 * @ORM\Table(name="resources")
 * @ORM\Entity(repositoryClass="App\Repository\ResourcesRepository")
 */
class Resource
{
    public function __construct()
    {
        $this->creation_date = new DateTime();
    }


    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(name="id", type="guid", unique=true)
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ResourceType")
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ResourceCategory", cascade={"persist"})
     * @ORM\JoinColumn(name="categories_id", referencedColumnName="id", nullable=true)
     */
    private $categories;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ResourceAsset")
     * @ORM\JoinColumn(name="assets_id", referencedColumnName="id", nullable=true)
     */
    private $assets;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creation_date;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ResourceStatus", cascade={"persist"})
     * @ORM\JoinColumn(name="status_id", referencedColumnName="id", nullable=true)
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", cascade={"persist"})
     * @ORM\JoinColumn(name="author_id", referencedColumnName="id", nullable=true)
     */
    private $author;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return Resource
     */
    public function setId($id): Resource
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     * @return Resource
     */
    public function setTitle($title): Resource
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     * @return Resource
     */
    public function setType($type): Resource
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCategories()
    {
        return $this->categories;
    }

    /**
     * @param mixed $categories
     * @return Resource
     */
    public function setCategories($categories): Resource
    {
        $this->categories = $categories;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getAssets()
    {
        return $this->assets;
    }

    /**
     * @param mixed $assets
     * @return Resource
     */
    public function setAssets($assets): Resource
    {
        $this->assets = $assets;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     * @return Resource
     */
    public function setDescription($description): Resource
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCreationDate(): DateTime
    {
        return $this->creation_date;
    }

    /**
     * @param mixed $creation_date
     * @return Resource
     */
    public function setCreationDate($creation_date): Resource
    {
        $this->creation_date = $creation_date;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     * @return Resource
     */
    public function setStatus($status): Resource
    {
        $this->status = $status;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author): void
    {
        $this->author = $author;
    }

}
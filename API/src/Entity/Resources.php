<?php


namespace App\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Resources
 * @package App\Entity
 * @ORM\Table(name="resources")
 * @ORM\Entity(repositoryClass="App\Repository\ResourcesRepository")
 */
class Resources
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
     * @ORM\ManyToOne(targetEntity="App\Entity\ResourcesType")
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ResourcesCategory", cascade={"persist"})
     * @ORM\JoinColumn(name="categories_id", referencedColumnName="id", nullable=true)
     */
    private $categories;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ResourcesAsset")
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
     * @ORM\ManyToOne(targetEntity="App\Entity\ResourcesStatus", cascade={"persist"})
     * @ORM\JoinColumn(name="status_id", referencedColumnName="id", nullable=true)
     */
    private $status;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return Resources
     */
    public function setId($id): Resources
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
     * @return Resources
     */
    public function setTitle($title): Resources
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
     * @return Resources
     */
    public function setType($type): Resources
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
     * @return Resources
     */
    public function setCategories($categories): Resources
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
     * @return Resources
     */
    public function setAssets($assets): Resources
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
     * @return Resources
     */
    public function setDescription($description): Resources
    {
        $this->description = $description;
        return $this;
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
     * @return Resources
     */
    public function setCreationDate($creation_date): Resources
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
     * @return Resources
     */
    public function setStatus($status): Resources
    {
        $this->status = $status;
        return $this;
    }

}
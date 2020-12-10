<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Class ResourcesCategory
 * @package App\Entity
 * @ORM\Table(name="resources_categories")
 * @ORM\Entity(repositoryClass="App\Repository\ResourcesCategoryRepository")
 */
class ResourcesCategory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(name="id", type="guid", unique=true)
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return ResourcesCategory
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }


}
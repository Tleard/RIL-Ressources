<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class ResourcesType
 * @package App\Entity
 * @ORM\Table("ressources_types")
 * @ORM\Entity(repositoryClass="App\Repository\ResourcesTypeRepository")
 */
class ResourceType
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
    private $type_name;

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
     * @return mixed
     */
    public function getTypeName()
    {
        return $this->type_name;
    }

    /**
     * @param mixed $type_name
     */
    public function setTypeName($type_name): void
    {
        $this->type_name = $type_name;
    }

}
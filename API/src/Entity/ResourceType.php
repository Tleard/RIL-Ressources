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

}
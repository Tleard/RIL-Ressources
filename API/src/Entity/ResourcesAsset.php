<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class ResourcesAsset
 * @package App\Entity
 * @ORM\Table(name="resources_assets")
 * @ORM\Entity(repositoryClass="App\Repository\ResourcesAssetRepository")
 */
class ResourcesAsset
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
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $path;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $asset_type;

}
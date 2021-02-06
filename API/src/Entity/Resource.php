<?php


namespace App\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\ArrayType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

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
        $this->createdAt = new DateTime();
        $this->categories = new ArrayCollection();
        $this->assets = new ArrayCollection();
        $this->reactions = new ArrayCollection();
        $this->reports = new ArrayCollection();

    }


    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(name="id", type="guid", unique=true)
     */
    private $id;

    /**
     * @Assert\Length(
     *      min = 5,
     *      max = 50,
     *      minMessage = "Your title must be at least {{ limit }} characters long",
     *      maxMessage = "Your title cannot be longer than {{ limit }} characters"
     *)
     * @ORM\Column(type="string", length=100)
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ResourceType")
     * @ORM\JoinColumn(name="type_id", referencedColumnName="id")
     */
    private $type;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ResourceCategory", cascade={"persist"})
     */
    private $categories;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\ResourceReaction", cascade={"persist"})
     */
    private $reactions;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Asset", cascade={"persist"})
     */
    private $assets;

    /**
     * @Assert\Length(
     *      min = 5,
     *      max = 4000,
     *      minMessage = "Your title must be at least {{ limit }} characters long",
     *      maxMessage = "Your title cannot be longer than {{ limit }} characters"
     *)
     * @ORM\Column(type="string", length=4000)
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

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
     * @ORM\OneToMany(targetEntity=Report::class, mappedBy="report_ressource")
     */
    private $reports;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $is_blocked;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="library")
     */
    private $users;


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

    public function addCategories($categories)
    {
        $this->categories->add($categories);
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
     * @param $assets
     * @return Resource
     */
    public function addAssets($assets): Resource
    {
        $this->assets->add($assets);
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
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt): void
    {
        $this->createdAt = $createdAt;
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

    /**
     * @return mixed
     */
    public function getReactions()
    {
        return $this->reactions;
    }

    /**
     * @param mixed $reactions
     */
    public function setReactions($reactions): void
    {
        $this->reactions = $reactions;
    }

    /**
     * @param $reactions
     * @return Resource
     */
    public function addReactions($reactions): Resource
    {
        $this->reactions->add($reactions);
        return $this;
    }

    /**
     * @return Collection|Report[]
     */
    public function getReports(): Collection
    {
        return $this->reports;
    }

    public function addReport(Report $report): self
    {
        if (!$this->reports->contains($report)) {
            $this->reports[] = $report;
            $report->setReportRessource($this);
        }

        return $this;
    }

    public function removeReport(Report $report): self
    {
        if ($this->reports->removeElement($report)) {
            // set the owning side to null (unless already changed)
            if ($report->getReportRessource() === $this) {
                $report->setReportRessource(null);
            }
        }

        return $this;
    }

    public function getIsBlocked(): ?bool
    {
        return $this->is_blocked;
    }

    public function setIsBlocked(?bool $is_blocked): self
    {
        $this->is_blocked = $is_blocked;

        return $this;
    }



}
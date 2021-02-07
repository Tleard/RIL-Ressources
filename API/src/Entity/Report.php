<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ReportRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ReportRepository::class)
 */
class Report
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;


    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     */
    private $reported_user;

    /**
     * @ORM\ManyToOne(targetEntity=Resource::class, inversedBy="reports")
     */
    private $report_ressource;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $comment;



    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $is_closed;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }


    public function getReportedUser(): ?User
    {

        return $this->reported_user;
    }

    public function setReportedUser(?User $reported_user): self
    {
        $this->reported_user = $reported_user;

        return $this;
    }

    public function getReportRessource(): ?Resource
    {
        return $this->report_ressource;
    }

    public function setReportRessource(?Resource $report_ressource): self
    {
        $this->report_ressource = $report_ressource;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }


    public function getIsClosed(): ?bool
    {
        return $this->is_closed;
    }

    public function setIsClosed(?bool $is_closed): self
    {
        $this->is_closed = $is_closed;

        return $this;
    }

}

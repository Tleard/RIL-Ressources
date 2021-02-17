<?php

namespace App\Entity;

use App\Repository\UserRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Exception;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\Valid;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity("email")
 * @UniqueEntity("username")
 */
class User implements UserInterface
{


    const ROLE_USER = 'ROLE_USER';
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_MODERATOR = 'ROLE_MODERATOR';

    const DEFAULT_ROLES = [self::ROLE_USER];

    /**
     * @ORM\PrePersist()
     * @throws \Exception
     */
    public function prePersist()
    {
        $this->createdAt = new DateTime();
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
    private $username;

    /**
     * @Assert\Regex(
     *     pattern="/\d/",
     *     match=false,
     *     message="Your name cannot contain a number"
     * )
     * @ORM\Column(type="string", length=255)
     */
    private $firstName;

    /**
     * @Assert\Regex(
     *     pattern="/\d/",
     *     match=false,
     *     message="Your name cannot contain a number"
     * )
     * @ORM\Column(type="string", length=255)
     */
    private $lastName;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Asset", cascade={"persist"})
     * @ORM\JoinColumn(name="asset_id", referencedColumnName="id")
     */
    private $profilePicture;

    /**
     * @Groups({"password-protected"})
     * @ORM\Column(type="string", length=255)
     * @Assert\Regex(
     *     pattern="/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/",
     *     match=true,
     *     message="Password must be seven characters long and contain at least one digit, one upper case letter and one lower case letter",
     * )
     */
    protected $password;

    /**
     * @Assert\Email(
     *     message = "The email '{{ value }}' is not a valid email."
     * )
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isBanned;

    /**
     * @ORM\Column(type="array")
     */
    private $roles;




    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $codeConfirmation;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $is_valid;

    /**
     * @ORM\OneToMany(targetEntity=Warning::class, mappedBy="user_warned")
     */
    private $warnings;

    /**
     * @ORM\ManyToMany(targetEntity=Resource::class, inversedBy="users")
     */
    private $library;

    public function __construct()
    {
        $this->warnings = new ArrayCollection();
        $this->library = new ArrayCollection();
    }

    /**
     * @param mixed $id
     * @return User
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getIsBanned()
    {
        return $this->isBanned;
    }

    /**
     * @param mixed $isBanned
     */
    public function setIsBanned($isBanned): void
    {
        $this->isBanned = $isBanned;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles($roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getProfilePicture()
    {
        return $this->profilePicture;
    }

    /**
     * @param mixed $profilePicture
     */
    public function setProfilePicture($profilePicture): void
    {
        $this->profilePicture = $profilePicture;
    }

    public function getSalt()
    {
        // TODO: Implement getSalt() method.
    }

    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    /**
     * @return string|null
     */
    public function getPassword()
    {
       return $this->password;
    }

    /**
     * @return string|null
     */
    public function getCodeConfirmation(): ?string
    {
        return $this->codeConfirmation;
    }

    /**
     * @param string|null $codeConfirmation
     * @return $this
     */
    public function setCodeConfirmation(?string $codeConfirmation): self
    {
        $this->codeConfirmation = $codeConfirmation;


        return $this;
    }

    /**
     * @return bool|null
     */
    public function getIsValid(): ?bool
    {
        return $this->is_valid;
    }

    /**
     * @param bool|null $is_valid
     * @return $this
     */
    public function setIsValid(?bool $is_valid): self
    {
        $this->is_valid = $is_valid;

        return $this;
    }

    /**
     * @return Collection|Warning[]
     */
    public function getWarnings(): Collection
    {
        return $this->warnings;
    }

    /**
     * @param Warning $warning
     * @return $this
     */
    public function addWarning(Warning $warning): self
    {
        if (!$this->warnings->contains($warning)) {
            $this->warnings[] = $warning;
            $warning->setUserWarned($this);
        }

        return $this;
    }

    /**
     * @param Warning $warning
     * @return $this
     */
    public function removeWarning(Warning $warning): self
    {
        if ($this->warnings->removeElement($warning)) {
            // set the owning side to null (unless already changed)
            if ($warning->getUserWarned() === $this) {
                $warning->setUserWarned(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Resource[]
     */
    public function getLibrary(): Collection
    {
        return $this->library;
    }

    public function addLibrary(Resource $library): self
    {
        if (!$this->library->contains($library)) {
            $this->library[] = $library;
        }

        return $this;
    }

    /**
     * @param Resource $library
     * @return $this
     */
    public function removeLibrary(Resource $library): self
    {
        $this->library->removeElement($library);

        return $this;
    }

}

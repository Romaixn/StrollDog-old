<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Ramsey\Uuid\UuidInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    types: ['https://schema.org/User'],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:create', 'user:update']],
    extraProperties: [
        'standard_put' => true
    ]
)]
#[Get]
#[GetCollection(security: "is_granted('ROLE_ADMIN')")]
#[Post(
    inputFormats: ['multipart' => ['multipart/form-data']],
    processor: UserPasswordHasher::class
)]
#[Put(
    inputFormats: ['multipart' => ['multipart/form-data']],
    security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_USER') and object == user)",
    securityMessage: 'Only the user can update his own profile',
    processor: UserPasswordHasher::class
)]
#[Delete(
    security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_USER') and object == user)",
    securityMessage: 'Only the user can delete his own profile'
)]
#[UniqueEntity(['email', 'username'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id, ORM\GeneratedValue(strategy: 'CUSTOM'), ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Groups(groups: ['user:read'])]
    private ?UuidInterface $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(groups: ['user:read', 'user:create', 'user:update'])]
    #[Assert\NotBlank]
    #[Assert\Email]
    private ?string $email = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(groups: ['user:read', 'user:create', 'user:update'])]
    #[Assert\NotBlank]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    #[Groups(groups: ['user:read', 'user:create', 'user:update'])]
    #[Assert\NotBlank]
    private ?string $name = null;

    /**
     * @var array<string>
     */
    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column]
    private ?string $password = null;

    #[Assert\NotBlank(groups: ['user:create'])]
    #[Groups(['user:create', 'user:update'])]
    private ?string $plainPassword = null;

    #[ORM\OneToMany(mappedBy: 'creator', targetEntity: Comment::class, orphanRemoval: true)]
    #[Groups(groups: ['user:read'])]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'creator', targetEntity: Place::class)]
    #[Groups(groups: ['user:read'])]
    private Collection $places;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $googleId = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $facebookId = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $instagramId = null;

    #[ApiProperty(types: ['https://schema.org/contentUrl'])]
    #[Groups(['user:read'])]
    public ?string $contentUrl = null;

    #[Vich\UploadableField(mapping: 'user_avatar', fileNameProperty: 'avatarPath')]
    #[Groups(['user:create', 'user:update'])]
    public ?File $avatar = null;

    #[ORM\Column(nullable: true)]
    public ?string $avatarPath = null;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->places = new ArrayCollection();
    }

    public function getId(): ?UuidInterface
    {
        return $this->id;
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

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param array<string> $roles
     */
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string|null
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $painPassword): self
    {
        $this->plainPassword = $painPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setCreator($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getCreator() === $this) {
                $comment->setCreator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Place>
     */
    public function getPlaces(): Collection
    {
        return $this->places;
    }

    public function addPlace(Place $place): self
    {
        if (!$this->places->contains($place)) {
            $this->places[] = $place;
            $place->setCreator($this);
        }

        return $this;
    }

    public function removePlace(Place $place): self
    {
        if ($this->places->removeElement($place)) {
            // set the owning side to null (unless already changed)
            if ($place->getCreator() === $this) {
                $place->setCreator(null);
            }
        }

        return $this;
    }

    public function getGoogleId(): ?string
    {
        return $this->googleId;
    }

    public function setGoogleId(?string $googleId): self
    {
        $this->googleId = $googleId;

        return $this;
    }

    public function getFacebookId(): ?string
    {
        return $this->facebookId;
    }

    public function setFacebookId(?string $facebookId): self
    {
        $this->facebookId = $facebookId;

        return $this;
    }

    public function getInstagramId(): ?string
    {
        return $this->instagramId;
    }

    public function setInstagramId(?string $instagramId): self
    {
        $this->instagramId = $instagramId;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getContentUrl(): ?string
    {
        return $this->contentUrl;
    }

    /**
     * @param string|null $contentUrl
     */
    public function setContentUrl(?string $contentUrl): void
    {
        $this->contentUrl = $contentUrl;
    }

    /**
     * @return File|null
     */
    public function getAvatar(): ?File
    {
        return $this->avatar;
    }

    /**
     * @param File|null $avatar
     */
    public function setAvatar(?File $avatar): void
    {
        $this->avatar = $avatar;
    }

    /**
     * @return string|null
     */
    public function getAvatarPath(): ?string
    {
        return $this->avatarPath;
    }

    /**
     * @param string|null $avatarPath
     */
    public function setAvatarPath(?string $avatarPath): void
    {
        $this->avatarPath = $avatarPath;
    }
}

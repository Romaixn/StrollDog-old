<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Ramsey\Uuid\UuidInterface;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    types: ['https://schema.org/User'],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
#[Get]
#[GetCollection(security: "is_granted('ROLE_ADMIN')")]
#[Post]
#[Put(
    security: "is_granted('ROLE_USER') and object == user",
    securityMessage: 'Only the user can update his own profile'
)]
#[Delete(
    security: "is_granted('ROLE_USER') and object == user",
    securityMessage: 'Only the user can delete his own profile'
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id, ORM\GeneratedValue(strategy: 'CUSTOM'), ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Groups(groups: ['user:read'])]
    private ?UuidInterface $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(groups: ['user:read', 'user:write'])]
    private ?string $email = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(groups: ['user:read', 'user:write'])]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    #[Groups(groups: ['user:read', 'user:write'])]
    private ?string $name = null;

    /**
     * @var array<string>
     */
    #[ORM\Column]
    #[Groups(groups: ['user:read'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(groups: ['user:write'])]
    private ?string $password = null;

    #[ORM\OneToMany(mappedBy: 'creator', targetEntity: Comment::class, orphanRemoval: true)]
    #[Groups(groups: ['user:read'])]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'creator', targetEntity: Place::class)]
    #[Groups(groups: ['user:read'])]
    private Collection $places;

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

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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
}

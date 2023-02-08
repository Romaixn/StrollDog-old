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
use App\Enum\Influx;
use App\Repository\PlaceRepository;
use App\State\PlacePostProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PlaceRepository::class)]
#[ApiResource(
    types: ['https://schema.org/Place'],
    normalizationContext: ['groups' => ['place:read']],
    denormalizationContext: ['groups' => ['place:write']],
    extraProperties: [
        'standard_put' => true
    ]
)]
#[Get]
#[GetCollection]
#[Post(
    security: "is_granted('ROLE_USER')",
    securityMessage: 'You must be logged in to create a place',
    processor: PlacePostProcessor::class
)]
#[Put(
    security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_USER') and object.creator == user)",
    securityMessage: 'Only the creator of the place can update it'
)]
#[Delete(
    security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_USER') and object.creator == user)",
    securityMessage: 'Only the creator of the place can delete it'
)]
class Place
{
    #[ORM\Id, ORM\GeneratedValue(strategy: 'CUSTOM'), ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Groups(groups: ['place:read'])]
    #[ApiProperty(types: ['http://schema.org/identifier'])]
    private ?UuidInterface $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(groups: ['place:read', 'place:write'])]
    #[ApiProperty(types: ['http://schema.org/name'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank]
    #[Groups(groups: ['place:read', 'place:write'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(groups: ['place:read', 'place:write'])]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(groups: ['place:read', 'place:write'])]
    private ?string $city = null;

    #[ORM\Column(length: 5)]
    #[Assert\NotBlank]
    #[Groups(groups: ['place:read', 'place:write'])]
    private ?string $postalCode = null;

    #[ORM\Column(nullable: true)]
    #[Groups(groups: ['place:read'])]
    private ?float $longitude = null;

    #[ORM\Column(nullable: true)]
    #[Groups(groups: ['place:read'])]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    #[Assert\Range(min: 0, max: 5)]
    #[Groups(groups: ['place:read'])]
    private ?float $rating = null;

    #[ORM\Column(length: 255, nullable: true, enumType: Influx::class)]
    #[Assert\NotBlank]
    #[Groups(groups: ['place:read', 'place:write'])]
    private Influx $influx = Influx::MODERATE;

    #[ORM\ManyToMany(targetEntity: Type::class, mappedBy: 'places')]
    #[Groups(groups: ['place:read', 'place:write'])]
    private Collection $types;

    #[ORM\OneToMany(mappedBy: 'place', targetEntity: Comment::class, orphanRemoval: true)]
    #[Groups(groups: ['place:read'])]
    private Collection $comments;

    #[ORM\ManyToOne(inversedBy: 'places')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(groups: ['place:read'])]
    private ?User $creator = null;

    public function __construct()
    {
        $this->types = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?UuidInterface
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getRating(): ?float
    {
        return $this->rating;
    }

    public function setRating(?float $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getInflux(): Influx
    {
        return $this->influx;
    }

    public function setInflux(Influx $influx): self
    {
        $this->influx = $influx;

        return $this;
    }

    /**
     * @return Collection<int, Type>
     */
    public function getTypes(): Collection
    {
        return $this->types;
    }

    public function addType(Type $type): self
    {
        if (!$this->types->contains($type)) {
            $this->types[] = $type;
            $type->addPlace($this);
        }

        return $this;
    }

    public function removeType(Type $type): self
    {
        if ($this->types->removeElement($type)) {
            $type->removePlace($this);
        }

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
            $comment->setPlace($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getPlace() === $this) {
                $comment->setPlace(null);
            }
        }

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

        return $this;
    }
}

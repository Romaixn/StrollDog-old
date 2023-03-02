<?php

declare(strict_types=1);

namespace App\Project\Infrastructure\ApiPlatform\Resource;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Project\Domain\Model\Project;
use App\Project\Infrastructure\ApiPlatform\State\Processor\CreateProjectProcessor;
use App\Project\Infrastructure\ApiPlatform\State\Processor\DeleteProjectProcessor;
use App\Project\Infrastructure\ApiPlatform\State\Processor\UpdateProjectProcessor;
use App\Project\Infrastructure\ApiPlatform\State\Provider\ProjectCollectionProvider;
use App\Project\Infrastructure\ApiPlatform\State\Provider\ProjectItemProvider;
use Symfony\Component\Uid\AbstractUid;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    shortName: 'Project',
    operations: [
        // basic crud
        new GetCollection(
            provider: ProjectCollectionProvider::class,
        ),
        new Get(
            provider: ProjectItemProvider::class,
        ),
        new Post(
            validationContext: ['groups' => ['create']],
            processor: CreateProjectProcessor::class,
        ),
        new Put(
            provider: ProjectItemProvider::class,
            processor: UpdateProjectProcessor::class
        ),
        new Patch(
            provider: ProjectItemProvider::class,
            processor: UpdateProjectProcessor::class,
        ),
        new Delete(
            provider: ProjectItemProvider::class,
            processor: DeleteProjectProcessor::class,
        ),
    ],
)]
final class ProjectResource
{
    public function __construct(
        #[ApiProperty(readable: false, writable: false, identifier: true)]
        public ?AbstractUid $id = null,

        #[Assert\NotNull(groups: ['create'])]
        #[Assert\Length(min: 1, max: 255, groups: ['create', 'Default'])]
        public ?string $title = null,

        #[Assert\NotNull(groups: ['create'])]
        #[Assert\Length(min: 1, max: 1023, groups: ['create', 'Default'])]
        public ?string $excerpt = null,

        #[Assert\Length(min: 1, max: 1023, groups: ['create', 'Default'])]
        public ?string $logo = null,

        #[Assert\Length(min: 1, max: 255, groups: ['create', 'Default'])]
        #[Assert\Url(groups: ['create', 'Default'])]
        public ?string $link = null,
    ) {
    }

    public static function fromModel(Project $project): self
    {
        return new self(
            $project->id->value,
            $project->title->value,
            $project->excerpt->value,
            $project->logo?->value,
            $project->link?->value,
        );
    }
}

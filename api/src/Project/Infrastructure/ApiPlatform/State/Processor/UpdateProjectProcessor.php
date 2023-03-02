<?php

declare(strict_types=1);

namespace App\Project\Infrastructure\ApiPlatform\State\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Project\Application\Command\UpdateProjectCommand;
use App\Project\Domain\Model\Project;
use App\Project\Domain\ValueObject\ProjectExcerpt;
use App\Project\Domain\ValueObject\ProjectId;
use App\Project\Domain\ValueObject\ProjectLink;
use App\Project\Domain\ValueObject\ProjectLogo;
use App\Project\Domain\ValueObject\ProjectTitle;
use App\Project\Infrastructure\ApiPlatform\Resource\ProjectResource;
use App\Shared\Application\Command\CommandBusInterface;
use Webmozart\Assert\Assert;

final class UpdateProjectProcessor implements ProcessorInterface
{
    public function __construct(
        private readonly CommandBusInterface $commandBus,
    ) {
    }

    /**
     * @param mixed $data
     *
     * @return ProjectResource
     */
    public function process($data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        Assert::isInstanceOf($data, ProjectResource::class);

        $command = new UpdateProjectCommand(
            new ProjectId($data->id),
            null !== $data->title ? new ProjectTitle($data->title) : null,
            null !== $data->excerpt ? new ProjectExcerpt($data->excerpt) : null,
            null !== $data->logo ? new ProjectLogo($data->logo) : null,
            null !== $data->link ? new ProjectLink($data->link) : null,
        );

        /** @var Project $model */
        $model = $this->commandBus->dispatch($command);

        return ProjectResource::fromModel($model);
    }
}

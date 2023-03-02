<?php

declare(strict_types=1);

namespace App\Project\Infrastructure\ApiPlatform\State\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Project\Application\Query\FindProjectQuery;
use App\Project\Domain\Model\Project;
use App\Project\Domain\ValueObject\ProjectId;
use App\Project\Infrastructure\ApiPlatform\Resource\ProjectResource;
use App\Shared\Application\Query\QueryBusInterface;
use Symfony\Component\Uid\Uuid;

final class ProjectItemProvider implements ProviderInterface
{
    public function __construct(
        private QueryBusInterface $queryBus,
    ) {
    }

    /**
     * @return ProjectResource|null
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        /** @var string $id */
        $id = $uriVariables['id'];

        /** @var Project|null $model */
        $model = $this->queryBus->ask(new FindProjectQuery(new ProjectId(Uuid::fromString($id))));

        return null !== $model ? ProjectResource::fromModel($model) : null;
    }
}

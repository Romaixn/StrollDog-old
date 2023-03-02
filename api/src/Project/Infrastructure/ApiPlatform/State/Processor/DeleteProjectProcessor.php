<?php

declare(strict_types=1);

namespace App\Project\Infrastructure\ApiPlatform\State\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Project\Application\Command\DeleteProjectCommand;
use App\Project\Domain\ValueObject\ProjectId;
use App\Project\Infrastructure\ApiPlatform\Resource\ProjectResource;
use App\Shared\Application\Command\CommandBusInterface;
use Webmozart\Assert\Assert;

final class DeleteProjectProcessor implements ProcessorInterface
{
    public function __construct(
        private CommandBusInterface $commandBus,
    ) {
    }

    /**
     * @param mixed $data
     *
     * @return null
     */
    public function process($data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        Assert::isInstanceOf($data, ProjectResource::class);

        $this->commandBus->dispatch(new DeleteProjectCommand(new ProjectId($data->id)));

        return null;
    }
}

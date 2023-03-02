<?php

declare(strict_types=1);

namespace App\Project\Application\Command;

use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Shared\Application\Command\CommandHandlerInterface;

final class DeleteProjectCommandHandler implements CommandHandlerInterface
{
    public function __construct(private readonly ProjectRepositoryInterface $projectRepository)
    {
    }

    public function __invoke(DeleteProjectCommand $command): void
    {
        if (null === $project = $this->projectRepository->ofId($command->id)) {
            return;
        }

        $this->projectRepository->remove($project);
    }
}

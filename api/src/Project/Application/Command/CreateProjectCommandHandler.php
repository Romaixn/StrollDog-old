<?php

declare(strict_types=1);

namespace App\Project\Application\Command;

use App\Project\Domain\Model\Project;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Shared\Application\Command\CommandHandlerInterface;

final class CreateProjectCommandHandler implements CommandHandlerInterface
{
    public function __construct(private readonly ProjectRepositoryInterface $projectRepository)
    {
    }

    public function __invoke(CreateProjectCommand $command): Project
    {
        $project = new Project(
            $command->title,
            $command->excerpt,
            $command->logo ?? null,
            $command->link ?? null,
        );

        $this->projectRepository->save($project);

        return $project;
    }
}

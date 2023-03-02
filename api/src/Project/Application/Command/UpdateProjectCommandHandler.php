<?php

declare(strict_types=1);

namespace App\Project\Application\Command;

use App\Project\Domain\Exception\MissingProjectException;
use App\Project\Domain\Model\Project;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Shared\Application\Command\CommandHandlerInterface;

final class UpdateProjectCommandHandler implements CommandHandlerInterface
{
    public function __construct(private readonly ProjectRepositoryInterface $projectRepository)
    {
    }

    public function __invoke(UpdateProjectCommand $command): Project
    {
        $project = $this->projectRepository->ofId($command->id);
        if (null === $project) {
            throw new MissingProjectException($command->id);
        }

        $project->title = $command->title ?? $project->title;
        $project->excerpt = $command->excerpt ?? $project->excerpt;
        $project->logo = $command->logo ?? $project->logo;
        $project->link = $command->link ?? $project->link;

        $this->projectRepository->save($project);

        return $project;
    }
}

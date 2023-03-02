<?php

declare(strict_types=1);

namespace App\Project\Infrastructure\InMemory;

use App\Project\Domain\Model\Project;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Project\Domain\ValueObject\ProjectId;
use App\Shared\Infrastructure\InMemory\InMemoryRepository;

/**
 * @extends InMemoryRepository<Project>
 */
final class InMemoryProjectRepository extends InMemoryRepository implements ProjectRepositoryInterface
{
    public function save(Project $project): void
    {
        $this->entities[(string) $project->id] = $project;
    }

    public function remove(Project $project): void
    {
        unset($this->entities[(string) $project->id]);
    }

    public function ofId(ProjectId $id): ?Project
    {
        return $this->entities[(string) $id] ?? null;
    }
}

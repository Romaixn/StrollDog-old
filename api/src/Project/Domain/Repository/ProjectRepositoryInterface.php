<?php

declare(strict_types=1);

namespace App\Project\Domain\Repository;

use App\Project\Domain\Model\Project;
use App\Project\Domain\ValueObject\ProjectId;
use App\Shared\Domain\Repository\RepositoryInterface;

/**
 * @extends RepositoryInterface<Project>
 */
interface ProjectRepositoryInterface extends RepositoryInterface
{
    public function save(Project $project): void;

    public function remove(Project $project): void;

    public function ofId(ProjectId $id): ?Project;
}

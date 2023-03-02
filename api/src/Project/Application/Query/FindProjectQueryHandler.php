<?php

declare(strict_types=1);

namespace App\Project\Application\Query;

use App\Project\Domain\Model\Project;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Shared\Application\Query\QueryHandlerInterface;

final class FindProjectQueryHandler implements QueryHandlerInterface
{
    public function __construct(private ProjectRepositoryInterface $repository)
    {
    }

    public function __invoke(FindProjectQuery $query): ?Project
    {
        return $this->repository->ofId($query->id);
    }
}

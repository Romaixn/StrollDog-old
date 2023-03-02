<?php

declare(strict_types=1);

namespace App\Project\Application\Query;

use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Shared\Application\Query\QueryHandlerInterface;

final class FindProjectsQueryHandler implements QueryHandlerInterface
{
    public function __construct(private ProjectRepositoryInterface $projectRepository)
    {
    }

    public function __invoke(FindProjectsQuery $query): ProjectRepositoryInterface
    {
        $projectRepository = $this->projectRepository;

        if (null !== $query->page && null !== $query->itemsPerPage) {
            $projectRepository = $projectRepository->withPagination($query->page, $query->itemsPerPage);
        }

        return $projectRepository;
    }
}

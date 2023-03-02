<?php

declare(strict_types=1);

namespace App\Project\Application\Query;

use App\Shared\Application\Query\QueryInterface;

final class FindProjectsQuery implements QueryInterface
{
    public function __construct(
        public readonly ?int $page = null,
        public readonly ?int $itemsPerPage = null,
    ) {
    }
}

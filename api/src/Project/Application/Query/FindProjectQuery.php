<?php

declare(strict_types=1);

namespace App\Project\Application\Query;

use App\Project\Domain\ValueObject\ProjectId;
use App\Shared\Application\Query\QueryInterface;

final class FindProjectQuery implements QueryInterface
{
    public function __construct(
        public readonly ProjectId $id,
    ) {
    }
}

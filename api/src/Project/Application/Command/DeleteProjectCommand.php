<?php

declare(strict_types=1);

namespace App\Project\Application\Command;

use App\Project\Domain\ValueObject\ProjectId;
use App\Shared\Application\Command\CommandInterface;

final class DeleteProjectCommand implements CommandInterface
{
    public function __construct(
        public readonly ProjectId $id,
    ) {
    }
}

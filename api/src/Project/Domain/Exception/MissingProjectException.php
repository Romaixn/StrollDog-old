<?php

declare(strict_types=1);

namespace App\Project\Domain\Exception;

use App\Project\Domain\ValueObject\ProjectId;

final class MissingProjectException extends \RuntimeException
{
    public function __construct(ProjectId $id, int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct(sprintf('Cannot find project with id %s', (string) $id), $code, $previous);
    }
}

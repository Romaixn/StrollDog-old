<?php

declare(strict_types=1);

namespace App\Project\Application\Command;

use App\Project\Domain\ValueObject\ProjectExcerpt;
use App\Project\Domain\ValueObject\ProjectLink;
use App\Project\Domain\ValueObject\ProjectLogo;
use App\Project\Domain\ValueObject\ProjectTitle;
use App\Shared\Application\Command\CommandInterface;

final class CreateProjectCommand implements CommandInterface
{
    public function __construct(
        public readonly ProjectTitle $title,
        public readonly ProjectExcerpt $excerpt,
        public readonly ?ProjectLogo $logo = null,
        public readonly ?ProjectLink $link = null,
    ) {
    }
}

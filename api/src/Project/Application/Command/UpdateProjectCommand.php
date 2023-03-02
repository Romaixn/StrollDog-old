<?php

declare(strict_types=1);

namespace App\Project\Application\Command;

use App\Project\Domain\ValueObject\ProjectExcerpt;
use App\Project\Domain\ValueObject\ProjectId;
use App\Project\Domain\ValueObject\ProjectLink;
use App\Project\Domain\ValueObject\ProjectLogo;
use App\Project\Domain\ValueObject\ProjectTitle;
use App\Shared\Application\Command\CommandInterface;

final class UpdateProjectCommand implements CommandInterface
{
    public function __construct(
        public readonly ProjectId $id,
        public readonly ?ProjectTitle $title = null,
        public readonly ?ProjectExcerpt $excerpt = null,
        public readonly ?ProjectLogo $logo = null,
        public readonly ?ProjectLink $link = null,
    ) {
    }
}

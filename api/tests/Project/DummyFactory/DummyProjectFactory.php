<?php

declare(strict_types=1);

namespace App\Tests\Project\DummyFactory;

use App\Project\Domain\Model\Project;
use App\Project\Domain\ValueObject\ProjectExcerpt;
use App\Project\Domain\ValueObject\ProjectLink;
use App\Project\Domain\ValueObject\ProjectLogo;
use App\Project\Domain\ValueObject\ProjectTitle;

final class DummyProjectFactory
{
    private function __construct()
    {
    }

    public static function createProject(
        string $title = 'title',
        string $excerpt = 'excerpt',
        string $logo = 'logo',
        string $link = 'https://example.com',
    ): Project {
        return new Project(
            new ProjectTitle($title),
            new ProjectExcerpt($excerpt),
            new ProjectLogo($logo),
            new ProjectLink($link),
        );
    }
}

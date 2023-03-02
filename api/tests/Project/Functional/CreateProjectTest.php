<?php

declare(strict_types=1);

namespace App\Tests\Project\Functional;

use App\Project\Application\Command\CreateProjectCommand;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Project\Domain\ValueObject\ProjectExcerpt;
use App\Project\Domain\ValueObject\ProjectLink;
use App\Project\Domain\ValueObject\ProjectLogo;
use App\Project\Domain\ValueObject\ProjectTitle;
use App\Shared\Application\Command\CommandBusInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Webmozart\Assert\InvalidArgumentException;

final class CreateProjectTest extends KernelTestCase
{
    public function testCreateProject(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var CommandBusInterface $commandBus */
        $commandBus = static::getContainer()->get(CommandBusInterface::class);

        static::assertEmpty($projectRepository);

        $commandBus->dispatch(new CreateProjectCommand(
            new ProjectTitle('title'),
            new ProjectExcerpt('excerpt'),
        ));

        static::assertCount(1, $projectRepository);

        $project = array_values(iterator_to_array($projectRepository))[0];

        static::assertEquals(new ProjectTitle('title'), $project->title);
        static::assertEquals(new ProjectExcerpt('excerpt'), $project->excerpt);
    }

    public function testCreateProjectWithLogoAndLink(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var CommandBusInterface $commandBus */
        $commandBus = static::getContainer()->get(CommandBusInterface::class);

        static::assertEmpty($projectRepository);

        $commandBus->dispatch(new CreateProjectCommand(
            new ProjectTitle('title'),
            new ProjectExcerpt('excerpt'),
            new ProjectLogo('logo'),
            new ProjectLink('https://example.com'),
        ));

        static::assertCount(1, $projectRepository);

        $project = array_values(iterator_to_array($projectRepository))[0];

        static::assertEquals(new ProjectTitle('title'), $project->title);
        static::assertEquals(new ProjectExcerpt('excerpt'), $project->excerpt);
        static::assertEquals(new ProjectLogo('logo'), $project->logo);
        static::assertEquals(new ProjectLink('https://example.com'), $project->link);
    }

    public function testCreateProjectWithInvalidLink(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var CommandBusInterface $commandBus */
        $commandBus = static::getContainer()->get(CommandBusInterface::class);

        static::assertEmpty($projectRepository);

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Expected a value to start with "http". Got: "example.com"');

        $commandBus->dispatch(new CreateProjectCommand(
            new ProjectTitle('title'),
            new ProjectExcerpt('excerpt'),
            new ProjectLogo('logo'),
            new ProjectLink('example.com'),
        ));
    }
}

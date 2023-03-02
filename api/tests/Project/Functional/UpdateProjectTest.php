<?php

declare(strict_types=1);

namespace App\Tests\Project\Functional;

use App\Project\Application\Command\UpdateProjectCommand;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Project\Domain\ValueObject\ProjectExcerpt;
use App\Project\Domain\ValueObject\ProjectLink;
use App\Project\Domain\ValueObject\ProjectTitle;
use App\Shared\Application\Command\CommandBusInterface;
use App\Tests\Project\DummyFactory\DummyProjectFactory;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Webmozart\Assert\InvalidArgumentException;

final class UpdateProjectTest extends KernelTestCase
{
    public function testUpdateProject(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var CommandBusInterface $commandBus */
        $commandBus = static::getContainer()->get(CommandBusInterface::class);

        $initialProject = DummyProjectFactory::createProject(
            title: 'title',
            excerpt: 'excerpt'
        );

        $projectRepository->save($initialProject);

        $commandBus->dispatch(new UpdateProjectCommand(
            $initialProject->id,
            title: new ProjectTitle('newTitle')
        ));

        $project = $projectRepository->ofId($initialProject->id);

        static::assertEquals(new ProjectTitle('newTitle'), $project->title);
        static::assertEquals(new ProjectExcerpt('excerpt'), $project->excerpt);
    }

    public function testUpdateProjectWithLogoAndLink(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var CommandBusInterface $commandBus */
        $commandBus = static::getContainer()->get(CommandBusInterface::class);

        $initialProject = DummyProjectFactory::createProject(
            title: 'title',
            excerpt: 'excerpt',
            logo: 'logo',
            link: 'https://example.com'
        );

        $projectRepository->save($initialProject);

        $commandBus->dispatch(new UpdateProjectCommand(
            $initialProject->id,
            title: new ProjectTitle('newTitle'),
            link: new ProjectLink('https://new.example.com')
        ));

        $project = $projectRepository->ofId($initialProject->id);

        static::assertEquals(new ProjectTitle('newTitle'), $project->title);
        static::assertEquals(new ProjectLink('https://new.example.com'), $project->link);
        static::assertEquals(new ProjectExcerpt('excerpt'), $project->excerpt);
    }

    public function testUpdateProjectWithInvalidLink(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var CommandBusInterface $commandBus */
        $commandBus = static::getContainer()->get(CommandBusInterface::class);

        $initialProject = DummyProjectFactory::createProject(
            title: 'title',
            excerpt: 'excerpt',
            logo: 'logo',
            link: 'https://example.com'
        );

        $projectRepository->save($initialProject);

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Expected a value to start with "http". Got: "new.example.com"');

        $commandBus->dispatch(new UpdateProjectCommand(
            $initialProject->id,
            title: new ProjectTitle('newTitle'),
            link: new ProjectLink('new.example.com')
        ));
    }
}

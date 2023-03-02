<?php

declare(strict_types=1);

namespace App\Tests\Project\Functional;

use App\Project\Application\Query\FindProjectsQuery;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Shared\Application\Query\QueryBusInterface;
use App\Tests\Project\DummyFactory\DummyProjectFactory;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

final class FindProjectsTest extends KernelTestCase
{
    public function testFindProjects(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var QueryBusInterface $queryBus */
        $queryBus = static::getContainer()->get(QueryBusInterface::class);

        $initialProjects = [
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
        ];

        foreach ($initialProjects as $project) {
            $projectRepository->save($project);
        }

        $projects = $queryBus->ask(new FindProjectsQuery());

        static::assertCount(count($initialProjects), $projects);
        foreach ($projects as $project) {
            static::assertContains($project, $initialProjects);
        }
    }

    public function testReturnPaginatedProjects(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var QueryBusInterface $queryBus */
        $queryBus = static::getContainer()->get(QueryBusInterface::class);

        $initialProjects = [
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
        ];

        foreach ($initialProjects as $project) {
            $projectRepository->save($project);
        }

        $projects = $queryBus->ask(new FindProjectsQuery(page: 2, itemsPerPage: 2));

        static::assertCount(2, $projects);
        $i = 0;
        foreach ($projects as $project) {
            static::assertSame($initialProjects[$i + 2], $project);
            ++$i;
        }
    }
}

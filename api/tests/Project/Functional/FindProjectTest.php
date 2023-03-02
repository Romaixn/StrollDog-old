<?php

declare(strict_types=1);

namespace App\Tests\Project\Functional;

use App\Project\Application\Query\FindProjectQuery;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Shared\Application\Query\QueryBusInterface;
use App\Tests\Project\DummyFactory\DummyProjectFactory;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

final class FindProjectTest extends KernelTestCase
{
    public function testFindProject(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var QueryBusInterface $queryBus */
        $queryBus = static::getContainer()->get(QueryBusInterface::class);

        $project = DummyProjectFactory::createProject();
        $projectRepository->save($project);

        static::assertSame($project, $queryBus->ask(new FindProjectQuery($project->id)));
    }
}

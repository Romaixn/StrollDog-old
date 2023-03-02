<?php

declare(strict_types=1);

namespace App\Tests\Project\Functional;

use App\Project\Application\Command\DeleteProjectCommand;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Shared\Application\Command\CommandBusInterface;
use App\Tests\Project\DummyFactory\DummyProjectFactory;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

final class DeleteProjectTest extends KernelTestCase
{
    public function testDeleteProject(): void
    {
        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        /** @var CommandBusInterface $commandBus */
        $commandBus = static::getContainer()->get(CommandBusInterface::class);

        $project = DummyProjectFactory::createProject();
        $projectRepository->save($project);

        static::assertCount(1, $projectRepository);

        $commandBus->dispatch(new DeleteProjectCommand($project->id));

        static::assertEmpty($projectRepository);
    }
}

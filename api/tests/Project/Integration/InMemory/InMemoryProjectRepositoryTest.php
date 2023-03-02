<?php

declare(strict_types=1);

namespace App\Tests\Project\Integration\InMemory;

use App\Project\Infrastructure\InMemory\InMemoryProjectRepository;
use App\Shared\Infrastructure\InMemory\InMemoryPaginator;
use App\Tests\Project\DummyFactory\DummyProjectFactory;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

final class InMemoryProjectRepositoryTest extends KernelTestCase
{
    public function testAdd(): void
    {
        /** @var InMemoryProjectRepository $repository */
        $repository = static::getContainer()->get(InMemoryProjectRepository::class);

        static::assertEmpty($repository);

        $project = DummyProjectFactory::createProject();
        $repository->save($project);

        static::assertCount(1, $repository);
    }

    public function testRemove(): void
    {
        /** @var InMemoryProjectRepository $repository */
        $repository = static::getContainer()->get(InMemoryProjectRepository::class);

        $project = DummyProjectFactory::createProject();
        $repository->save($project);

        static::assertCount(1, $repository);

        $repository->remove($project);
        static::assertEmpty($repository);
    }

    public function testOfId(): void
    {
        /** @var InMemoryProjectRepository $repository */
        $repository = static::getContainer()->get(InMemoryProjectRepository::class);

        static::assertEmpty($repository);

        $project = DummyProjectFactory::createProject();
        $repository->save($project);

        static::assertSame($project, $repository->ofId($project->id));
    }

    public function testWithPagination(): void
    {
        /** @var InMemoryProjectRepository $repository */
        $repository = static::getContainer()->get(InMemoryProjectRepository::class);
        static::assertNull($repository->paginator());

        $repository = $repository->withPagination(1, 2);

        static::assertInstanceOf(InMemoryPaginator::class, $repository->paginator());
    }

    public function testWithoutPagination(): void
    {
        /** @var InMemoryProjectRepository $repository */
        $repository = static::getContainer()->get(InMemoryProjectRepository::class);
        $repository = $repository->withPagination(1, 2);
        static::assertNotNull($repository->paginator());

        $repository = $repository->withoutPagination();
        static::assertNull($repository->paginator());
    }

    public function testIteratorWithoutPagination(): void
    {
        /** @var InMemoryProjectRepository $repository */
        $repository = static::getContainer()->get(InMemoryProjectRepository::class);
        static::assertNull($repository->paginator());

        $projects = [
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
        ];
        foreach ($projects as $project) {
            $repository->save($project);
        }

        $i = 0;
        foreach ($repository as $project) {
            static::assertSame($projects[$i], $project);
            ++$i;
        }
    }

    public function testIteratorWithPagination(): void
    {
        /** @var InMemoryProjectRepository $repository */
        $repository = static::getContainer()->get(InMemoryProjectRepository::class);
        static::assertNull($repository->paginator());

        $projects = [
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
        ];
        foreach ($projects as $project) {
            $repository->save($project);
        }

        $repository = $repository->withPagination(1, 2);

        $i = 0;
        foreach ($repository as $project) {
            static::assertSame($projects[$i], $project);
            ++$i;
        }

        static::assertSame(2, $i);

        $repository = $repository->withPagination(2, 2);

        $i = 0;
        foreach ($repository as $project) {
            static::assertSame($projects[$i + 2], $project);
            ++$i;
        }

        static::assertSame(1, $i);
    }

    public function testCount(): void
    {
        /** @var InMemoryProjectRepository $repository */
        $repository = static::getContainer()->get(InMemoryProjectRepository::class);

        $projects = [
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
            DummyProjectFactory::createProject(),
        ];
        foreach ($projects as $project) {
            $repository->save($project);
        }

        static::assertCount(count($projects), $repository);
        static::assertCount(2, $repository->withPagination(1, 2));
    }
}

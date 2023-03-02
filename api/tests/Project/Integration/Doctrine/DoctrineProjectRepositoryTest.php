<?php

declare(strict_types=1);

namespace App\Tests\Project\Integration\Doctrine;

use App\Project\Infrastructure\Doctrine\DoctrineProjectRepository;
use App\Shared\Infrastructure\Doctrine\DoctrinePaginator;
use App\Tests\Project\DummyFactory\DummyProjectFactory;
use Doctrine\DBAL\Connection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\NullOutput;

final class DoctrineProjectRepositoryTest extends KernelTestCase
{
    private static Connection $connection;

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();

        static::$connection = static::getContainer()->get(Connection::class);

        (new Application(static::$kernel))
            ->find('doctrine:database:create')
            ->run(new ArrayInput(['--if-not-exists' => true]), new NullOutput());

        (new Application(static::$kernel))
            ->find('doctrine:schema:update')
            ->run(new ArrayInput(['--force' => true]), new NullOutput());
    }

    protected function setUp(): void
    {
        static::$connection->executeStatement('TRUNCATE project');
    }

    public function testSave(): void
    {
        /** @var DoctrineProjectRepository $repository */
        $repository = static::getContainer()->get(DoctrineProjectRepository::class);

        static::assertEmpty($repository);

        $project = DummyProjectFactory::createProject();
        $repository->save($project);

        static::assertCount(1, $repository);
    }

    public function testRemove(): void
    {
        /** @var DoctrineProjectRepository $repository */
        $repository = static::getContainer()->get(DoctrineProjectRepository::class);

        $project = DummyProjectFactory::createProject();
        $repository->save($project);

        static::assertCount(1, $repository);

        $repository->remove($project);
        static::assertEmpty($repository);
    }

    public function testOfId(): void
    {
        /** @var DoctrineProjectRepository $repository */
        $repository = static::getContainer()->get(DoctrineProjectRepository::class);

        static::assertEmpty($repository);

        $project = DummyProjectFactory::createProject();
        $repository->save($project);

        static::getContainer()->get(EntityManagerInterface::class)->clear();

        static::assertEquals($project, $repository->ofId($project->id));
    }

    public function testWithPagination(): void
    {
        /** @var DoctrineProjectRepository $repository */
        $repository = static::getContainer()->get(DoctrineProjectRepository::class);
        static::assertNull($repository->paginator());

        $repository = $repository->withPagination(1, 2);

        static::assertInstanceOf(DoctrinePaginator::class, $repository->paginator());
    }

    public function testWithoutPagination(): void
    {
        /** @var DoctrineProjectRepository $repository */
        $repository = static::getContainer()->get(DoctrineProjectRepository::class);
        $repository = $repository->withPagination(1, 2);
        static::assertNotNull($repository->paginator());

        $repository = $repository->withoutPagination();
        static::assertNull($repository->paginator());
    }

    public function testIteratorWithoutPagination(): void
    {
        /** @var DoctrineProjectRepository $repository */
        $repository = static::getContainer()->get(DoctrineProjectRepository::class);
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
        /** @var DoctrineProjectRepository $repository */
        $repository = static::getContainer()->get(DoctrineProjectRepository::class);
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
            static::assertContains($project, $projects);
            ++$i;
        }

        static::assertSame(2, $i);

        $repository = $repository->withPagination(2, 2);

        $i = 0;
        foreach ($repository as $project) {
            static::assertContains($project, $projects);
            ++$i;
        }

        static::assertSame(1, $i);
    }

    public function testCount(): void
    {
        /** @var DoctrineProjectRepository $repository */
        $repository = static::getContainer()->get(DoctrineProjectRepository::class);

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

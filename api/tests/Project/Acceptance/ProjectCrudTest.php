<?php

declare(strict_types=1);

namespace App\Tests\Project\Acceptance;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Project\Domain\ValueObject\ProjectExcerpt;
use App\Project\Domain\ValueObject\ProjectId;
use App\Project\Domain\ValueObject\ProjectTitle;
use App\Project\Infrastructure\ApiPlatform\Resource\ProjectResource;
use App\Tests\Project\DummyFactory\DummyProjectFactory;
use Symfony\Component\Uid\Uuid;

final class ProjectCrudTest extends ApiTestCase
{
    public function testReturnPaginatedProjects(): void
    {
        $client = static::createClient();

        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        for ($i = 0; $i < 100; ++$i) {
            $projectRepository->save(DummyProjectFactory::createProject());
        }

        $client->request('GET', '/api/projects');

        static::assertResponseIsSuccessful();
        static::assertMatchesResourceCollectionJsonSchema(ProjectResource::class);

        static::assertJsonContains([
            'hydra:totalItems' => 100,
            'hydra:view' => [
                'hydra:first' => '/api/projects?page=1',
                'hydra:next' => '/api/projects?page=2',
                'hydra:last' => '/api/projects?page=4',
            ],
        ]);
    }

    public function testReturnProject(): void
    {
        $client = static::createClient();

        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        $project = DummyProjectFactory::createProject(
            title: 'title',
            excerpt: 'excerpt'
        );
        $projectRepository->save($project);

        $client->request('GET', sprintf('/api/projects/%s', (string) $project->id));

        static::assertResponseIsSuccessful();
        static::assertMatchesResourceItemJsonSchema(ProjectResource::class);

        static::assertJsonContains([
            'title' => 'title',
            'excerpt' => 'excerpt',
        ]);
    }

    public function testCreateProject(): void
    {
        $client = static::createClient();

        $response = $client->request('POST', '/api/projects', [
            'json' => [
                'title' => 'title',
                'excerpt' => 'excerpt',
            ],
        ]);

        static::assertResponseIsSuccessful();
        static::assertMatchesResourceItemJsonSchema(ProjectResource::class);

        static::assertJsonContains([
            'title' => 'title',
            'excerpt' => 'excerpt',
        ]);

        $id = new ProjectId(Uuid::fromString(str_replace('/api/projects/', '', $response->toArray()['@id'])));

        $project = static::getContainer()->get(ProjectRepositoryInterface::class)->ofId($id);

        static::assertNotNull($project);
        static::assertEquals($id, $project->id);
        static::assertEquals(new ProjectTitle('title'), $project->title);
        static::assertEquals(new ProjectExcerpt('excerpt'), $project->excerpt);
    }

    public function testCannotCreateProjectWithoutValidPayload(): void
    {
        $client = static::createClient();

        $client->request('POST', '/api/projects', [
            'json' => [
                'title' => '',
                'excerpt' => '',
                'link' => 'example.com',
            ],
        ]);

        static::assertResponseIsUnprocessable();
        static::assertJsonContains([
            'violations' => [
                ['propertyPath' => 'title', 'message' => 'This value is too short. It should have 1 character or more.'],
                ['propertyPath' => 'excerpt', 'message' => 'This value is too short. It should have 1 character or more.'],
                ['propertyPath' => 'link', 'message' => 'This value is not a valid URL.'],
            ],
        ]);

        $client->request('POST', '/api/projects', [
            'json' => [],
        ]);

        static::assertResponseIsUnprocessable();
        static::assertJsonContains([
            'violations' => [
                ['propertyPath' => 'title', 'message' => 'This value should not be null.'],
                ['propertyPath' => 'excerpt', 'message' => 'This value should not be null.'],
            ],
        ]);
    }

    public function testUpdateProject(): void
    {
        $client = static::createClient();

        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        $project = DummyProjectFactory::createProject();
        $projectRepository->save($project);

        $client->request('PUT', sprintf('/api/projects/%s', (string) $project->id), [
            'json' => [
                'title' => 'newTitle',
                'excerpt' => 'newExcerpt',
            ],
        ]);

        static::assertResponseIsSuccessful();
        static::assertMatchesResourceItemJsonSchema(ProjectResource::class);

        static::assertJsonContains([
            'title' => 'newTitle',
            'excerpt' => 'newExcerpt',
        ]);

        $updatedProject = $projectRepository->ofId($project->id);

        static::assertNotNull($project);
        static::assertEquals(new ProjectTitle('newTitle'), $updatedProject->title);
        static::assertEquals(new ProjectExcerpt('newExcerpt'), $updatedProject->excerpt);
    }

    public function testPartiallyUpdateProject(): void
    {
        $client = static::createClient();

        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        $project = DummyProjectFactory::createProject(title: 'name', excerpt: 'excerpt');
        $projectRepository->save($project);

        $client->request('PATCH', sprintf('/api/projects/%s', (string) $project->id), [
            'headers' => [
                'Content-Type' => 'application/merge-patch+json',
            ],
            'json' => [
                'title' => 'newTitle',
            ],
        ]);

        static::assertResponseIsSuccessful();
        static::assertMatchesResourceItemJsonSchema(ProjectResource::class);

        static::assertJsonContains([
            'title' => 'newTitle',
        ]);

        $updatedProject = $projectRepository->ofId($project->id);

        static::assertNotNull($project);
        static::assertEquals(new ProjectTitle('newTitle'), $updatedProject->title);
        static::assertEquals(new ProjectExcerpt('excerpt'), $updatedProject->excerpt);
    }

    public function testDeleteProject(): void
    {
        $client = static::createClient();

        /** @var ProjectRepositoryInterface $projectRepository */
        $projectRepository = static::getContainer()->get(ProjectRepositoryInterface::class);

        $project = DummyProjectFactory::createProject();
        $projectRepository->save($project);

        $response = $client->request('DELETE', sprintf('/api/projects/%s', (string) $project->id));

        static::assertResponseIsSuccessful();
        static::assertEmpty($response->getContent());

        static::assertNull($projectRepository->ofId($project->id));
    }
}

<?php

declare(strict_types=1);

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Place;
use App\Tests\AbstractTest;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class PlacesTest extends AbstractTest
{
    public function testGetCollection(): void
    {
        $response = static::createClient()->request('GET', '/places');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/Place',
            '@id' => '/places',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 100,
            'hydra:view' => [
                '@id' => '/places?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/places?page=1',
                'hydra:last' => '/places?page=4',
                'hydra:next' => '/places?page=2',
            ],
        ]);

        $this->assertCount(30, $response->toArray()['hydra:member']);
        $this->assertMatchesResourceCollectionJsonSchema(Place::class);
    }

    public function testCreatePlaceErrorWithoutLogin(): void
    {
        static::createClient()->request('POST', '/places', [
            'json' => [
                'title' => 'Test',
                'description' => 'Test',
                'address' => 'Test',
                'city' => 'Test',
                'postalCode' => '00000',
            ],
        ]);

        $this->assertResponseStatusCodeSame(401);
        $this->assertJsonContains(['message' => 'JWT Token not found']);
    }

    public function testCreatePlaceWithLogin(): void
    {
        $response = $this->createClientWithCredentials()->request('POST', '/places', [
            'json' => [
                'title' => 'Test',
                'description' => 'Test',
                'address' => 'Test',
                'city' => 'Test',
                'postalCode' => '00000',
            ],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/Place',
            'title' => 'Test',
            'description' => 'Test',
            'address' => 'Test',
            'city' => 'Test',
            'postalCode' => '00000'
        ]);

        $this->assertMatchesResourceItemJsonSchema(Place::class);
    }
}

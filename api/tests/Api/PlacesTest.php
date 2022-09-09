<?php

declare(strict_types=1);

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class PlacesTest extends ApiTestCase
{
    use RefreshDatabaseTrait;

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
    }
}

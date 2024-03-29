<?php

declare(strict_types=1);

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Type;
use App\Tests\AbstractTest;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class TypesTest extends AbstractTest
{
    public function testGetCollection(): void
    {
        $response = static::createClient()->request('GET', '/types');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/Type',
            '@id' => '/types',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 10,
        ]);

        $this->assertCount(10, $response->toArray()['hydra:member']);

        $this->assertMatchesResourceCollectionJsonSchema(Type::class);
    }
}

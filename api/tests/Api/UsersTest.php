<?php

declare(strict_types=1);

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class UsersTest extends ApiTestCase
{
    use RefreshDatabaseTrait;

    public function testCreateUser(): void
    {
        $response = static::createClient()->request('POST', '/users', ['json' => [
            'email' => 'john@doe.com',
            'username' => 'johndoe',
            'name' => 'John Doe',
            'password' => 'johndoepassword1325*',
        ]]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/contexts/User',
            '@type' => 'https://schema.org/User',
            'email' => 'john@doe.com',
            'username' => 'johndoe',
            'name' => 'John Doe',
            'roles' => ['ROLE_USER'],
            'comments' => [],
            'places' => [],
        ]);

        $this->assertMatchesResourceItemJsonSchema(User::class);
    }

    public function testCreateInvalidUser(): void
    {
        static::createClient()->request('POST', '/users', ['json' => [
            'email' => 'invalid',
        ]]);

        $this->assertResponseStatusCodeSame(422);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/ConstraintViolationList',
            '@type' => 'ConstraintViolationList',
            'hydra:title' => 'An error occurred',
            'hydra:description' => 'email: This value is not a valid email address.
username: This value should not be blank.
name: This value should not be blank.',
        ]);
    }
}

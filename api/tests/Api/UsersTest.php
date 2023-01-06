<?php

declare(strict_types=1);

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UsersTest extends ApiTestCase
{
    use RefreshDatabaseTrait;

    public function testCreateUser(): void
    {
        $avatar = new UploadedFile('fixtures/files/image.jpg', 'image.jpg');

        $response = static::createClient()->request('POST', '/users', [
            'headers' => ['Content-Type' => 'multipart/form-data'],
            'extra' => [
                'parameters' => [
                    'email' => 'john@doe.com',
                    'username' => 'johndoe',
                    'name' => 'John Doe',
                    'plainPassword' => 'johndoepassword1325*',
                ],
                'files' => [
                    'avatar' => $avatar,
                ],
            ]
        ]);

        self::assertResponseStatusCodeSame(201);
        self::assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        self::assertMatchesResourceItemJsonSchema(User::class);
    }

    public function testCreateInvalidUser(): void
    {
        static::createClient()->request('POST', '/users', [
            'headers' => ['Content-Type' => 'multipart/form-data'],
            'extra' => [
                'parameters' => [
                    'email' => 'invalid'
                ]
            ]
        ]);

        self::assertResponseStatusCodeSame(422);
        self::assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        self::assertJsonContains([
            '@context' => '/contexts/ConstraintViolationList',
            '@type' => 'ConstraintViolationList',
            'hydra:title' => 'An error occurred',
            'hydra:description' => 'email: This value is not a valid email address.
username: This value should not be blank.
name: This value should not be blank.',
        ]);
    }
}

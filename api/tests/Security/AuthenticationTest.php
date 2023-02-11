<?php

declare(strict_types=1);

namespace App\Tests\Security;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class AuthenticationTest extends ApiTestCase
{
    use ReloadDatabaseTrait;

    public function testLogin(): void
    {
        $client = self::createClient();
        $container = self::getContainer();

        $user = new User();
        $user->setEmail('test@example.com');
        $user->setUsername('test');
        $user->setName('Test');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setPassword(
            $container->get('security.user_password_hasher')->hashPassword($user, '$3CR3T')
        );

        $manager = $container->get('doctrine')->getManager();
        $manager->persist($user);
        $manager->flush();

        // retrieve a token
        $response = $client->request('POST', '/auth', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'test@example.com',
                'password' => '$3CR3T',
            ],
        ]);

        $json = $response->toArray();
        $this->assertResponseIsSuccessful();
        $this->assertArraySubset([
            'token' => $json['token'],
        ], $json);

        // test not authorized
        $client->request('GET', '/users');
        $this->assertResponseStatusCodeSame(401);

        // test authorized
        $client->request('GET', '/users', ['headers' => ['authorization' => 'Bearer ' . $json['token']]]);
        $this->assertResponseIsSuccessful();
    }
}

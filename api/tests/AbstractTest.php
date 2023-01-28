<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Symfony\Bundle\Test\Client;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

abstract class AbstractTest extends ApiTestCase
{
    private ?string $token = null;

    use RefreshDatabaseTrait;

    public function setUp(): void
    {
        self::bootKernel();
    }

    protected function createClientWithCredentials($token = null): Client
    {
        $token = $token ?? $this->getToken();

        return static::createClient([], ['headers' => ['authorization' => 'Bearer ' . $token]]);
    }

    protected function getToken($body = []): string
    {
        if($this->token) {
            return $this->token;
        }

        $response = static::createClient()->request('POST', '/auth', ['body' => $body ?? [
            'email' => 'admin@stroll.dog',
            'password' => 'admin',
        ]]);

        $this->assertResponseIsSuccessful();
        $data = json_decode($response->getContent(), false, 512, JSON_THROW_ON_ERROR);
        $this->token = $data->token;

        return $data->token;
    }
}

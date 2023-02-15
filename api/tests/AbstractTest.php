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

    protected function createClientWithCredentials(string $token = null, bool $isAdmin = true): Client
    {
        $token = $token ?? $this->getToken($isAdmin ? $this->getAdminBody() : $this->getUserBody());

        return static::createClient([], ['headers' => ['authorization' => 'Bearer ' . $token]]);
    }

    /**
     * @param array<string, string>|null $body
     */
    protected function getToken(?array $body = null): string
    {
        if($this->token) {
            return $this->token;
        }

        $response = static::createClient()->request('POST', '/auth', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => $body ?? [
                'email' => 'admin@stroll.dog',
                'password' => 'admin',
            ]
        ]);

        $this->assertResponseIsSuccessful();
        $data = json_decode($response->getContent(), false, 512, JSON_THROW_ON_ERROR);

        /** @phpstan-ignore-next-line */
        $this->token = $data->token;

        /** @phpstan-ignore-next-line */
        return $data->token;
    }

    /**
     * @return array<string, string>
     */
    private function getAdminBody(): array
    {
        return [
            'email' => 'admin@stroll.dog',
            'password' => 'admin',
        ];
    }

    /**
     * @return array<string, string>
     */
    private function getUserBody(): array
    {
        return [
            'email' => 'user@stroll.dog',
            'password' => 'test',
        ];
    }
}

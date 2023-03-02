<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $containerConfigurator->extension(
        'lexik_jwt_authentication',
        [
            'secret_key' => '%env(resolve:JWT_SECRET_KEY)%',
            'public_key' => '%env(resolve:JWT_PUBLIC_KEY)%',
            'pass_phrase' => '%env(JWT_PASSPHRASE)%',
            'token_ttl' => 3600,
            'user_identity_field' => 'email',
            'api_platform' => [
                'check_path' => '/auth',
                'username_path' => 'email'
            ]
        ]
    );
};

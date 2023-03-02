<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $containerConfigurator->extension('vich_uploader', [
        'db_driver' => 'orm',
        'metadata' => [
            'type' => 'attribute'
        ],
        'mappings' => [
            'user_avatar' => [
                'uri_prefix' => '/media/avatars',
                'upload_destination' => '%kernel.project_dir%/public/media/avatars',
                'namer' => 'Vich\UploaderBundle\Naming\OrignameNamer'
            ]
        ]
    ]);
};

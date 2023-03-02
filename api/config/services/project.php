<?php

declare(strict_types=1);

use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Project\Infrastructure\ApiPlatform\State\Processor\CreateProjectProcessor;
use App\Project\Infrastructure\ApiPlatform\State\Processor\DeleteProjectProcessor;
use App\Project\Infrastructure\ApiPlatform\State\Processor\UpdateProjectProcessor;
use App\Project\Infrastructure\ApiPlatform\State\Provider\ProjectCollectionProvider;
use App\Project\Infrastructure\ApiPlatform\State\Provider\ProjectItemProvider;
use App\Project\Infrastructure\Doctrine\DoctrineProjectRepository;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $services = $containerConfigurator->services();

    $services->defaults()
        ->autowire()
        ->autoconfigure();

    $services->load('App\\Project\\', __DIR__.'/../../src/Project');

    // providers
    $services->set(ProjectItemProvider::class)
        ->autoconfigure(false)
        ->tag('api_platform.state_provider', ['priority' => 0]);

    $services->set(ProjectCollectionProvider::class)
        ->autoconfigure(false)
        ->tag('api_platform.state_provider', ['priority' => 0]);

    // processors
    $services->set(CreateProjectProcessor::class)
        ->autoconfigure(false)
        ->tag('api_platform.state_processor', ['priority' => 0]);

    $services->set(UpdateProjectProcessor::class)
        ->autoconfigure(false)
        ->tag('api_platform.state_processor', ['priority' => 0]);

    $services->set(DeleteProjectProcessor::class)
        ->autoconfigure(false)
        ->tag('api_platform.state_processor', ['priority' => 0]);

    // repositories
    $services->set(ProjectRepositoryInterface::class)
        ->class(DoctrineProjectRepository::class);
};

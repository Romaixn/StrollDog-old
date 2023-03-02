<?php

declare(strict_types=1);

use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Project\Infrastructure\Doctrine\DoctrineProjectRepository;
use App\Project\Infrastructure\InMemory\InMemoryProjectRepository;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $services = $containerConfigurator->services();

    $services->defaults()
        ->autowire()
        ->autoconfigure();

    // repositories
    $services->set(ProjectRepositoryInterface::class)
        ->class(InMemoryProjectRepository::class);

    $services->set(InMemoryProjectRepository::class)
        ->public();

    $services->set(DoctrineProjectRepository::class)
        ->public();
};

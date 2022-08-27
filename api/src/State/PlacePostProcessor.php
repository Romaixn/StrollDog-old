<?php

namespace App\State;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use App\Entity\User;
use App\Entity\Place;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Component\Security\Core\Security;

class PlacePostProcessor implements ProcessorInterface
{
    public function __construct(
        private PersistProcessor $decorated,
        private Security $security
    ) {
    }

    /**
     * @param Place $data
     * @param Operation $operation
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     */
    public function process($data, Operation $operation, array $uriVariables = [], array $context = []): Place
    {
        /** @var User $user */
        $user = $this->security->getUser();
        $data->setCreator($user);

        /** @var Place $place */
        $place = $this->decorated->process($data, $operation, $uriVariables, $context);

        return $place;
    }
}

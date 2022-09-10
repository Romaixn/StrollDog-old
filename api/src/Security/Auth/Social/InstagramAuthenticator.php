<?php

declare(strict_types=1);

namespace App\Security\Auth\Social;

use App\Entity\User;
use App\Repository\UserRepository;
use League\OAuth2\Client\Provider\InstagramResourceOwner;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

class InstagramAuthenticator extends AbstractSocialAuthenticator
{
    protected string $serviceName = 'instagram';

    public function getUserFromResourceOwner(ResourceOwnerInterface $instagramUser, UserRepository $repository): ?User
    {
        if (!$instagramUser instanceof InstagramResourceOwner) {
            throw new \RuntimeException('Expecting InstagramResourceOwner as the first parameter');
        }

        /** @var ?User $user */
        $user = $repository->findOrCreateFromOauth('instagram', $instagramUser->getId(), null, $instagramUser->getNickname());

        if ($user && null === $user->getInstagramId()) {
            $user->setInstagramId($instagramUser->getId());
            $this->entityManager->flush();
        }

        return $user;
    }
}

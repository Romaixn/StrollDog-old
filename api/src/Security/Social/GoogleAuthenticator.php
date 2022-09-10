<?php

declare(strict_types=1);

namespace App\Security\Social;

use App\Entity\User;
use App\Repository\UserRepository;
use League\OAuth2\Client\Provider\GoogleUser;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

class GoogleAuthenticator extends AbstractSocialAuthenticator
{
    protected string $serviceName = 'google';

    public function getUserFromResourceOwner(ResourceOwnerInterface $googleUser, UserRepository $repository): ?User
    {
        if (!$googleUser instanceof GoogleUser) {
            throw new \RuntimeException('Expecting GoogleUser as the first parameter');
        }

        /** @var ?User $user */
        /** @phpstan-ignore-next-line */
        $user = $repository->findOrCreateFromOauth('google', $googleUser->getId(), $googleUser->getEmail());

        if ($user && null === $user->getGoogleId()) {
            /** @phpstan-ignore-next-line */
            $user->setGoogleId($googleUser->getId());
            $this->entityManager->flush();
        }

        return $user;
    }
}

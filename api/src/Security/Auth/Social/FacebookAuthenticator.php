<?php

declare(strict_types=1);

namespace App\Security\Auth\Social;

use App\Entity\User;
use App\Repository\UserRepository;
use League\OAuth2\Client\Provider\FacebookUser;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

class FacebookAuthenticator extends AbstractSocialAuthenticator
{
    protected string $serviceName = 'facebook';

    public function getUserFromResourceOwner(ResourceOwnerInterface $facebookUser, UserRepository $repository): ?User
    {
        if (!$facebookUser instanceof FacebookUser) {
            throw new \RuntimeException('Expecting FacebookUser as the first parameter');
        }

        /** @var ?User $user */
        $user = $repository->findOrCreateFromOauth('facebook', $facebookUser->getId(), $facebookUser->getEmail());

        if ($user && null === $user->getFacebookId()) {
            $user->setFacebookId($facebookUser->getId());
            $this->entityManager->flush();
        }

        return $user;
    }
}

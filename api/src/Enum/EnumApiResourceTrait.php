<?php

declare(strict_types=1);

namespace App\Enum;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\Operation;
use Symfony\Component\Serializer\Annotation\Groups;

trait EnumApiResourceTrait
{
    #[ApiProperty(types: ['https://schema.org/identifier'])]
    public function getId()
    {
        return $this->name;
    }

    #[Groups('read')]
    #[ApiProperty(types: ['https://schema.org/name'])]
    public function getValue()
    {
        return $this->value;
    }

    public static function getCases()
    {
        return self::cases();
    }

    public static function getCase(Operation $operation, array $uriVariables)
    {
        $name = $uriVariables['id'] ?? null;
        return self::tryFrom($name);
    }
}

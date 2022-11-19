<?php

declare(strict_types=1);

namespace App\Enum;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\Operation;
use Symfony\Component\Serializer\Annotation\Groups;

trait EnumApiResourceTrait
{
    #[ApiProperty(types: ['https://schema.org/identifier'])]
    public function getId(): string
    {
        return $this->name;
    }

    #[Groups('read')]
    #[ApiProperty(types: ['https://schema.org/name'])]
    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @return array<int, Influx::HIGH|Influx::LOW|Influx::MODERATE>
     */
    public static function getCases(): array
    {
        return self::cases();
    }

    /**
     * @param array<string> $uriVariables
     */
    public static function getCase(Operation $operation, array $uriVariables): Influx|null
    {
        $name = $uriVariables['id'] ?? null;

        return self::tryFrom((string) $name);
    }
}

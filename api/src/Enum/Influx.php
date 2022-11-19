<?php

declare(strict_types=1);

namespace App\Enum;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;

#[ApiResource(
    description: 'Influx used for a place',
    types: ['https://schema.org/Enumeration'],
    normalizationContext: ['groups' => ['read']]
)]
#[GetCollection(provider: Influx::class.'::getCases')]
#[Get(provider: Influx::class.'::getCase')]
enum Influx: string
{
    use EnumApiResourceTrait;
    case LOW = 'low';
    case MODERATE = 'moderate';
    case HIGH = 'high';
}

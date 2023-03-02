<?php

declare(strict_types=1);

namespace App\Project\Domain\ValueObject;

use Doctrine\ORM\Mapping as ORM;
use Webmozart\Assert\Assert;

#[ORM\Embeddable]
final class ProjectExcerpt
{
    #[ORM\Column(name: 'description', length: 1023)]
    public readonly string $value;

    public function __construct(string $value)
    {
        Assert::lengthBetween($value, 1, 1023);

        $this->value = $value;
    }
}

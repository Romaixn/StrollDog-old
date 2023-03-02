<?php

declare(strict_types=1);

namespace App\Project\Domain\ValueObject;

use Doctrine\ORM\Mapping as ORM;
use Webmozart\Assert\Assert;

#[ORM\Embeddable]
class ProjectLink
{
    #[ORM\Column(name: 'link', nullable: true)]
    public readonly ?string $value;

    public function __construct(?string $value)
    {
        Assert::nullOrStartsWith($value, 'http');

        $this->value = $value;
    }
}

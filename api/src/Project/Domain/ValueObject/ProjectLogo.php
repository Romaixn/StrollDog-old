<?php

declare(strict_types=1);

namespace App\Project\Domain\ValueObject;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Embeddable]
class ProjectLogo
{
    #[ORM\Column(name: 'logo', length: 1023, nullable: true)]
    public readonly ?string $value;

    public function __construct(?string $value)
    {
        $this->value = $value;
    }
}

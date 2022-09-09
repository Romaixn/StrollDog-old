<?php

namespace App\Enum;

enum Influx: string
{
    case LOW = 'low';
    case MODERATE = 'moderate';
    CASE HIGH = 'high';

    /**
     * @return array<string, string>
     */
    public static function getAsArray(): array
    {
        return array_reduce(
            self::cases(),
            static fn(array $choices, Influx $influx) => $choices + [$influx->name => $influx->value],
            []
        );
    }
}

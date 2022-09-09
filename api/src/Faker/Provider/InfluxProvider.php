<?php

declare(strict_types=1);

namespace App\Faker\Provider;

use App\Enum\Influx;
use Faker\Provider\Base as BaseProvider;

final class InfluxProvider extends BaseProvider
{
    public function influxLow(): Influx
    {
        return Influx::LOW;
    }

    public function influxModerate(): Influx
    {
        return Influx::MODERATE;
    }

    public function influxHigh(): Influx
    {
        return Influx::HIGH;
    }

    public function randomInflux(): Influx
    {
        return Influx::cases()[array_rand(Influx::cases())];
    }
}

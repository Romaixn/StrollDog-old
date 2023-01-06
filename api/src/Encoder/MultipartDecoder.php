<?php

namespace App\Encoder;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Serializer\Encoder\DecoderInterface;

final class MultipartDecoder implements DecoderInterface
{
    public const FORMAT = 'multipart';

    public function __construct(private readonly RequestStack $requestStack) {}

    /**
     * {@inheritdoc}
     *
     * @return array<string, mixed> The decoded data
     */
    public function decode(string $data, string $format, array $context = []): ?array
    {
        $request = $this->requestStack->getCurrentRequest();

        if (!$request) {
            return null;
        }

        /** @phpstan-ignore-next-line */
        return array_map(static function (string $element) {
                // Multipart form values will be encoded in JSON.
                $decoded = json_decode($element, true);

                return \is_array($decoded) ? $decoded : $element;
            }, $request->request->all()) + $request->files->all();
    }

    /**
     * {@inheritdoc}
     */
    public function supportsDecoding(string $format): bool
    {
        return self::FORMAT === $format;
    }
}

<?php

namespace App\Serializer;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

final class UploadedFileDenormalizer implements DenormalizerInterface
{
    /**
     * {@inheritdoc}
     * @param UploadedFile $data
     */
    public function denormalize($data, string $type, string $format = null, array $context = []): UploadedFile
    {
        return $data;
    }

    /**
     * {@inheritdoc}
     * @param array<string, mixed> $context
     */
    public function supportsDenormalization($data, $type, $format = null, array $context = []): bool
    {
        return $data instanceof UploadedFile;
    }
}

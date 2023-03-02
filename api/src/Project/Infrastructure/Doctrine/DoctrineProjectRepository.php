<?php

declare(strict_types=1);

namespace App\Project\Infrastructure\Doctrine;

use App\Project\Domain\Model\Project;
use App\Project\Domain\Repository\ProjectRepositoryInterface;
use App\Project\Domain\ValueObject\ProjectId;
use App\Shared\Infrastructure\Doctrine\DoctrineRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @extends DoctrineRepository<Project>
 */
final class DoctrineProjectRepository extends DoctrineRepository implements ProjectRepositoryInterface
{
    private const ENTITY_CLASS = Project::class;
    private const ALIAS = 'project';

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct($em, self::ENTITY_CLASS, self::ALIAS);
    }

    public function save(Project $project): void
    {
        $this->em->persist($project);
        $this->em->flush();
    }

    public function remove(Project $project): void
    {
        $this->em->remove($project);
        $this->em->flush();
    }

    public function ofId(ProjectId $id): ?Project
    {
        return $this->em->find(self::ENTITY_CLASS, $id->value);
    }
}

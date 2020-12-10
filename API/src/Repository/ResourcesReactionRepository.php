<?php

namespace App\Repository;

use App\Entity\ResourcesReaction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourcesReaction|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourcesReaction|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourcesReaction[]    findAll()
 * @method ResourcesReaction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourcesReactionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourcesReaction::class);
    }

    // /**
    //  * @return ResourcesReaction[] Returns an array of ResourcesReaction objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ResourcesReaction
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

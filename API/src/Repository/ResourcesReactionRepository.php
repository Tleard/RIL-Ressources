<?php

namespace App\Repository;

use App\Entity\ResourceReaction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourceReaction|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourceReaction|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourceReaction[]    findAll()
 * @method ResourceReaction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourcesReactionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourceReaction::class);
    }

    // /**
    //  * @return ResourceReaction[] Returns an array of ResourceReaction objects
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
    public function findOneBySomeField($value): ?ResourceReaction
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

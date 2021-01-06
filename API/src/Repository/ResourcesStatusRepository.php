<?php

namespace App\Repository;

use App\Entity\ResourceStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourceStatus|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourceStatus|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourceStatus[]    findAll()
 * @method ResourceStatus[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourcesStatusRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourceStatus::class);
    }

    // /**
    //  * @return ResourceStatus[] Returns an array of ResourceStatus objects
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
    public function findOneBySomeField($value): ?ResourceStatus
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

<?php

namespace App\Repository;

use App\Entity\Warning;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Warning|null find($id, $lockMode = null, $lockVersion = null)
 * @method Warning|null findOneBy(array $criteria, array $orderBy = null)
 * @method Warning[]    findAll()
 * @method Warning[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WarningRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Warning::class);
    }

    // /**
    //  * @return Warning[] Returns an array of Warning objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Warning
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

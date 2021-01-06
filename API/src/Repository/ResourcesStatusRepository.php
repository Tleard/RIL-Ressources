<?php

namespace App\Repository;

use App\Entity\ResourceCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourceCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourceCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourceCategory[]    findAll()
 * @method ResourceCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourcesStatusRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourceCategory::class);
    }

    // /**
    //  * @return ResourceCategory[] Returns an array of ResourceCategory objects
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
    public function findOneBySomeField($value): ?ResourceCategory
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

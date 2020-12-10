<?php

namespace App\Repository;

use App\Entity\ResourcesCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourcesCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourcesCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourcesCategory[]    findAll()
 * @method ResourcesCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourcesCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourcesCategory::class);
    }

    // /**
    //  * @return ResourcesCategory[] Returns an array of ResourcesCategory objects
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
    public function findOneBySomeField($value): ?ResourcesCategory
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

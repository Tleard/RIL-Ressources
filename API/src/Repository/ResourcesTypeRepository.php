<?php

namespace App\Repository;

use App\Entity\ResourcesType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourcesType|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourcesType|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourcesType[]    findAll()
 * @method ResourcesType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourcesTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourcesType::class);
    }

    // /**
    //  * @return ResourcesType[] Returns an array of ResourcesType objects
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
    public function findOneBySomeField($value): ?ResourcesType
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

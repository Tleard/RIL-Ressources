<?php

namespace App\Repository;

use App\Entity\ResourceType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourceType|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourceType|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourceType[]    findAll()
 * @method ResourceType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourcesTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourceType::class);
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

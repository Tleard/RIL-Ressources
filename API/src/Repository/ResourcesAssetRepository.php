<?php

namespace App\Repository;

use App\Entity\ResourcesAsset;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ResourcesAsset|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResourcesAsset|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResourcesAsset[]    findAll()
 * @method ResourcesAsset[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResourcesAssetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResourcesAsset::class);
    }

    // /**
    //  * @return ResourcesAsset[] Returns an array of ResourcesAsset objects
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
    public function findOneBySomeField($value): ?ResourcesAsset
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

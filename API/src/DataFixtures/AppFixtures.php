<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory as Faker;
use App\Entity\User;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Faker::create('fr_FR');
        for($i=0 ; $i < 10; $i++)
        {
            $user = new User();
            $user
                ->setUsername($faker->userName)
                ->setFirstName($faker->firstName)
                ->setLastName($faker->lastName)
                ->setPassword('password')
                ->setEmail($faker->email)
                ->setCreatedAt($faker->dateTime)
            ;
            $manager->persist($user);
        }
        $manager->flush();
    }
}
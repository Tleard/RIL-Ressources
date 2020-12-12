<?php

namespace App\DataFixtures;

use App\Entity\Resources;
use App\Entity\ResourcesCategory;
use App\Entity\ResourcesStatus;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Factory as Faker;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    /**
     * @var Faker
     */
    private $faker;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->faker = Factory::create('fr_FR');
        $this->passwordEncoder = $passwordEncoder;
    }

    private const USERS = [
        [
            'username' => 'admin',
            'email' => 'admin@blog.com',
            'first_name' => 'Prénom',
            'last_name' => 'Nom',
            'password' => 'admin1',
            'roles' => [User::ROLE_ADMIN]
        ],
        [
            'username' => 'user',
            'email' => 'user@blog.com',
            'first_name' => 'Prénom',
            'last_name' => 'Nom',
            'password' => 'User1',
            'roles' => [User::ROLE_USER]
        ],
    ];

    private const STATUS = [
        "draft",
        "archived",
        "validated",
        "banned"
    ];

    private const CATEGORIES = [
        "lifestyle",
        "health",
        "humor",
        "spiritual",
    ];

    public function load(ObjectManager $manager)
    {
        $this->loadUsers($manager);
        $this->loadResourcesCategories($manager);
        $this->loadResourcesStatus($manager);
        $this->loadResources($manager);

    }

    public function loadResourcesCategories(ObjectManager $manager)
    {
        $i = 0;
        foreach (self::CATEGORIES as $resourcesCategories) {
            $category = new ResourcesCategory();
            $category->setName($resourcesCategories);
            $i++;
            $this->setReference("category_" . $i, $category);

            $manager->persist($category);
        }
        $manager->flush();
    }

    public function loadResourcesStatus(ObjectManager $manager)
    {
        $i = 0;
        foreach (self::STATUS as $resourcesStatus) {
            $status = new ResourcesStatus();
            $status->setName($resourcesStatus);
            $this->setReference("status_" . $i, $status);
            $i++;

            $manager->persist($status);
        }
        $manager->flush();
    }


    public function loadResources(ObjectManager $manager)
    {
        for ($i = 0; $i < 100; $i++) {
            $resource = new Resources();
            $resource->setTitle($this->faker->realText(20, 5));
            $resource->setDescription($this->faker->realText(200, 5));
            $resource->setStatus($this->getReference("status_" . rand(1, sizeof(self::STATUS) -1)));

            //Todo: Improve setCategories to have multiple categories
            $resource->setCategories($this->getReference("category_" . rand(1, sizeof(self::CATEGORIES) -1)));
            //Todo: Add Template Assets
            $manager->persist($resource);
        }
        $manager->flush();
    }

    public function loadUsers(ObjectManager $manager)
    {
        foreach (self::USERS as $userFixture) {
            $user = new User();
            $password = $this->passwordEncoder->encodePassword($user, $userFixture['password']);

            $user->setUsername($userFixture['username']);
            $user->setFirstName($userFixture['first_name']);
            $user->setLastName($userFixture['last_name']);
            $user->setEmail($userFixture['email']);
            $user->setPassword(
                $this->passwordEncoder->encodePassword($user, $password)
            );
            $user->setRoles($userFixture['roles']);
            $user->setIsBanned(false);
            $user->setCreatedAt($this->faker->dateTime());

            $this->setReference('user_' . $userFixture['username'], $user);

            $manager->persist($user);
        }
        $manager->flush();
    }

}
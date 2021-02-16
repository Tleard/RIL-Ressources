<?php

namespace App\DataFixtures;

use App\Entity\Resource;
use App\Entity\ResourceCategory;
use App\Entity\ResourceReaction;
use App\Entity\ResourceStatus;
use App\Entity\ResourceType;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Factory as Faker;
use App\Entity\User;
use Faker\Provider\Uuid;
use PhpParser\Node\Expr\New_;
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
        $this->faker = Factory::create('fr_CA');
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
        "queued",
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

    private const TYPE = [
      "text",
      "video",
      "audio",
      "image"
    ];

    private const REACTION = [
        "like",
        "care",
        "sad",
        "happy"
    ];


    public function load(ObjectManager $manager)
    {
        $this->loadUsers($manager);
        $this->loadResourcesCategories($manager);
        $this->loadResourcesReactions($manager);
        $this->loadResourcesStatus($manager);
        $this->loadResourcesType($manager);
        $this->loadResources($manager);
    }

    public function loadResourcesCategories(ObjectManager $manager)
    {
        $i = 0;
        foreach (self::CATEGORIES as $resourcesCategories) {
            $category = new ResourceCategory();
            $category->setId(Uuid::uuid());
            $category->setName($resourcesCategories);
            $category->setStatus(true);
            $i++;
            $this->setReference("category_" . $i, $category);

            $manager->persist($category);
        }
        $manager->flush();
    }

    public function loadResourcesReactions(ObjectManager $manager)
    {
        $i = 0;
        foreach (self::CATEGORIES as $resourcesReactions) {
            $reaction = new ResourceReaction();
            $reaction->setId(Uuid::uuid());
            $reaction->setReaction($resourcesReactions);
            $reaction->setCreationDate(new DateTime());
            $reaction->setUser($this->getReference("user_" . rand(1, sizeof(self::USERS) -1)));
            $i++;
            $this->setReference("reaction_" . $i, $reaction);

            $manager->persist($reaction);
        }
        $manager->flush();
    }

    public function loadResourcesType(ObjectManager $manager)
    {
        $i = 0;
        foreach (self::TYPE as $resourcesType) {
            $type = new ResourceType();
            $type->setId(Uuid::uuid());
            $type->setTypeName($resourcesType);
            $i++;
            $this->setReference("type_" . $i, $type);

            $manager->persist($type);
        }
        $manager->flush();
    }

    public function loadResourcesStatus(ObjectManager $manager)
    {
        $i = 0;
        foreach (self::STATUS as $resourcesStatus) {
            $status = new ResourceStatus();
            $status->setId(Uuid::uuid());
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
            $resource = new Resource();
            $resource->setTitle($this->faker->realText(20, 5));
            $resource->setDescription($this->faker->realText(1000, 5));
            $resource->setStatus($this->getReference("status_" . rand(1, sizeof(self::STATUS) -1)));
            //Todo: Improve setCategories to have multiple categories
            $resource->setCategories([$this->getReference("category_" . rand(1, sizeof(self::CATEGORIES) -1))]);
            $resource->setType($this->getReference("type_" . rand(1, sizeof(self::TYPE) -1)));
            $resource->addReactions($this->getReference("reaction_" . rand(1, sizeof(self::REACTION) -1)));
            $resource->setAuthor($this->getReference("user_" . rand(1, sizeof(self::USERS) -1)));
            $manager->persist($resource);
        }
        $manager->flush();
    }

    public function loadUsers(ObjectManager $manager)
    {
        $i = 0;
        foreach (self::USERS as $userFixture) {
            $user = new User();
            $password = $this->passwordEncoder->encodePassword($user, $userFixture['password']);

            $user->setId(Uuid::uuid());
            $user->setUsername($userFixture['username']);
            $user->setFirstName($userFixture['first_name']);
            $user->setLastName($userFixture['last_name']);
            $user->setEmail($userFixture['email']);
            $user->setPassword($password);
            $user->setRoles($userFixture['roles']);
            $user->setIsBanned(false);
            $user->setCreatedAt($this->faker->dateTime());

            $this->setReference('user_' . $i, $user);
            $i++;
            $manager->persist($user);
        }
        $manager->flush();
    }

}
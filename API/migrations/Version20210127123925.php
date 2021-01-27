<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210127123925 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_resource (user_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', resource_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', INDEX IDX_5C1C1016A76ED395 (user_id), INDEX IDX_5C1C101689329D25 (resource_id), PRIMARY KEY(user_id, resource_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_resource ADD CONSTRAINT FK_5C1C1016A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_resource ADD CONSTRAINT FK_5C1C101689329D25 FOREIGN KEY (resource_id) REFERENCES resources (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE resources_categories ADD status TINYINT(1) DEFAULT \'1\' NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_40381E3B5E237E06 ON resources_categories (name)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user_resource');
        $this->addSql('DROP INDEX UNIQ_40381E3B5E237E06 ON resources_categories');
        $this->addSql('ALTER TABLE resources_categories DROP status');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210124133415 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE report (id INT AUTO_INCREMENT NOT NULL, reported_user_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', report_ressource_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', report_by_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', date DATETIME NOT NULL, comment LONGTEXT DEFAULT NULL, INDEX IDX_C42F7784E7566E (reported_user_id), INDEX IDX_C42F7784F20645B3 (report_ressource_id), INDEX IDX_C42F778480FB277D (report_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F7784E7566E FOREIGN KEY (reported_user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F7784F20645B3 FOREIGN KEY (report_ressource_id) REFERENCES resources (id)');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F778480FB277D FOREIGN KEY (report_by_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE report');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220823161207 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE comment (id UUID NOT NULL, creator_id UUID NOT NULL, place_id UUID NOT NULL, content TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9474526C61220EA6 ON comment (creator_id)');
        $this->addSql('CREATE INDEX IDX_9474526CDA6A219 ON comment (place_id)');
        $this->addSql('COMMENT ON COLUMN comment.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN comment.creator_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN comment.place_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN comment.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE place (id UUID NOT NULL, creator_id UUID NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, address VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, postal_code VARCHAR(5) NOT NULL, longitude DOUBLE PRECISION DEFAULT NULL, latitude DOUBLE PRECISION DEFAULT NULL, rating DOUBLE PRECISION DEFAULT NULL, influx VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_741D53CD61220EA6 ON place (creator_id)');
        $this->addSql('COMMENT ON COLUMN place.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN place.creator_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE type (id UUID NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN type.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE type_place (type_id UUID NOT NULL, place_id UUID NOT NULL, PRIMARY KEY(type_id, place_id))');
        $this->addSql('CREATE INDEX IDX_7A11D43AC54C8C93 ON type_place (type_id)');
        $this->addSql('CREATE INDEX IDX_7A11D43ADA6A219 ON type_place (place_id)');
        $this->addSql('COMMENT ON COLUMN type_place.type_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN type_place.place_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C61220EA6 FOREIGN KEY (creator_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CDA6A219 FOREIGN KEY (place_id) REFERENCES place (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE place ADD CONSTRAINT FK_741D53CD61220EA6 FOREIGN KEY (creator_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE type_place ADD CONSTRAINT FK_7A11D43AC54C8C93 FOREIGN KEY (type_id) REFERENCES type (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE type_place ADD CONSTRAINT FK_7A11D43ADA6A219 FOREIGN KEY (place_id) REFERENCES place (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526CDA6A219');
        $this->addSql('ALTER TABLE type_place DROP CONSTRAINT FK_7A11D43ADA6A219');
        $this->addSql('ALTER TABLE type_place DROP CONSTRAINT FK_7A11D43AC54C8C93');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE place');
        $this->addSql('DROP TABLE type');
        $this->addSql('DROP TABLE type_place');
    }
}

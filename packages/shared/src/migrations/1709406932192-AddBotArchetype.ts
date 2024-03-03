import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBotArchetype1709406932192 implements MigrationInterface {
    name = 'AddBotArchetype1709406932192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD "botArchetype" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "botArchetype"`);
    }
}

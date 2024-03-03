import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTelegramApiToken1709413177050 implements MigrationInterface {
    name = 'AddTelegramApiToken1709413177050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD "telegramApiToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "telegramApiToken"`);
    }

}

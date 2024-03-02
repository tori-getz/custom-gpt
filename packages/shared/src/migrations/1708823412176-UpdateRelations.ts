import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelations1708823412176 implements MigrationInterface {
    name = 'UpdateRelations1708823412176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_eab3b0dffc53c414f906c16efdc"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "messagesId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "chatId" uuid`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "chatId"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "messagesId" uuid`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_eab3b0dffc53c414f906c16efdc" FOREIGN KEY ("messagesId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

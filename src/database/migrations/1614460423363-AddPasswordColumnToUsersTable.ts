import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from '../../models/User';

export class AddPasswordColumnToUsersTable1614460423363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "password" VARCHAR(255) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

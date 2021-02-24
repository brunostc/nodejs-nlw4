import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersSurveys1614128789318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_surveys',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid', 
                        isPrimary: true,
                    },
                    {
                        name: 'value',
						type: 'number',
                    },
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'user_id',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'survey_id',
						type: 'varchar',
						isNullable: false,
					}
                ],
				foreignKeys: [
					{
						name: 'user_id',
						columnNames: ['user_id'],
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
					},
					{
						name: 'survey_id',
						columnNames: ['survey_id'],
						referencedTableName: 'surveys',
						referencedColumnNames: ['id'],
					}
				]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users_surveys')
    }

}

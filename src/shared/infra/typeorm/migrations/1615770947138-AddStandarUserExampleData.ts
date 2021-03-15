import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddStandarUserExampleData1615770947138
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123123',
          phone: '85988776643',
          age: 29,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .execute();
  }
}

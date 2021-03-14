import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBook1615684982054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'isbn',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'editionYear',
            type: 'int',
          },
          {
            name: 'edition',
            type: 'varchar',
          },
          {
            name: 'numberPages',
            type: 'int',
          },
          {
            name: 'author',
            type: 'varchar',
          },
          {
            name: 'publishing',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsersHasBooks1615757287768
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_books_books',
        columns: [
          {
            name: 'usersId',
            type: 'uuid',
          },
          {
            name: 'booksId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'UserId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['usersId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'BookId',
            referencedTableName: 'books',
            referencedColumnNames: ['id'],
            columnNames: ['booksId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_books_books');
  }
}

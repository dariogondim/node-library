export default interface IUpdateBookDTO {
  id: string;
  isbn: string;
  title: string;
  category: string;
  edition: string;
  author: string;
  publishing: string;
  editionYear: number;
  numberPages: number;
}

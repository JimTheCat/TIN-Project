import {BookDTO} from "./BookDTO";

export type BorrowDTO = {
  borrowId: number;
  borrowDate: Date;
  dueDate: Date;
  isReturned: boolean;
  rating: number;
  userModel: null;
  bookModel: BookDTO | null;
}
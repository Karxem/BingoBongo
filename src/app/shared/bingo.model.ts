import { Word } from "./word.model";

export interface Bingo {
    isBingo: boolean;
    bingoText: string;
    bingoFields: Word[];
  }
  
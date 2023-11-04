import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/word.model';
import { WordsService } from 'src/app/words.service';
import { WinComponent } from '../win/win.component';

@Component({
  selector: 'app-bingo-grid',
  templateUrl: './bingo-grid.component.html',
  standalone: true,
  imports: [CommonModule, WinComponent]
})
export class BingoGridComponent implements OnInit {
  public bingoGrid: Word[][] = [];
  public bingoText: string = '';
  public isBingo: boolean = false;

  constructor(private wordsService: WordsService) {}

  ngOnInit(): void {
    this.wordsService.getWords().subscribe((words) => {
      this.generateBingoGrid(words);
    });
  }

  generateBingoGrid(words: Word[]): void {
    const usedWords: string[] = [];

    for (let i = 0; i < 5; i++) {
      const row: Word[] = [];
      for (let j = 0; j < 5; j++) {
        let randomWord: Word;
        do {
          randomWord = this.wordsService.getRandomWord(words);
        } while (usedWords.includes(randomWord.text)); // Check if the word is already used

        usedWords.push(randomWord.text);
        row.push({ ...randomWord, clicked: false }); // Set 'clicked' property to false initially
      }
      this.bingoGrid.push(row);
    }
  }

  toggleCell(word: Word): void {
    word.clicked = !word.clicked;

    // Check rows for bingo
    for (let i = 0; i < 5; i++) {
      if (this.bingoGrid[i].every((word) => word.clicked)) {
        this.bingoText = 'Bingo in Zeile ' + (i + 1);
        this.isBingo = true;
        return;
      }

      this.isBingo;
    }

    // Check columns for bingo
    for (let i = 0; i < 5; i++) {
      if (this.bingoGrid.every((row) => row[i].clicked)) {
        this.bingoText = 'Bingo in Spalte ' + (i + 1);
        this.isBingo = true;
        return;
      }

      this.isBingo;
    }
  }
}

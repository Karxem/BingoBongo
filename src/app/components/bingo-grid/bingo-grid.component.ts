import { Bingo } from './../../shared/bingo.model';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Word } from '../../shared/word.model';
import { WordsService } from '../../shared/words.service';
import { StorageService } from 'src/app/shared/storage.service';
import { Color } from 'src/app/shared/color.model';

@Component({
  selector: 'app-bingo-grid',
  templateUrl: './bingo-grid.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BingoGridComponent implements OnInit {
  @Input({ required: true }) color: Color = 'default';
  private key: string = 'grid';
  public bingoGrid: Word[][] = [];
  public bingoText: string = '';

  constructor(
    private wordsService: WordsService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.getItem(this.key)) {
      this.bingoGrid = this.storageService.getItem(
        'grid'
      ) as unknown as Word[][];
    } else {
      this.wordsService.getWords().subscribe((words) => {
        this.generateBingoGrid(words);

        if (this.bingoGrid && !this.storageService.getItem(this.key)) {
          this.storageService.setItem(this.key, this.bingoGrid);
        }
      });
    }

    if (!this.storageService.getItem('activeColor')) {
      this.storageService.setItem('activeColor', 'default');
    }

    this.color = this.storageService.getItem('activeColor') as Color;
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
    // Block all when there is a bingo
    if (this.checkForBingo()) {
      console.log('A: ' + this.checkForBingo());
      return;
    }

    word.clicked = !word.clicked;

    // Check rows for bingo
    for (let i = 0; i < 5; i++) {
      if (this.bingoGrid[i].every((word) => word.clicked)) {
        const bingo: Bingo = {
          isBingo: true,
          bingoText: 'Zeile ' + (i + 1),
          bingoFields: this.bingoGrid[i],
        }; 

        this.storageService.setItem('bingo', bingo)
        return;
      }

      this.storageService.setItem('grid', this.bingoGrid);
    }

    // Check columns for bingo
    for (let i = 0; i < 5; i++) {
      if (this.bingoGrid.every((row) => row[i].clicked)) {
        const bingo: Bingo = {
          isBingo: true,
          bingoText: 'Spalte ' + (i + 1),
          bingoFields: this.bingoGrid[i],
        }; 

        this.storageService.setItem('bingo', bingo)
        return;
      }

      this.storageService.setItem('grid', this.bingoGrid);
    }
  }

  public checkForBingo(): boolean {
    if (!this.storageService.getItem('bingo')) {
      return false;
    }

    const bingo = this.storageService.getItem('bingo') as unknown as Bingo;
    console.log(bingo);
    return bingo.isBingo;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from './word.model';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private wordsUrl = 'assets/words.json';

  constructor(private http: HttpClient) {}

  getWords(): Observable<Word[]> {
    return this.http.get<Word[]>(this.wordsUrl);
  }

  getRandomWord(words: Word[]): Word {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
}

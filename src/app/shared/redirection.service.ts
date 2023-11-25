import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {

  private router = inject(Router);

  public redirect(uri: string): void {
    this.router.navigate(['/' + uri]);
  }
}

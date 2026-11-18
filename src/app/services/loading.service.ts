import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly jumlah = new BehaviorSubject<number>(0);

  readonly loading$: Observable<boolean> = this.jumlah.pipe(map((n) => n > 0));

  mulai(): void {
    this.jumlah.next(this.jumlah.value + 1);
  }

  selesai(): void {
    this.jumlah.next(Math.max(0, this.jumlah.value - 1));
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error$ = new Subject<string>();

  handle(msg: string): void {
    this.error$.next(msg);
  }

  clear(): void {
    this.error$.next('');
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    this.handle(error.message);
    return throwError(() => error.message);
  }
}

import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor(private http: HttpClient) { }

  /**
   * actual upload operation to perform upload
   * @param files files to upload
   * @param concern concern is Subscriber count or Youtube channel
   */
  upload(files: File[], concern?: string): any {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    if (concern) {
      formData.append('concern', concern);
    }
    return this.http.post('http://localhost:3000/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  /**
   * For handling error
   * @param error Error response received
   */
  errorMgmt(error: HttpErrorResponse): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

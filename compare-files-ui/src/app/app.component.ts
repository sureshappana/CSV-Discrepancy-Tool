import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UploadService } from './services/upload/upload.service';

import { File } from './models/file.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('fileDropRef', { static: false })
  fileDropEl!: ElementRef;

  title = 'CSV File Discrepancy Tool';
  files: any = [];
  showFiles = false;
  showResultSection = false;
  progress = 0;
  msg = '';
  concern = undefined;
  uploadStatus = '';
  isUploadError = false;
  discrepancyList = new Array<string>();

  constructor(public uploadService: UploadService) { }

  /**
   * calls when drag and dropped files to the area
   * @param $event Event for file drag and drop
   */
  onFileDropped($event: any): void {
    const newFiles: File[] = Array.from($event);
    this.files.push(...newFiles.filter((file: File) => file.type === 'text/csv'));
    this.showFiles = true;
  }

  /**
   * calls when file is selected
   * @param $event Event for file selection
   */
  onFilesSelected($event: any): void {
    this.files = Array.from($event.target.files);
    this.showFiles = true;
  }

  /**
   * Process received files from drag and drop or file picker
   */
  processFiles(): void {

    try {
      // Calls the upload service to perform upload operation
      this.uploadService.upload(this.files, this.concern)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.uploadStatus = 'Upload request has been made!';
              console.log(this.uploadStatus);
              break;
            case HttpEventType.ResponseHeader:
              this.uploadStatus = 'Response header has been received!';
              console.log(this.uploadStatus);
              break;
            case HttpEventType.UploadProgress:
              if (event && event.loaded && event.total) {
                const { loaded, total } = event;
                this.progress = Math.round(loaded / total * 100);
                this.uploadStatus = `Uploaded! ${this.progress}%`;
                console.log(this.uploadStatus);
              }
              break;
            case HttpEventType.Response:
              this.uploadStatus = 'Files uploaded successfully!';
              console.log(this.uploadStatus);
              this.discrepancyList = event.body;
          }
        },
          (err: any) => {
            this.uploadStatus = err;
            console.log(err);
            this.isUploadError = true;
          });
    } catch (err) {
      this.isUploadError = true;
      console.log(err);
    }
  }

  /**
   * calls when delete icon clicked
   * @param deletedFile File to delete
   */
  onFileDeletedHandler(deletedFile: File): void {
    const index = this.files.indexOf(deletedFile);
    this.files.splice(index, 1);

    if (0 === this.files.length) {
      this.showFiles = false;
    }
  }

  /**
   * Calls when upload button clicked to perform upload operation
   */
  onUploadClicked(): void {
    if (this.files.length < 2) {
      alert('Minimum two valid input files are required for comparison');
      return;
    }
    this.processFiles();
    this.showResultSection = true;
  }

  /**
   * calls when reset button clicked to perform reset operation
   */
  onResetClicked(): void {
    this.files = [];
    this.showFiles = false;
    this.uploadStatus = '';
    this.discrepancyList = [];
    this.showResultSection = false;
    this.isUploadError = false;
    this.progress = 0;
  }

  onConcernChecked($event: any): void {
    this.concern = $event.value;
  }
}

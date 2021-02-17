import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { File } from '../../models/file.model';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input()
  file!: File;

  @Output()
  deletedFile: EventEmitter<File> = new EventEmitter<File>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.file);
  }

  /**
   * Utility function to convert bytes to proper readable format
   * @param bytes bytes to convert
   */
  convertBytes(bytes: number): string {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const size = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(size));
    return parseFloat((bytes / Math.pow(size, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * calls when file delete operation performed
   */
  onFileDeleted(): void {
    this.deletedFile.emit(this.file);
  }

}

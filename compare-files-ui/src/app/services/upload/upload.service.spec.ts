import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

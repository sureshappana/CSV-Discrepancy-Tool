import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileComponent } from './file.component';
import { By } from '@angular/platform-browser';
describe('FileComponent', () => {
  let component: FileComponent;
  let fixture: ComponentFixture<FileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileComponent);
    component = fixture.componentInstance;
    component.file =  {
      name: 'test name',
      size: 12345678,
      type: 'text/csv',
      lastModified: 12345,
      webkitRelativePath: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name and file size', () => {
    const debugNameElement = fixture.debugElement.query(By.css('#fileName'));
    const debugSizeElement = fixture.debugElement.query(By.css('#fileSize'));
    expect(debugNameElement.nativeElement.innerText).toEqual(component.file.name);
    expect(debugSizeElement.nativeElement.innerText).toBeDefined();
  });
});

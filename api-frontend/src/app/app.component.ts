import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  constructor(private appService: AppService) {}

  title = 'api-frontend';
  
  // enteredDirectory = this.appService.directoryModel.dirPath;
  
  enteredDirectory: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  getDirectoryListing() {
    console.log("asdf ", this.enteredDirectory)
    this.appService.getDirectoryListing(this.enteredDirectory).pipe(takeUntil(this.destroy$)).subscribe(data => {});
    this.enteredDirectory = "";    
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectoryModel } from './app-state/models';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient
              // ,public directoryModel: DirectoryModel
              ) { }

  rootURL = '/api';

  getDirectoryListing(dirPath: any){
    return this.http.post(this.rootURL + '/getDirectoryListing', dirPath)
  }

}
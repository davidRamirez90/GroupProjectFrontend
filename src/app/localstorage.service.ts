import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
const STORAGE_KEY = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  public saveToken(token) {
    this.storage.set(STORAGE_KEY, token);
  }

  public getToken(): string {
    return this.storage.get(STORAGE_KEY || '');
  }
}

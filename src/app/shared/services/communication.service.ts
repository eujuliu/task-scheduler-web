import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private source = new BehaviorSubject<unknown>(null);
  data = this.source.asObservable();

  sendUpdate<T>(data: T) {
    this.source.next(data);
  }
}

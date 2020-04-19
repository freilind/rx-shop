import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Category[]> {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges()
    .pipe(
      map(changes =>
          changes.map(c => {
              const data = c.payload.val() as Category;
              const key = c.payload.key;
              return { key, ...data };
          })
      )
    );
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any): any {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list('/products').snapshotChanges()
      .pipe(
          map(changes =>
              changes.map(c => {
                  const data = c.payload.val() as Product;
                  const key = c.payload.key;
                  return { key, ...data };
              })
          )
      );
  }

  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}

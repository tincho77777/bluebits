import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProducts = environment.apiURL + 'products';

  constructor( private http: HttpClient) { 

  }

  //metodo para traer los productos
  getProducts() : Observable <Product[]> {  //el back me devuelve un observable y le digo que es de tipo array de category
    return this.http.get<Product[]>(this.apiURLProducts);
  } 

  //metodo para traer un solo producto
  getProduct( productId: string ) : Observable <Product> {  //el back me devuelve un observable y le digo que es de tipo array de category
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);  //el apiURLCategories esta definido en environments/environment.ts
  } 

  //metodo para crear productos en el backend
  createProduct( productData: FormData ): Observable <Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  //metodo para editar productos en el backend
  updateProduct( productData: FormData, productid: string ): Observable <Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productid}` , productData)
  }

  //metodo para eliminar productos
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }

}

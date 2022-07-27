import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURLCategories = environment.apiURL + 'categories';

  constructor( private http: HttpClient) { 

  }

  //metodo para traer las categorias
  getCategories() : Observable <Category[]> {  //el back me devuelve un observable y le digo que es de tipo array de category
    return this.http.get<Category[]>(this.apiURLCategories);
  } 

  //metodo para traer una sola categoria
  getCategory( categoryId: string ) : Observable <Category> {  //el back me devuelve un observable y le digo que es de tipo array de category
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);  //el apiURLCategories esta definido en environments/environment.ts
  } 

  //metodo para crear categorias en el backend
  createCategory( category: Category ): Observable <Category> {
    return this.http.post<Category>(this.apiURLCategories, category)
  }

  //metodo para editar categorias en el backend
  updateCategory( category: Category ): Observable <Category> {
    return this.http.put<Category>(`${this.apiURLCategories}/${category.id}` , category)
  }

  //metodo para eliminar categorias
  deleteCategory( categoryId: string ): Observable <any> {
    return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`)
  }
}

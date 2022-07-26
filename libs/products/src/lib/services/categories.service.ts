import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private http: HttpClient) { 

  }

  //metodo para traer las categorias
  getCategories() : Observable <Category[]> {  //el back me devuelve un observable y le digo que es de tipo array de category
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories/');
  } 

  //metodo para traer una sola categoria
  getCategory( categoryId: string ) : Observable <Category> {  //el back me devuelve un observable y le digo que es de tipo array de category
    return this.http.get<Category>(`http://localhost:3000/api/v1/categories/${categoryId}`);
  } 

  //metodo para crear categorias en el backend
  createCategory( category: Category ): Observable <Category> {
    return this.http.post<Category>('http://localhost:3000/api/v1/categories/', category)
  }

  //metodo para editar categorias en el backend
  updateCategory( category: Category ): Observable <Category> {
    return this.http.put<Category>('http://localhost:3000/api/v1/categories/' + category.id , category)
  }

  //metodo para eliminar categorias
  deleteCategory( categoryId: string ): Observable <Object> {
    return this.http.delete<Object>(`http://localhost:3000/api/v1/categories/${categoryId}`)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})
export class OrdersService {

apiURLOrders = environment.apiURL + 'orders';

constructor( private http: HttpClient) { 

}

  //metodo para traer las ordenes
  getOrders() : Observable <Order[]> {  //el back me devuelve un observable y le digo que es de tipo array de category
    return this.http.get<Order[]>(this.apiURLOrders);
} 

  //metodo para traer una sola orden
  getOrder( orderId: string ) : Observable <Order> {  //el back me devuelve un observable y le digo que es de tipo array de category
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);  //el apiURLCategories esta definido en environments/environment.ts
} 

  //metodo para crear ordenes en el backend
createOrder( order: Order ): Observable <Order> {
    return this.http.post<Order>(this.apiURLOrders, order)
}

  //metodo para editar ordenes en el backend
updateOrder( orderStatus: {status: string}, orderId: string ): Observable <Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}` , orderStatus)
}

  //metodo para eliminar ordenes
deleteOrder( orderId: string ): Observable <any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`)
}

getOrdersCount(): Observable<number> {
  return this.http
    .get<number>(`${this.apiURLOrders}/get/count`)
    .pipe(map((objectValue: any) => objectValue.orderCount));
}

getTotalSales(): Observable<number> {
  return this.http
    .get<number>(`${this.apiURLOrders}/get/totalsales`)
    .pipe(map((objectValue: any) => objectValue.totalsales));
}
}
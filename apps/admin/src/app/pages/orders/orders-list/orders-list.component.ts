import { Component, OnInit } from '@angular/core';
import { Order } from '@bluebits/orders';
import { OrdersService } from '../../../../../../../libs/orders/src/lib/services/orders.service';
import { Router } from '@angular/router';
import { ORDER_STATUS } from '../orders.constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor( 
    private ordersService: OrdersService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }
    

  ngOnInit(): void {
    this._getOrders();
  }


_getOrders() {
  this.ordersService.getOrders().subscribe( (orders) => {
    this.orders = orders;
  })
}

showOrder( orderId ){
  this.router.navigateByUrl(`orders/${orderId}`)
}

// deleteOrder(orderId: string){
//     this.confirmationService.confirm({
//       message: 'Do you want to Delete this Order?',
//       header: 'Delete Order',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         this.ordersService.deleteOrder(orderId).subscribe(
//           () => {
//             this._getOrders();
//             this.messageService.add({
//               severity: 'success',
//               summary: 'Success',
//               detail: 'Order is deleted!'
//             });
//           },
//           () => {
//             this.messageService.add({
//               severity: 'error',
//               summary: 'Error',
//               detail: 'Order is not deleted!'
//             });
//           }
//         );
//       }
//     });
//   }

  deleteOrder( orderId: string ) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.ordersService.deleteOrder(orderId).subscribe({
            next: () => this.messageService.add({ //mensaje de categoria eliminada
              severity: 'success', 
              summary: 'Success', 
              detail:'Order is deleted!'}
              ),
            error: () => this.messageService.add({  //mensaje de error
                severity:'error', 
                summary: 'Error', 
                detail:'Order is not deleted!'})
          })
      },
      reject: (type) => {
      } //si elijo el rejec no hago nada
  });
  }
  
}



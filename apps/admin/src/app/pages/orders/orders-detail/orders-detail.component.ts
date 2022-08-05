import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../../../../libs/orders/src/lib/services/orders.service';
import { Order } from '../../../../../../../libs/orders/src/lib/models/order';
import { ActivatedRoute } from '@angular/router';
import { ORDER_STATUS } from '../orders.constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {

  order: Order;
  orderStatuses = [];
  selectedStatus: any;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus(){
    this.orderStatuses = Object.keys(ORDER_STATUS).map( key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  };

  private _getOrder(){
    this.route.params.subscribe( params => {
      if(params.id){
        this.orderService.getOrder(params.id).subscribe( order => {
          this.order = order;
          this.selectedStatus = order.status;
        })
      }
    })
  };

  onStatusChange(event){
    this.orderService.updateOrder({ status: event.value}, this.order.id).subscribe( order => {
      this.messageService.add({  //mensaje de categoria creada
        severity: 'success',
        summary: 'Success',
        detail: `Order is updated!`
    });
    }, () => {
      this.messageService.add({  //mensaje de error
        severity: 'error',
        summary: 'Error',
        detail: 'Order is not updated!'
      });
    })
  }

}

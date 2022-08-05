import { OrderItem } from "./order-item";
import { User } from '../../../../users/src/lib/models/user';

export class Order {  //esto es lo mismo que una interface
    id?: string;
    orderItems?: OrderItem;
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: User;
    dateOrdered?: string;
}
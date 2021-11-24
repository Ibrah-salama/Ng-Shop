import { OrderItem } from './order-item';
import { User } from '@blubits/users';
export interface Order {
  id?: string;
  user?: User;
  phone?: string;
  orderItems?: OrderItem[];
  country?: string;
  city?: string;
  zip?: string;
  shippingAddress1?: string;
  shippingAddress2?: string;
  status?: string;
  totalPrice?: number;
  dateOrdered?: string;
}

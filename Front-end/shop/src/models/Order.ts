export interface Order {
    id: number;
    price: number;
    amount: number;
    user: number;
    product: number;
    shipping_address: number;
    }
  
  
    export interface OrderState {
      single_order: Order;
      orders: Order[];
      orders_user: Order[]
      saveAddress: number
      saveTotal: number
    };
import {observable} from "mobx";

export class OrderState {
  @observable orders: Order[] = [];
  constructor(orders: Order[]) {
    this.orders = orders;
  }
}
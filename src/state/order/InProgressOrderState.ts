import {action, computed, observable} from "mobx";

export class InProgressOrderState {
  @observable accessor order: Order;
  constructor(order: Order) {
    this.order = order;
  }

  @computed
  get getOrder() {
    return this.order;
  }

  @action
  setOrder(order: Order) {
    this.order = order;
  }
}
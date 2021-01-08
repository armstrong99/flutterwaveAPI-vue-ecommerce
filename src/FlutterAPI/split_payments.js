class SPLIT_PAYMENT {
  constructor(
    price,
    split_ratio_seller = 1950 / 2000,
    split_ratio_deliveryFee = 150 / 2000,
    split_ratio_dispatcher = 120 / 150
  ) {
    this.price_amt = price;
    this.seller_ratio = split_ratio_seller;
    this.devlivery_ratio = split_ratio_deliveryFee;
    this.dispatch_ratio = split_ratio_dispatcher;
  }

  get get_dispatcher() {
    return this.dispatcher();
  }
  get get_seller() {
    return this.seller();
  }
  get get_delivery() {
    return this.delivery();
  }

  dispatcher() {
    return this.delivery() * this.dispatch_ratio;
  }

  seller() {
    return this.price_amt * this.seller_ratio;
  }

  delivery() {
    return this.price_amt * this.devlivery_ratio;
  }
}

export default SPLIT_PAYMENT;

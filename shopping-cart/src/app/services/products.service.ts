import { Injectable } from '@angular/core';
import { Product } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly products: Product[] = [
    {
      id: 1,
      name: 'Gaming Mouse',
      price: 29.99,
    },
    {
      id: 2,
      name: 'Harry Potter 3',
      price: 9.99,
    },
    {
      id: 3,
      name: 'Used plastic bottle',
      price: 0.99,
    },
    {
      id: 4,
      name: 'Half-dried plant',
      price: 2.99,
    }
  ];

  inCartProducts: Product[] = [];

  constructor() { }

  fetchProducts(): Product[] {
    return this.products;
  }

  fetchProductsInCart(): Product[] {
    return this.products;
  }

  addToProductsCart(product: Product): Product[] {
    const index = this.inCartProducts.findIndex(prod => prod.id === product.id);

    if (index === -1) {
      product.quantity = 1;
      this.inCartProducts.push(product);
    }else {
      this.inCartProducts[index].quantity +=  1;
    }
    return this.inCartProducts;
  }

  removeToProductsCart(product: Product): Product[] {
    if(product.quantity === 1) {
      this.inCartProducts = this.inCartProducts.filter(prod => prod.id !== product.id);
    }else {
      const index = this.inCartProducts.findIndex(prod => prod.id === product.id);
      this.inCartProducts[index].quantity -=  1;
    }
    return this.inCartProducts;
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private productService: ProductsService) {
  }

  isProductsTab = true;
  showStockFlag = false;

  allProducts: Product[] = [];
  inCartProducts: Product[] = [];
  productList: Product[] = [];

  ngOnInit() {
    this.allProducts = this.productService.fetchProducts();
    this.productList = this.allProducts;
  }

  onAddToCart(product: Product) {
    this.inCartProducts = this.productService.addToProductsCart(product);
  }

  onRemoveFromCart(product: Product) {
    this.inCartProducts = this.productService.removeToProductsCart(product);
    this.productList = this.inCartProducts;
  }

  onTabChange(tab: string) {
    this.isProductsTab = tab === 'products';

    if(this.isProductsTab) {
      this.productList = this.allProducts;
    }else {
      this.productList = this.inCartProducts;
    }
  }

  get cartProductCount() {
    return this.inCartProducts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );  
  }
}


export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  quantity?: number;
  inStock?: boolean;
}
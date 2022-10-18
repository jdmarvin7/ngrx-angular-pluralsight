import {
  getShowProductCode,
  getCurrentProduct,
  getProducts,
  getProductError,
} from './../state/product.reducer'
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import * as ProductActions from '../state/product.action'

// import { Subscription, Observable } from 'rxjs';

import { Product } from '../product'
import { ProductService } from '../product.service'
import { State } from '../state/product.reducer'
import { Observable } from 'rxjs'

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products'

  // displayCode: boolean

  products$: Observable<Product[]>

  // // Used to highlight the selected product in the list
  // selectedProduct: Product | null
  selectedProduct$: Observable<Product>
  displayCode$: Observable<boolean>
  errorMessage$: Observable<string>
  // sub: Subscription;

  constructor(
    // private productService: ProductService,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });
    this.selectedProduct$ = this.store.select(getCurrentProduct)

    this.products$ = this.store.select(getProducts)

    this.store.dispatch(ProductActions.loadProduct())

    this.errorMessage$ = this.store.select(getProductError)

    // this.store.select('products').subscribe(
    //   (products) => {
    //     if(products) {
    //       this.displayCode = products.showProductCode
    //     }
    //   }
    // )
    // this.store.select('products').subscribe(
    //   products => this.displayCode = products.showProductCode
    // )

    // this.store
    //   .select(getShowProductCode)
    //   .subscribe((showDisplayCode) => (this.displayCode = showDisplayCode))

    this.displayCode$ = this.store.select(getShowProductCode)
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    // this.store.dispatch({
    //   type: '[Product] Toggle Product Code'
    // });
    this.store.dispatch(ProductActions.toggleProductCode())
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct())
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }))
  }
}

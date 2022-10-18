import { ProductService } from './../product.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductActions from './product.action'
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

  constructor(
    private action$: Actions,
    private productService: ProductService
  ) {}

  loadProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProductActions.loadProduct),
      mergeMap(() => this.productService.getProducts().pipe(
        map(products => ProductActions.loadProductSucess({ products })),
        catchError((err: any) => {
          return of(ProductActions.loadProductFail({ error: err }));
        })
      ))
    )
  });

  updateProdutc$ = createEffect(() => {
    return this.action$
      .pipe(
        ofType(ProductActions.updateProduct),
        concatMap((action: any) => {
          return this.productService.updateProduct(action.product)
            .pipe(
              map(product => ProductActions.updateProductSucess ({ product })),
              catchError(error => of(ProductActions.updateProductFailure({ error })))
            )
        })
      )
  })
}

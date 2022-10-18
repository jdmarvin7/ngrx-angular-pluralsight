import { Product } from './../product';
import { createAction, props } from '@ngrx/store';

export const toggleProductCode = createAction(
  "[Product] Toggle Product code",
)

export const setCurrentProduct = createAction(
  "[Product] Set Current Product",
  props<{ currentProductId: number }>()
)

export const clearCurrentProduct = createAction(
  "[Product] Clear Current Product"
)

export const initializeCurrentProduct = createAction(
  "[Product] Initialize Current Product"
);

export const loadProduct = createAction(
  "[Product] Load"
)

export const loadProductSucess = createAction(
  "[Product] Load Sucess",
  props<{ products: Product[] }>()
)

export const loadProductFail = createAction(
  "[Product] Load Fail",
  props<{ error: string }>()
)

export const updateProduct = createAction(
  "[Product] Upate Product",
  props<{ product: Product }>()
)

export const updateProductSucess = createAction(
  "[Product] Upate Product sucess",
  props<{ product: Product }>()
)

export const updateProductFailure = createAction(
  "[Product] Upate Product failure",
  props<{ error: string }>()
)

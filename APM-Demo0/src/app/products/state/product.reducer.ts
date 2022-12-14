import { Product } from './../product';
import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state'
import * as ProductActions from './product.action';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  currentProductId: null,
  products: [],
  showProductCode: true,
  error: ''
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
)

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
)

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
)

export const getProducts = createSelector(
  getProductFeatureState,
  prevState => prevState.products

)
export const getProductError = createSelector(
  getProductFeatureState,
  state => state.error
)

export const productReducer = createReducer<ProductState>(
  initialState,
  on(/*createAction('[Product] Toggle Product Code')*/ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId
    }
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0
    }
  }),
  on(ProductActions.loadProductSucess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),
  on(ProductActions.loadProductFail, (state, actions): ProductState => {
    return {
      ...state,
      products: [],
      error: actions.error
    }
  }),
  on(ProductActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(ProductActions.updateProductSucess, (state, action): ProductState => {
    const updatedProducts = state.products.map(
      item => action.product.id === item.id ? action.product : item
    )
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: ''
    }
  })
);


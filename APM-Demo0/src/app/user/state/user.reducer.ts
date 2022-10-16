import { createAction, createReducer, on } from '@ngrx/store';

export const usersReducer = createReducer(
  { maskUserName: true },
  on(createAction('[USERS] Toggle save password'), (state: any) => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    }
  })
)

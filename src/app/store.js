import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { AuthenticationApi } from 'services/Authentication'
import { OrderApi } from 'services/OrderServices'
import { ProductCategoryApi } from 'services/ProductCategories'
import { ProductApi } from 'services/ProductServices'

export const store = configureStore({
  reducer: {
    [ProductCategoryApi.reducerPath] : ProductCategoryApi.reducer,
    [ProductApi.reducerPath] : ProductApi.reducer,
    [AuthenticationApi.reducerPath] : AuthenticationApi.reducer,
    [OrderApi.reducerPath] : OrderApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductCategoryApi.middleware, ProductApi.middleware, AuthenticationApi.middleware, OrderApi.middleware),

})

setupListeners(store.dispatch)


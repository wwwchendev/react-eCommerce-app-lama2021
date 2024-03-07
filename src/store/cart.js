import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      const { _id, selectedOption } = action.payload
      const existingProduct = state.products.find(
        p =>
          p._id === _id &&
          p.selectedOption.style === selectedOption.style &&
          p.selectedOption.size === selectedOption.size,
      )
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity
        state.total += action.payload.price * action.payload.quantity
      } else {
        state.quantity += 1
        state.products.push(action.payload)
        state.total += action.payload.price * action.payload.quantity
      }
      console.log(action.payload)
    },
  },
})

export const { addProduct } = cartSlice.actions
export default cartSlice.reducer

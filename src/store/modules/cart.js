import { setToken as _setToken, getToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const cartStore = createSlice({
  name: "cart",

  initialState: {
    carts: [],
  },
  reducers: {
    addCarts: (state, action) => {
      state.carts = action.payload;
    },
  },
});

const { addCarts } = cartStore.actions;
export { addCarts };

const fetchCarts = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/carts/${id}`);
    const result = await response.json();
    dispatch(addCarts(result.data));
  };
};
export { fetchCarts };

const cartReducer = cartStore.reducer;
export default cartReducer;

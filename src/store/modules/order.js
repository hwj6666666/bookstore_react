import { setToken as _setToken, getToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const orderStore = createSlice({
  name: "order",

  initialState: {
    orders: [],
  },
  reducers: {
    addOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

const { addOrders } = orderStore.actions;
export { addOrders };

const fetchOrders = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/orders/${id}`);
    const result = await response.json();
    dispatch(addOrders(result.data));
  };
};

const fetchAllOrders = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/orders`);
    const result = await response.json();
    dispatch(addOrders(result.data));
  };
};
export { fetchOrders, fetchAllOrders };

const orderReducer = orderStore.reducer;
export default orderReducer;

//组合redux子模块 + 导出store实例

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import bookReducer from "./modules/book";
import cartReducer from "./modules/cart";
import orderReducer from "./modules/order";

export default configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

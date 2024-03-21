//组合redux子模块 + 导出store实例

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import bookReducer from "./modules/book";

export default configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
  },
});

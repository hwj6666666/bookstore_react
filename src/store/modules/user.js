//和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";
import { getProfileAPI,loginAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",

  //数据状态
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },

  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //localStorage持久化
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

//解构出actionCreater
const { setToken, setUserInfo } = userStore.actions;

//获取reducer函数
const userReducer = userStore.reducer;

//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    //1. 发送异步请求
    // const res = await request.post("/authorizations", loginForm);
    const res = await loginAPI(loginForm)

    //2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token));
  };
};

//获取个人用户信息异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    // const res = await request.get("/user/profile");
    const res=await getProfileAPI()

    dispatch(setUserInfo(res.data));
  };
};

export { fetchUserInfo, fetchLogin, setToken };

export default userReducer;

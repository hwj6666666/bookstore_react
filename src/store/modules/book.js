import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";
import { getProfileAPI, loginAPI } from "@/apis/user";

const bookStore = createSlice({
  name: "book",

  initialState: {
    // token: getToken() || "",
    // userInfo: {},
    book: [
      {
        id: 1,
        name: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        price: 100,
        ISBN: "9781408855652",
        remaining: 10,
        picture: "/hp1.jpg",
      },
      {
        id: 2,
        name: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
        price: 100,
        ISBN: "9781408855669",
        remaining: 10,
        picture: "/hp2.jpg",
      },
      {
        id: 3,
        name: "Harry Potter and the Prisoner of Azkaban",
        author: "J.K. Rowling",
        price: 100,
        ISBN: "9781408855676",
        remaining: 10,
        picture: "/hp3.jpg",
      },
      {
        id: 4,
        name: "Harry Potter and the Order of the Phoenix",
        author: "J.K. Rowling",
        price: 100,
        ISBN: "9781408855690",
        remaining: 10,
        picture: "/hp4.jpg",
      },
      {
        id: 5,
        name: "Harry Potter and the Goblet of Fire",
        author: "J.K. Rowling",
        price: 100,
        ISBN: "9781408855683",
        remaining: 10,
        picture: "/hp5.jpg",
      },
      {
        id: 6,
        name: "Harry Potter and the Half-Blood Prince",
        author: "J.K. Rowling",
        price: 100,
        ISBN: "9781408855706",
        remaining: 10,
        picture: "/hp6.jpg",
      },
      {
        id: 7,
        name: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        price: 100,
        ISBN: "9781408855713",
        remaining: 10,
        picture: "/hp7.jpg",
      },
      {
        id: 8,
        name: "The Tales of Beedle the Bard: A Harry Potter Hogwarts Library Book",
        author: "J.K. Rowling",
        price: 100,
        ISBN: "9781408880716",
        remaining: 10,
        picture: "/hp8.jpg",
      },
    ],
  },

  //   //同步修改方法
  reducers: {
    //     setToken(state, action) {
    //       state.token = action.payload;
    //       //localStorage持久化
    //       _setToken(action.payload);
    //     },
    //     setUserInfo(state, action) {
    //       state.userInfo = action.payload;
    //     },
  },
});

// const { setToken, setUserInfo } = userStore.actions;

const bookReducer = bookStore.reducer;

// const fetchLogin = (loginForm) => {
//   return async (dispatch) => {
//     const res = await loginAPI(loginForm);

//     dispatch(setToken(res.data.token));
//   };
// };

// const fetchUserInfo = () => {
//   return async (dispatch) => {
//     const res = await getProfileAPI();

//     dispatch(setUserInfo(res.data));
//   };
// };

// export { fetchUserInfo, fetchLogin, setToken };

export default bookReducer;

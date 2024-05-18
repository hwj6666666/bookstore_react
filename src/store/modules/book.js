import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";
import { getProfileAPI, loginAPI } from "@/apis/user";
import axios from "axios";

const bookStore = createSlice({
  name: "book",

  initialState: {
    books: [],
  },
  reducers: {
    addBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

const { addBooks } = bookStore.actions;
export { addBooks };


const fetchBooks = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:8080/books");
    const result = await response.json();
    console.log("hello you");
    console.log(result.data);
    dispatch(addBooks(result.data));
  };
};
export { fetchBooks };

const bookReducer = bookStore.reducer;
export default bookReducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatas, getUserAuth } from "../api/firebase";

// const auth = getUserAuth();
const diarySlice = createSlice({
  name: "diary",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
  reducers: {
    authObject: (state, action) => {
      console.assert(state);
    },
  },
  extraReducers: (builder) => {
    // 비동기작업은 actionCreator 를 자동으로 만들어주지 못한다.
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "compelete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "fail";
      });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log("FETCH Error: ", error);
    }
  }
);

const authObject = createAsyncThunk("items/fetchAllItems", async (auth) => {
  try {
    const resultData = await getUserAuth();
    return resultData;
  } catch (error) {
    console.log("FETCH Error:", error);
  }
});

console.log(authObject);

export default diarySlice;
export { fetchItems, authObject };

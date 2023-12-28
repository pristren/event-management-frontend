import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  date: [],
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    dateAction: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { toggleSidebar, dateAction } = layoutSlice.actions;

export default layoutSlice.reducer;

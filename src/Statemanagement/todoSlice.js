import { createSlice } from "@reduxjs/toolkit";
const initialState = []
const todoSlice = createSlice({
  name: "todoitem",
  initialState,
  reducers: {
    addtodo: (state, action) => {
      state.push(action.payload);
    },
    toggletodo: (state, action) => {
      const todos = state.find((todos) => todos.id === action.payload);
      if (todos) {
        todos.completed = !todos.completed;
      }
    },
    deletetodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {addtodo, toggletodo, deletetodo} = todoSlice.actions;
export default todoSlice.reducer;

"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks: (state, action) => {
      const { tasks } = action.payload;
      state.tasks = tasks;
    },
  },
});

export const { setTasks } = TasksSlice.actions;
export default TasksSlice.reducer;
export const useCurrentTasks = (state) => state.tasks.tasks;

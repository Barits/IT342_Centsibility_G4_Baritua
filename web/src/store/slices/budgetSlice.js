import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budgets: [],
  currentBudget: null,
  loading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    setBudgets: (state, action) => {
      state.budgets = action.payload;
    },
    setCurrentBudget: (state, action) => {
      state.currentBudget = action.payload;
    },
    addBudget: (state, action) => {
      state.budgets.unshift(action.payload);
    },
    updateBudget: (state, action) => {
      const index = state.budgets.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
    },
    removeBudget: (state, action) => {
      state.budgets = state.budgets.filter(b => b.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setBudgets,
  setCurrentBudget,
  addBudget,
  updateBudget,
  removeBudget,
  setLoading,
  setError,
} = budgetSlice.actions;

export default budgetSlice.reducer;

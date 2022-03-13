import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const ROLES = [
  {
    label: 'Artist',
    value: 'artist',
    icon: '/icons/artist.svg',
  },
  {
    label: 'business',
    value: 'business',
    icon: '/icons/business.svg',
  },
  {
    label: 'investor',
    value: 'investor',
    icon: '/icons/investor.svg',
  },
];

const initialState = {
  currentRole: ROLES[2],
  roles: ROLES
};

const slice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    changeRole(state, action) {
      state.currentRole = action.payload;
    },
    addRoleData(state, action) {
      state.roles.push(action.payload)
    },
    resetRoleData(state) {
      state.currentRole = ROLES[2]
      state.roles = ROLES
    }
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  changeRole,
  addRoleData,
  resetRoleData
} = slice.actions;
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

const initialState = {
    isLoading: false,
    error: null,
    users:[],
    allArtists:[],
    artists: [],
    business: [],
};

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },
  
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    
        // GET USERS
        getUsersSuccess(state, action) {
            state.isLoading = false;
            state.users = action.payload;
        },

        getArtistSuccess(state, action) {
            state.isLoading = false;
            state.artists = action.payload;
            state.allArtists = action.payload;
        },

        changeArtistSuccess(state, action) {
            state.artists = action.payload
        },

        getBusinessSuccess(state, action) {
            state.isLoading = false;
            state.business = action.payload;
        },

        createUsersSuccess(state, action) {
            state.isLoading = false;
            const createUser = action.payload
            state.users = [...state.users, createUser];
            console.log(state.users)
        },

        deleteUserSuccess(state, action) {
            const uid = action.payload;
            const deleteUser = state.users.filter((user) => user._id !== uid);
            state.users = deleteUser;
        }
    },
  });

  // Actions
export const {
    getUsersSuccess,
    deleteUserSuccess,
    createUsersSuccess,
    getArtistSuccess,
    getBusinessSuccess,
    changeArtistSuccess
} = slice.actions;

// Reducer
export default slice.reducer;

export function getUsers(uid) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axios.get('/api/users', {
                params: {
                    uid: uid
                }
            });
            dispatch(slice.actions.getUsersSuccess(response.data.users));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function updateUser(uid, adminId, data) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            await axios.post('/api/users/update', {
                uid,
                data
            }).then((data) => {
                console.log(data)
                dispatch(getUsers(adminId))
            })
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

export function createUser(data) {
    return async () => {
        try {
            const response = await axios.post('/api/users/create', {
                data
            })

            dispatch(slice.actions.createUsersSuccess(response.data.user))

        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

export async function deleteUser(uid) {
    try {
        await axios.get('/api/users/delete', {
            params: {
                uid: uid
            }
        }).then(() => {
            dispatch(slice.actions.deleteUserSuccess(uid))
        })
    } catch (error) {
        dispatch(slice.actions.hasError(error));
    }
}

export function getAccountsByRole(tableName) {
    return async () => {
        try {
            const response = await axios.get('/api/users/getAccountsByRole', {
                params: {
                    tableName: tableName
                }
            });
            if(tableName === "artist") {
                console.log("artist")
                dispatch(slice.actions.getArtistSuccess(response.data.accounts))
            }else if(tableName === "business") {
                dispatch(slice.actions.getBusinessSuccess(response.data.accounts))
            }
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    }
}

export function changeArtist(artists) {
    return async () => {
        try {
            dispatch(slice.actions.changeArtistSuccess(artists))
        }catch(error) {
            dispatch(slice.actions.hasError(error))
        }
    }
}
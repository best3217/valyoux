import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SETROLE: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);


const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  setRole: () => Promise.resolve()
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          let uid = localStorage.getItem('uid');

          const response = await axios.get('/api/account/my-account', {
            params: {
              uid: uid
            }
          });
          
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/account/login', {
      email,
      password,
    });
    if(response.data.status === 'error') {
      return response.data.message.substring(6)
    }else {
      console.log('success')
      const { accessToken, user } = response.data;
      localStorage.setItem('uid', user._id)
      setSession(accessToken);
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
      return
    }
  };

  const setRole = async (user) => {
    dispatch({
      type: 'SETROLE',
      payload: {
        user,
      }
    });
  };

  const register = async (email, password, firstName, lastName, phoneNumber, birthDay, country, avatar) => {
    const result = axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      birthDay,
      country,
      avatar
    }).then(res => res.data).catch(error => {
      console.log(error)
      return error
    })

    return result;

    // console.log(accessToken);

    // window.localStorage.setItem('accessToken', accessToken);
    // dispatch({
    //   type: 'REGISTER',
    //   payload: {
    //     user,
    //   },
    // });
  };

  const logout = async () => {
    setSession(null);
    localStorage.removeItem('uid')
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        setRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
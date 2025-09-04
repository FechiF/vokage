import { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext();
const initialState = {
  user: null,
  levels: [],
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
      };

    case 'loadLevels':
      return {
        ...state,
        levels: action.payload,
      };

    case 'loadUserLevel':
      return {
        ...state,
        user: { ...state.user, level: action.payload },
        status: 'active',
      };

    case 'logout':
      return initialState;

    default:
      throw new Error('Action unknown');
  }
}

function AuthProvider({ children }) {
  const [{ user, levels, status }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(
    function () {
      if (status === 'loading') {
        fetch(`https://vokage-api.vercel.app/levels`)
          .then((res) => res.json())
          .then((data) => {
            const storedLevel = localStorage.getItem('vokage-level');
            if (storedLevel)
              dispatch({
                type: 'loadUserLevel',
                payload: JSON.parse(storedLevel),
              });

            dispatch({ type: 'loadLevels', payload: data });
          });
      }
    },
    [status]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        levels,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };

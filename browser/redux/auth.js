import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

/* ------------   ACTION CREATORS     ------------------ */
const setUser = user => ({ type: SET_CURRENT_USER, user });
const removeUser = () => ({ type: REMOVE_CURRENT_USER });

/* ------------       REDUCER     ------------------ */
export default function reducer(currentUser = {}, action) {

  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user;

    case REMOVE_CURRENT_USER:
      return null;

    default:
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */
export const login = ({ email, password }) => {
  console.log('Login working');
  return function(dispatch) {
    axios.post('/auth/login', { email, password })
    .then(res => dispatch(setUser(res.data)))
    .catch(err => console.error('Login unsuccessful', err));
  };
};

export const signup = ({ email, password }) => {
  console.log('Signup working');
  return function(dispatch) {
    axios.post('/auth/signup', { email, password })
    .then(res => dispatch(setUser(res.data)))
    .catch(err => console.error('Signup unsuccessful', err));
  };
};

export const logout = () => {
  console.log('Logout working');
  return function(dispatch) {
    dispatch(removeUser());
    axios.get('/auth/logout')
    .catch(err => console.error('Logout unsuccessful', err));
  };
};

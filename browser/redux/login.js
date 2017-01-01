import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */
const SET_CURRENT_USER = 'SET_CURRENT_USER';

/* ------------   ACTION CREATORS     ------------------ */
const setUser = user => ({ type: SET_CURRENT_USER, user });

/* ------------       REDUCER     ------------------ */
export default function reducer(currentUser = {}, action) {

  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user;

    default:
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */
export const login = ({ email, password }) => {
  console.log('Login working');
  return function(dispatch) {
    axios.post('/auth/login', { email, password })
    .then(res => res.data)
    .then(user => dispatch(setUser(user)));
  };
};

export const USER = 'USER'

export const setUser = (user) =>({
  type:USER,
  payload:user
})

const initialState = {
  user: '1', //default
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER:{
      return{
        ...state,
        user:state.user
      }
    }
    default:
      return state;
  }
};

export default user;
export const USER = 'USER'

export const setUser = (email) =>{return {//action creater
  type:USER
}}

const initialState = {
  user: '1', //default
}

const user = (state = initialState, action) => {//reducer
  if(state === undefined){
    state = initialState;
    console.log("undefined!!")
  }
  switch(action.type){
    case USER:
      return{
        ...state,
        user:"igreen"
      }
    default:
      return state
  }
  console.log("action.user user.js",action.user)
};

export default user;
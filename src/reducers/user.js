import setUser from './action'

const initialState = {
  user: '1', //default
}

const user = (state = initialState, action) => {//reducer
  if(state === undefined){
    state = initialState;
    console.log("undefined!!")
  }
  console.log("action.user",action.user)
   return{
        ...state,
        user:action.user
      }
  // switch (action.type) {
  //   case USER:{
  //     return{
  //       ...state,
  //       user:action.user
  //     }
  //   }
  //   default:
  //     return state;
  // }
};

export default user;
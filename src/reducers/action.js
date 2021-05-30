export const USER = 'USER'


const setUser = (user) =>({//action creater
  type:USER,
  user:user
})

export default setUser;
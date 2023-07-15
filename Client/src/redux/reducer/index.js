import reducerUser from './userSlice';
import reducerMovie from './movieSlice'
const rootReducer = {
  user : reducerUser,
  movie: reducerMovie
}

export default rootReducer;
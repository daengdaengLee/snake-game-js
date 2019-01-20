import createStore from "../redux.js";
import gamesReducer from "./modules/games.js";

const store = createStore(gamesReducer);

export default store;

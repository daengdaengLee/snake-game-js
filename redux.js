const createStore = (reducer, initState) => {
  let state = initState || reducer(undefined, {});
  const subscribers = [];

  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    subscribers.forEach(subscriber => subscriber());
    return action;
  };
  const subscribe = subscriber => subscribers.push(subscriber);

  return {
    getState,
    dispatch,
    subscribe
  };
};

export default createStore;

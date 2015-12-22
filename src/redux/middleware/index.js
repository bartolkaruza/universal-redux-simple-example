function thunkMiddleware() {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (action instanceof Function) {
        action(dispatch, getState);
      } else {
        next(action);
      }
    };
  };
}


export default {
  thunk: thunkMiddleware
};

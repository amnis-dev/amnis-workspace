import { configureStore } from '@reduxjs/toolkit';
import { stateSet } from '@amnis/state';
import { apiSet } from '@amnis/api/react';

export const store = configureStore({
  reducer: {
    ...stateSet.reducers,
    ...apiSet.reducers,
  },
  middleware: (gDM) => gDM().concat([
    ...stateSet.middleware,
    ...apiSet.middleware,
  ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

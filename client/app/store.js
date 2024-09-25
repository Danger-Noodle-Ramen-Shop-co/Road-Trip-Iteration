import { configureStore } from '@reduxjs/toolkit';
import genSettingsReducer from '../features/genSettings/genSettingsSlice';
import api from '../features/genSettings/apiSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, //adds reducer for rtk querry
    genSettings: genSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // this adds the RTK query middleware that helps us handle cached data and that repeat calls for the same fetch can be served from the cacher rather than the api
});                                                // and that repeat calls for the same fetch can be served from the cacher rather than the api

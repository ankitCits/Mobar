import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer from '../reducers'
const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }),
});


export default store

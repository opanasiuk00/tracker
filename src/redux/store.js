import { configureStore } from '@reduxjs/toolkit';
import tracker from './tracker/slice';


export const store = configureStore({
    reducer: {
        tracker,
    },
});


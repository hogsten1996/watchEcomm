import { configureStore } from "@reduxjs/toolkit";
// import { api } from "./redux/api/api";


const store = configureStore({
    reducer: {
        // [api.reducerPath]: api.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(api.middleware),
});

export default store;

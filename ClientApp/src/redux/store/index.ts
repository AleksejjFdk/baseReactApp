import { configureStore } from '@reduxjs/toolkit'
import { exampleReducers } from "./exampleSlice/exampleSlice"

export const store = configureStore({
    reducer: {
        example: exampleReducers,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
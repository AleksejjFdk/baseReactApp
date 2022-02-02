import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../index"

interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const selectCount = (state: RootState) => state.example.value

export const exampleReducers = counterSlice.reducer
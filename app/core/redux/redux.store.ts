import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "./redux.model";

const INIT_STATE: StateType = {
    init: 0,
    message: [
        { message: "Hello", origin: "other" },
        { message: "Hello", origin: "me" },
        { message: "How are you?", origin: "other" },
        { message: "Very mad", origin: "me" },
        { message: "Very bad*", origin: "me" },
    ],
}

const stock = createSlice({
    name: "stock",
    initialState: INIT_STATE,
    reducers: {
        addMessage(state, action) {
            state.message.push(action.payload)
        }
    },
})

export const { addMessage } = stock.actions
export const stockReducer = stock.reducer

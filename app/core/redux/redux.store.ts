import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateType } from "./redux.model";
import { Contact } from "../model/contact";
import { dbGetContacts, dbGetGroups, dbGetLogin, dbGetMessages } from "../config/database";
import { Group } from "../model/group";
import { Message } from "../model/message";

// Init
const INIT_STATE: StateType = {
    me: { id: 0, name: "" },
    contacts: [],
    groups: [],
    messages: []
}

// Stock
const stock = createSlice({
    name: "stock",
    initialState: INIT_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getGroups.fulfilled, (state, action) => {
            state.groups = action.payload
        }),
            builder.addCase(getMe.fulfilled, (state, action) => {
                state.me = action.payload
            }),
            builder.addCase(getContacts.fulfilled, (state, action) => {
                state.contacts = action.payload
            }),
            builder.addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload
            })
    }
})

export const getMe = createAsyncThunk(
    "getMe",
    async (thunkAPI) => {
        const me: Contact = await dbGetLogin()

        return me
    }
)

export const getGroups = createAsyncThunk(
    "getGroups",
    async (thunkAPI) => {
        const groups: Group[] = await dbGetGroups()

        return groups
    }
)

export const getContacts = createAsyncThunk(
    "getContacts",
    async (thunkAPI) => {
        const contacts: Contact[] = await dbGetContacts()

        return contacts
    }
)

export const getMessages = createAsyncThunk(
    "getMessages",
    async ({ groupId }: { groupId: number }) => {
        let messages: Message[] = []

        messages = await dbGetMessages(groupId)

        return messages
    }
)

// Export
export const { } = stock.actions
export const stockReducer = stock.reducer

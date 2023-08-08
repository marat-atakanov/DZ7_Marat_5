import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getPost = createAsyncThunk(
    "getPost",
    async function (id, {dispatch, rejectWithValue}) {
        try {
            dispatch(preloaderOn())

            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            if (response.status >= 200 && response.status <= 204) {
                const data = await response.json()
                dispatch(addPost(data))
            } else if (response.status === 404) {
                throw "404 error"
            }

        } catch (e) {
            dispatch(setMessage(e))
        } finally {
            dispatch(preloaderOff())
        }
    }
)


const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        title: "",
        body: "",
        message: "",
        postPreloader: false
    },
    reducers: {
        addPost: (state, action) => {
            state.title = action.payload.title
            state.body = action.payload.body
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        preloaderOn: (state) => {
            state.postPreloader = true;
        },
        preloaderOff: (state) => {
            state.postPreloader = false;
        },
        deleteMoreInfo: (state) => {
            state.title = ''
            state.body = ''
        }
    }
})

export const {addPost, setMessage, preloaderOff, preloaderOn, deleteMoreInfo} = postSlice.actions
export default postSlice.reducer;
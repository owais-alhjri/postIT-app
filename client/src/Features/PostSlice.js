import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts:[],
    comments:[],
    likes:[],
};
export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
    console.log("Post data for likePost:", postData);
    try {
      const response = await axios.put(
        `https://postit-app-server-jywo.onrender.com/likePost/${postData.postId}`,
        {
          userId: postData.userId,
        }
      );
      const post = response.data.post;
      return post;
    } catch (error) {
      console.error("Error in likePost:", error);
      throw error;
    }
  });

export const getPosts = createAsyncThunk("post/getPosts", 
    async() =>{
        try{
            const response = await axios.get("https://postit-app-server-jywo.onrender.com/getPosts");
            console.log(response);
            return response.data.posts;
        }catch(error){
            console.log(error);
        }
    }
)

export const savePost = createAsyncThunk("posts/savePost", 
    async(postData) =>{
        
        try{
            const response = await
            axios.post("https://postit-app-server-jywo.onrender.com/savePost",{
                postMsg:postData.postMsg,
                email:postData.email,
            });
            const post = response.data.post;
            return post;
        }catch(error){
            console.log(error);
        }
    });
const postSlice = createSlice({
    name:"posts",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(savePost.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(savePost.fulfilled,(state, action)=>{
            console.log(action.payload);
            state.status = "succeeded";
            state.posts.unshift(action.payload);
        })
        .addCase(savePost.rejected,(state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(getPosts.pending, (state)=>{
            state.status = "loading";
        })
        .addCase(getPosts.fulfilled,(state, action)=>{
            state.status = "succeeded";
            console.log(action.payload);
            state.posts = action.payload || [];        })
        .addCase(getPosts.rejected, (state,  action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(likePost.pending, (state) => {
            state.status = "loading";
          })
          .addCase(likePost.fulfilled, (state, action) => {
            state.status = "succeeded";
            if (action.payload && action.payload._id) {
              const updatedPostIndex = state.posts.findIndex(
                (post) => post._id === action.payload._id
              );
              if (updatedPostIndex !== -1) {
                state.posts[updatedPostIndex] = action.payload;
              }
            } else {
              console.error("Invalid payload in likePost.fulfilled:", action.payload);
            }
          })
            .addCase(likePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
              })
            
    },
});
export default postSlice.reducer;
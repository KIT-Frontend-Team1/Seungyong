import React, { useState } from "react";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import Posts from "./components/Posts";
import Post from "./components/Post";

const queryClient = new QueryClient();

const App = () => {
  const [postId, setPostId] = useState(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {postId > -1 ? (
          <Post postId={postId} setPostId={setPostId} />
        ) : (
          <Posts setPostId={setPostId} />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./(auth)/AuthLayout";
import Signup from "./(auth)/Signup";
import Login from "./(auth)/Login";
import AppLayout from "./(app)/AppLayout";
import Blogs from "./(app)/Blogs";
import CreateBlog from "./(app)/CreateBlog";
import Profile from "./(app)/Profile";
import Blog from "./(app)/Blog";
import { useGetCurrentUserQuery } from "./redux/stores/apiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/stores/userStore";
import ProtectedRoute from "./(auth)/ProtectedRoute";
import EditBlog from "./(app)/EditBlog";

function App() {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(currentUser))
  }, [currentUser])

  if (isLoading) return <p className="loading">Loading...</p>;

  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />} path="/">
            <Route index element={<Blogs />} />
            <Route path="createBlog" element={<CreateBlog />} />
            <Route path="profile" element={<Profile />} />
            <Route path="blog/:id" element={<Blog />} />
            <Route path="blog/:id/edit" element={<EditBlog />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

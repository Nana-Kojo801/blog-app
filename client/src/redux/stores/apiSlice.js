import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Posts", "User"],
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            providesTags: ["User"],
            query: () => ({
                url: "/auth/user",
                credentials: "include",
                mode: "no-cors"
            })
        }),
        signup: builder.mutation({
            query: ({ username, password, confirmPassword }) => ({
                url: "/auth/signup",
                method: "POST",
                body: { username, password, confirmPassword },
                mode: "no-cors"
            })
        }),
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: "/auth/login",
                method: "POST",
                body: { username, password },
                credentials: "include",
                mode: "no-cors"
            })
        }),
        getBlogs: builder.query({
            
            query: (searchTerm) => ({
                url: `/post?search=${searchTerm}`,
                method: "GET",
                credentials: "include",
                mode: "no-cors"
            }),
            providesTags: (result) => [
                ...result.map(blog => ({ type: "Posts", id: blog._id }))
            ]
        }),
        createBlog: builder.mutation({
            query: (formData) => ({
                url: "/post",
                method: "POST",
                body: formData,
                credentials: "include",
                mode: "no-cors"
            }),
            invalidatesTags: ["Posts"]
        }),
        getBlog: builder.query({
            query: ({ id }) => ({
                url: `/post/${id}`,
                method: "GET",
                credentials: "include",
                mode: "no-cors"
            }),
            providesTags: (result, err, args) => [{ type: "Posts", id: args.id}]
        }),
        editBlog: builder.mutation({
            query: (formData) => ({
                url: "/post",
                method: "PUT",
                credentials: "include",
                body: formData,
                mode: "no-cors"
            }),
            invalidatesTags: (result, err, args) => [{ type: "Posts", id: Object.fromEntries(args).postId }],
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "/user",
                method: "PUT",
                credentials: "include",
                body: formData,
                mode: "no-cors"
            }),
            invalidatesTags: ["User"]
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                credentials: "include",
                mode: "no-cors"
            }),
            invalidatesTags: ["User"]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: "/post",
                method: "DELETE",
                body: { postId: id },
                headers: {"Content-type": "application/json",},
                credentials: "include",
                mode: "no-cors"
            }),
            invalidatesTags: (result, err, args) => [{ type: "Posts", id: args.id }]
        })
    })
})
export const {
    useGetCurrentUserQuery,
    useSignupMutation,
    useLoginMutation,
    useGetBlogsQuery,
    useCreateBlogMutation,
    useGetBlogQuery,
    useEditBlogMutation,
    useUpdateUserMutation,
    useLogoutMutation,
    useDeletePostMutation
} = apiSlice
export default apiSlice
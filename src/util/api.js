
const api = "http://localhost:3001"


// Generate a unique token for connecting to api
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const getPosts = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)

export const getPost = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: post.id,
            title: post.title,
            body: post.body,
            timestamp: post.timestamp,
            author: post.author,
            category: post.category
        })
    }).then(res => res.json())

export const updatePostVote = (postId, vote) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: postId, option: vote })
    }).then(res => res.json())


export const updatePost = (postId, title, body, author) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body, author })
    }).then(res => res.json())

export const deletePost = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers: headers
    }).then(res => res.json())

export const getPostComments = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json())

export const updateCommentVote = (commentId, vote) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: commentId, option: vote })
    }).then(res => res.json())

export const addComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: comment.id,
            parentId: comment.parentId,
            body: comment.body,
            timestamp: comment.timestamp,
            author: comment.author
        })
    }).then(res => res.json())

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: headers
    }).then(res => res.json())

export const updateComment = (id, body, author) =>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body, author })
    }).then(res => res.json())
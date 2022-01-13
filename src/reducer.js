// Reducer
import axios from 'axios'

const Reducer = (state, action) => {
  const url = `http://localhost:5000`
  // Retrieving token from local storage
  const token = localStorage.getItem('jaraToken')
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  const { type } = action

  // Fetch current user's info
  if (type === 'GET_CURRENT_USER_INFO') {
    const fetchCurrUser = async () => {
      action.loading()
      await authAxios
        .get('/user/profile')
        .then((resp) => {
          action.setCurrUserInfo(resp.data)
        })
        .catch((err) => console.log(err.response))
    }
    fetchCurrUser()
    return { ...state, isLoading: false }
  }

  // Set current user's info
  if (type === 'SET_CURRENT_USER_INFO') {
    return { ...state, currUser: action.payload, isLoading: false }
  }

  // Fetch certain user info
  if (type === 'GET_USER_INFO') {
    const fetchUserInfo = async () => {
      await authAxios
        .get(`/user/${action.payload}`)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err))
    }
    fetchUserInfo()
    return state
  }

  // Fetch certain user's info
  if (type === 'FETCH_CERTAIN_USER_INFO') {
    const fetchUserInfo = async () => {
      await authAxios
        .get(`/user/${action.payload}`)
        .then((resp) => action.setCertainUserInfo(resp.data.user))
        .catch((err) => console.log(err.response.data))
    }
    fetchUserInfo()
  }

  // Set certain user's info
  if (type === 'SET_CERTAIN_USER_INFO')
    return { ...state, certainUser: action.payload }

  // Logging user in
  if (type === 'LOGIN') {
    const { email, password, popupAlert } = action.payload
    //  Logging user
    const LogUser = async () => {
      await axios
        .post(`${url}/auth/login`, {
          email,
          password,
        })
        .then((userId) => {
          // Setting token to auth headers
          localStorage.setItem('jaraToken', userId.data.token)
          // Navigate to homepage
          window.open('/home', '_self')
          return { ...state }
        })
        .catch((e) => {
          popupAlert(true, e.response.data.msg, 'danger')
        })
    }
    LogUser()
    return state
  }

  // Logging user out
  if (type === 'LOGOUT') {
    localStorage.setItem('jaraToken', '')
    // Resseting all states
    return {
      currUser: { _id: '', name: '', email: '', isAdmin: false, __v: 0 },
      publicPosts: [],
      userAllPosts: [],
      singlePost: {},
      certainUser: {},
      toBeEditPost: {
        _id: '',
        title: '',
        message: '',
        tags: [],
        isPrivate: false,
      },
      isLoading: true,
      alertMessage: { show: false, msg: '', status: '' },
    }
  }

  // Show error alert message
  if (type === 'ERR_ALERT') {
    const { show, msg, status } = action.payload
    return {
      ...state,
      alertMessage: { show, msg, status },
    }
  }

  // Fetching posts from DB
  if (type === 'FETCH_ALL_PUBLIC_POSTS') {
    const fetchPosts = async () => {
      action.loading()
      const newPosts = await authAxios.get('/posts')
      action.getPublicPosts(newPosts.data.posts)
    }
    fetchPosts()
    return state
  }

  // Setting public posts
  if (type === 'GET_ALL_PUBLIC_POSTS') {
    let reversed = []
    // Reversing public posts
    for (let i = action.payload.length - 1; i >= 0; i--) {
      reversed.push(action.payload[i])
    }
    return { ...state, publicPosts: reversed, isLoading: false }
  }

  // Create new account
  if (type === 'REGISTER_ACCOUNT') {
    // reg = register
    const { name, email: regEmail, initPass } = action.payload

    const register = async () => {
      const newUser = await axios
        .post(`${url}/auth/register`, {
          name,
          email: regEmail,
          password: initPass,
        })
        .then(() => {
          window.open('/login', '_self')
        })
        .catch((err) => {
          action.popupAlert(true, err.response.data.msg, 'danger')
        })
      return newUser
    }
    register()
    return state
  }

  // Fetching user's all post
  if (type === 'FETCH_USER_ALL_POSTS') {
    const getUserPost = async () => {
      action.loading()
      await authAxios
        .get(`/posts/user/${action.payload}`)
        .then((resp) => action.setUserAllPosts(resp.data.posts))
        .catch((err) => console.log(err.response.data))
    }
    getUserPost()
    // return state
  }

  if (type === 'SET_USER_ALL_POSTS') {
    const arrPayload = [...action.payload].reverse()
    return { ...state, isLoading: false, userAllPosts: arrPayload }
  }

  // Fetching single post
  if (type === 'FETCH_SINGLE_POST') {
    const fetchPost = async () => {
      action.loading()
      await authAxios
        .get(`posts/${action.payload}`)
        .then((resp) => {
          // Setting single post
          action.setSinglePost(resp.data)
          const { _id, title, isPrivate, tags, message } = resp.data
          // Assigning toBeEditPost
          action.setToBeEditPost({ _id, title, isPrivate, tags, message })
        })
        .catch((err) => console.log(err))
    }
    fetchPost()
    return state
  }

  if (type === 'SET_SINGLE_POST')
    return { ...state, singlePost: action.payload, isLoading: false }

  // Create new post
  if (type === 'CREATE_POST') {
    const {
      title,
      tags,
      isPrivate,
      description,
      setters: {
        setTitle,
        setTags,
        setDescription,
        setIsPrivate,
        setIsModalOpen,
      },
      popupAlert,
      fetchPublicPosts,
    } = action.payload
    const newPost = async () => {
      await authAxios
        .post('/posts', {
          title,
          tags,
          message: description,
          isPrivate,
        })
        .then(() => {
          // Clear input fields
          setTitle('')
          setTags([])
          setDescription('')
          setIsPrivate(false)
          setIsModalOpen(false)
          // Fetch new public posts
          fetchPublicPosts()
        })
        .catch((err) => {
          popupAlert(true, err.response.data.msg, 'danger')
        })
    }
    newPost()
    return state
  }

  // Delete post
  if (type === 'DELETE_POST') {
    const { id, fetchPublicPosts } = action.payload
    const deletePost = async () => {
      try {
        await authAxios.delete(`/posts/${id}`)
      } catch (error) {
        console.log(error.response)
      }
    }
    deletePost()
    fetchPublicPosts()
    return state
  }

  // Set to be edit post
  if (type === 'SET_TO_BE_EDIT_POST') {
    return { ...state, toBeEditPost: action.payload }
  }

  // Updating post
  if (type === 'UPDATE_POST') {
    let { _id, title, isPrivate, tags, message } = state.toBeEditPost
    if (typeof tags === 'string') tags = tags.split(' ')
    const updatePost = async () => {
      await authAxios
        .patch(`${url}/posts/${_id}`, { title, isPrivate, tags, message })
        .then(() => {
          window.open('/home', '_self')
        })
        .catch((err) =>
          action.popupAlert(true, err.response.data.msg, 'danger')
        )
    }
    updatePost()
    return state
  }

  if (type === 'LOADING') {
    return { ...state, isLoading: true }
  }

  return state
}

export default Reducer

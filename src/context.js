import React, { useReducer, useContext, useCallback } from 'react'
import reducer from './reducer'

const AppContext = React.createContext()

const initialState = {
  currUser: { _id: '', name: '', email: '', isAdmin: false, __v: 0 },
  publicPosts: [],
  userAllPosts: [],
  singlePost: {},
  certainUser: {},
  toBeEditPost: { _id: '', title: '', message: '', tags: [], isPrivate: false },
  isLoading: true,
  alertMessage: { show: false, msg: '', status: '' },
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getCurrUserInfo = useCallback(() => {
    dispatch({ type: `GET_CURRENT_USER_INFO`, setCurrUserInfo, loading })
  }, [])

  const setCurrUserInfo = (info) => {
    dispatch({ type: `SET_CURRENT_USER_INFO`, payload: info })
  }

  const fetchUserInfo = useCallback((userId) => {
    dispatch({ type: `GET_USER_INFO`, payload: userId })
  }, [])

  const fetchCertainUserInfo = useCallback(
    (userId) =>
      dispatch({
        type: `FETCH_CERTAIN_USER_INFO`,
        payload: userId,
        setCertainUserInfo,
      }),
    []
  )

  const setCertainUserInfo = (info) =>
    dispatch({ type: `SET_CERTAIN_USER_INFO`, payload: info })

  const loginAccount = (email, password) =>
    dispatch({
      type: `LOGIN`,
      payload: { email, password, popupAlert },
    })

  const logoutAccount = () => {
    dispatch({ type: `LOGOUT` })
  }

  const popupAlert = (show = false, msg = '', status = '') => {
    dispatch({ type: 'ERR_ALERT', payload: { show, msg, status } })
  }

  // Fetch all public posts
  const fetchPublicPosts = useCallback(() => {
    dispatch({ type: `FETCH_ALL_PUBLIC_POSTS`, getPublicPosts, loading })
  }, [])

  // Set all public posts
  const getPublicPosts = (data) => {
    dispatch({ type: `GET_ALL_PUBLIC_POSTS`, payload: data })
  }

  // Fetching user's all post
  const fetchUserAllPosts = useCallback(
    (userId) =>
      dispatch({
        type: `FETCH_USER_ALL_POSTS`,
        payload: userId,
        loading,
        setUserAllPosts,
      }),
    []
  )

  // Set user's all post
  const setUserAllPosts = (posts) =>
    dispatch({ type: `SET_USER_ALL_POSTS`, payload: posts })

  const registerAccount = (name, email, initPass) => {
    dispatch({
      type: `REGISTER_ACCOUNT`,
      payload: { name, email, initPass },
    })
  }

  const deletePost = (id) => {
    dispatch({ type: 'DELETE_POST', payload: { id, fetchPublicPosts } })
  }

  // Assigning values to edit post
  const setToBeEditPost = useCallback(
    (post) => dispatch({ type: `SET_TO_BE_EDIT_POST`, payload: post }),
    []
  )

  const fetchSinglePost = useCallback(
    (postId) =>
      dispatch({
        type: `FETCH_SINGLE_POST`,
        payload: postId,
        setSinglePost,
        setToBeEditPost,
        loading,
      }),
    [setToBeEditPost]
  )

  const setSinglePost = (post) =>
    dispatch({ type: `SET_SINGLE_POST`, payload: post })

  const createNewPost = (title, tags, isPrivate, description, setters) => {
    dispatch({
      type: 'CREATE_POST',
      payload: {
        title,
        tags,
        isPrivate,
        description,
        setters,
        popupAlert,
        fetchPublicPosts,
      },
    })
  }

  const updatePost = () => dispatch({ type: `UPDATE_POST`, popupAlert })

  const loading = () => dispatch({ type: `LOADING` })

  return (
    <AppContext.Provider
      value={{
        ...state,
        getCurrUserInfo,
        fetchUserInfo,
        fetchCertainUserInfo,
        loginAccount,
        logoutAccount,
        popupAlert,
        fetchPublicPosts,
        registerAccount,
        createNewPost,
        deletePost,
        updatePost,
        fetchSinglePost,
        fetchUserAllPosts,
        setToBeEditPost,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }

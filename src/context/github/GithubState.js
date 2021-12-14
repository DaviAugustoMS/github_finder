import React, { useReducer, useEffect } from "react";
import axios from "axios";
import GithubReducer from "./githubReducer";
import githubContext from "./githubContext";
import {
  LIST_USERS,
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  // Users
  const handleUsers = async () => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );
    dispatch({
      type: LIST_USERS,
      payload: data,
    });
  };

  useEffect(() => {
    handleUsers();
  }, []);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    try {
      if (text !== "") {
        const { data } = await axios.get(
          `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
        );
        dispatch({
          type: SEARCH_USERS,
          payload: data.items,
        });
      }
    } catch (error) {
      console.log("aqui");
      throw error;
    }
  };

  // Get User
  const getUser = async (username) => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_USER,
      payload: data,
    });
  };

  // Get User Repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        handleUsers,
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;

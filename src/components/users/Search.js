import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const { searchUsers, clearUsers, users } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    }
    searchUsers(text);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          onChange={(e) => handleChange(e)}
          value={text}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={(e) => clearUsers()}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export { Search };

import React, { useState } from "react";
import propTypes from "prop-types";

const Search = ({ searchUsers }) => {
  const [search, setSearch] = useState({ text: "" });
  console.log(search);

  const onSubmit = (e) => {
    e.preventDefault();
    searchUsers(search.text);
    setSearch({ text: "" });
  };

  const handleChange = (e) => {
    setSearch({ [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          onChange={(e) => handleChange(e)}
          value={search.text}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
    </div>
  );
};

Search.propTypes = {
  searchUsers: propTypes.func.isRequired,
};

export { Search };

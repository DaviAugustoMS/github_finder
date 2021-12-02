import React from "react";
import propTypes from "prop-types";
import { UserItem, Spinner } from "../../components";

const Users = ({ loading, users }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users && users.map((user) => <UserItem key={user.id} user={user} />)}
      </div>
    );
  }
};

Users.propTypes = {
  loading: propTypes.bool.isRequired,
  users: propTypes.array.isRequired,
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export { Users };

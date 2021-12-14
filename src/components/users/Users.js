import React, { useContext } from "react";
import { UserItem, Spinner } from "../../components";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const { users, loading } = useContext(GithubContext);
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

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export { Users };

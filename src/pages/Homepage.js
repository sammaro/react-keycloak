import { useKeycloak } from "@react-keycloak/web";
import React from "react";

const Home = () => {
  const { keycloak } = useKeycloak();
  if (!keycloak.authenticated) {
    return null;
  }

  return (
    <div>
      <h1 className="text-green-800 text-4xl">Welcome to the Homepage</h1>
    </div>
  );
};

export default Home;

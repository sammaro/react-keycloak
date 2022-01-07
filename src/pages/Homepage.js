import { useKeycloak } from "@react-keycloak/web";
import React from "react";

const Home = () => {
  const { keycloak } = useKeycloak();
  if (!keycloak.authenticated) {
    return null;
  }

  return (
    <div>
      <h1 className="text-[#da484c] text-[1.4rem]">Welcome to the Homepage</h1>
    </div>
  );
};

export default Home;

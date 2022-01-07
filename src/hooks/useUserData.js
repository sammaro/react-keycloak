import { useKeycloak } from "@react-keycloak/web";
import { useLayoutEffect, useState } from "react";
import {Buffer} from 'buffer';

export const useUserData = () => {
  const { keycloak, initialized } = useKeycloak();
  const [userData, setUserData] = useState({});

  useLayoutEffect(() => {
    if (keycloak.authenticated) {
      localStorage.setItem("token", keycloak.token);
      localStorage.setItem("userId", keycloak.tokenParsed.preferred_username);
      var encodeUser = Buffer.from(
        keycloak.tokenParsed.lacajaAppsUsernames
      ).toString("base64");
      var headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("auth", encodeUser);

      var requestOptions = {
        method: "POST",
        headers: headers,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("/api/info", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setUserData(JSON.parse(result));
          localStorage.setItem("access_token", JSON.parse(result).token);
        })
        .catch((error) => console.log("error", error));
    }
  }, [keycloak, initialized]);

  return { userData };
};

export default useUserData;

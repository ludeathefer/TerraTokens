import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

const USER_LOGIN = gql`
  query UserLogin($publicKey: String!) {
    login(publicKey: $publicKey) {
      token
      User {
        publicKey
        username
        phone
        email
        roles {
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const Login = ({ connectWallet, setSigner, setAuthToken }) => {
  const [userLogin, _] = useLazyQuery(USER_LOGIN);

  const handleLogin = async () => {
    const { signer } = await connectWallet();
    setSigner(signer);
    userLogin({ variables: { publicKey: signer.address } }).then((data) =>
      setAuthToken(data.data.login.token)
    );
  };

  return (
    <button onClick={handleLogin} className="bg-blue-300 px-4 py-2 rounded-md">
      Login
    </button>
  );
};

export default Login;

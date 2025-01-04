import { Button } from "../components/ui/button";
import logoLogin from "../assets/logo-placeholder-image.png";
import actualLogo from "../assets/logo-placeholder-image.png";
import { useState, useEffect } from "react";
import meta from "../../src/assets/meta.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] =
    useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isInUsers, setIsInUsers] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ethereum) {
      setIsMetamaskInstalled(true);
    }
  }, []);

  async function connectMetamaskWallet(): Promise<void> {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]); // Assuming setAccount is defined elsewhere
      console.log(accounts[0]);
      setIsInUsers(false);
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  }

  useEffect(() => {
    if (account != null && !isInUsers) {
      handleSwitch();
    }
  }, [account, setIsInUsers]);

  function handleSwitch() {
    navigate("/sign-up");
  }

  return (
    <div className="flex flex-col   justify-center items-center h-screen w-screen p-20 ">
      <h1 className="mb-8">Login</h1>
      <div className=" items-center bg-black flex justify-center flex-row h-[26rem] w-[90%] rounded-3xl  ">
        <img
          src={logoLogin}
          className=" h-full w-1/2 object-cover border border-white rounded-l-3xl "
        />
        <div className="  border border-white rounded-r-3xl  h-full w-1/2 flex flex-col justify-center items-center  ">
          <img
            src={actualLogo}
            className=" h-1/4 w-full object-contain mb-16"
          />
          {account !== null && !!isMetamaskInstalled ? (
            <Button
              variant="outline"
              aria-disabled={true}
              className="text-orange-600 bg-zinc-700 hover:bg-orange-600 hover:text-white"
              onClick={connectMetamaskWallet}
            >
              {account!.slice(0, 6) + ".." + account!.slice(38, 42)}
            </Button>
          ) : isMetamaskInstalled && account === null ? (
            <Button
              variant="outline"
              aria-disabled={true}
              className="text-orange-600 bg-zinc-700 hover:bg-orange-600 hover:text-white"
              onClick={connectMetamaskWallet}
            >
              <img src={meta} className="object-contain h-6 w-6" />
              Connect Your Wallet
            </Button>
          ) : (
            <p>Please install wallet</p>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default Login;

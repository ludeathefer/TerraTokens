import { Button } from "../components/ui/button";
import leftImage from "../assets/left.jpg";
import actualLogo from "../assets/logo-placeholder-image.png";
import { useState, useEffect } from "react";
import meta from "../../src/assets/meta.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { checkUserApi } from "../api";
import { useStore } from "../hooks/use-store";

function Login() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] =
    useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkUserMutation = useMutation({
    mutationFn: checkUserApi,
    onSuccess: (data) => {
      console.log(data);
      if (data.sessionToken) {
        useStore.getState().setAuth(data.sessionToken, account);
        navigate("/dashboard"); // Navigate after setting auth
      }
    },
    onError: (err) => {
      if (err.status === 404) {
        navigate("/sign-up");
      } else {
        alert("An error occurred while checking user.");
      }
    },
  });

  useEffect(() => {
    if (window.ethereum) {
      setIsMetamaskInstalled(true);
    }
    if (useStore.getState().isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  async function connectMetamaskWallet(): Promise<void> {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      console.log(selectedAccount);
      setAccount(selectedAccount); // Update account state
      checkUserMutation.mutate(selectedAccount); // Pass the account to the mutation
    } catch (error) {
      alert(`Something went wrong: ${error.message}`);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen p-20 rounded-lg">
      <div className="items-center bg-gradient-to-bl from-teal-900 to-zinc-900 flex justify-center flex-row h-[40rem] w-[60%] rounded-lg">
        <div className="h-full w-1/2">
          <img
            src={leftImage}
            className="h-full w-auto object-cover bg-repeat border border-white rounded-lg"
          />
        </div>

        <div className="border border-white rounded-r-3xl h-full w-1/2 flex flex-col justify-center items-center">
          <img src={actualLogo} className="h-1/4 w-full object-contain mb-16" />
          {isMetamaskInstalled ? (
            account ? (
              <Button
                variant="outline"
                className="text-orange-600 bg-zinc-700 hover:bg-orange-600 hover:text-white"
                onClick={connectMetamaskWallet}
              >
                {account.slice(0, 6) + ".." + account.slice(-4)}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="text-orange-600 bg-zinc-700 hover:bg-orange-600 hover:text-white"
                onClick={connectMetamaskWallet}
              >
                <img src={meta} className="object-contain h-6 w-6" />
                Connect Your Wallet
              </Button>
            )
          ) : (
            <p>Please install MetaMask</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

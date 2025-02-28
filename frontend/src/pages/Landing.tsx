import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import meta from "../../src/assets/meta.png";
import { Separator } from "../components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { checkUserApi } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "../hooks/use-store";
import { useNavigate } from "react-router-dom";

const Landing = () => {
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
        console.log("Has account");
      }
    },
    onError: (err) => {
      if (err.status === 404) {
        console.log("Doesn't have any account");
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
      console.log("Has account");
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
    <div className="w-screen h-screen bg-[url(/src/assets/landing-bg.png)] bg-cover bg-[center_0px] bg-no-repeat bg-white flex flex-col">
      <div className="h-24 w-screen shadow-md flex flex-row items-center justify-between px-14 sticky z-10">
        <h1 className="text-2xl font-semibold text-black">TerraTokens</h1>

        <div className="h-full flex flex-row items-center gap-6">
          <h4 className="text-black text-sm font-semibold hover:text-blue-600 cursor-pointer">
            About
          </h4>
          <h4 className="text-black text-sm font-semibold hover:text-blue-600 cursor-pointer">
            FAQ
          </h4>
          {isMetamaskInstalled ? (
            <Button
              variant="outline"
              className="bg-[#FFFFFF]"
              onClick={connectMetamaskWallet}
            >
              <img src={meta} className="object-contain h-6 w-6" />
              Login with Metamask
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 items-center justify-center gap-12 -translate-y-1/4">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="font-semibold text-5xl text-black">
            Sasto Mulya Ma Ghar Jagga
          </h1>
          <h5 className="font-medium text-md text-black">
            Get Fractional Ownership of Land and Real Estate using TerraTokens
          </h5>
        </div>
        <div className="w-[700px] bg-white h-20 rounded-md shadow-md border border-black border-opacity-20 flex flex-row items-center justify-between p-4">
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-col gap-0 p-4">
              <Label className="text-xs font-extrabold text-black">
                Location
              </Label>
              <Input
                className="text-xs text-[#7d7d7d] font-normal border-none shadow-none -translate-x-3 translate-y-1 w-32 h-8"
                placeholder="Enter location"
              />
            </div>
            <Separator orientation="vertical" className="h-14 bg-[#E4E4E7]" />
            <div className="flex flex-col gap-0 p-4">
              <Label className="text-xs font-extrabold text-black">
                Property Size
              </Label>
              <Input
                className="text-xs text-[#7d7d7d] font-normal border-none shadow-none -translate-x-3 translate-y-1 w-28 h-8"
                placeholder="4 Aana"
              />
            </div>
            <Separator orientation="vertical" className="h-14 bg-[#E4E4E7]" />
            <div className="flex flex-col gap-0 p-4">
              <Label className="text-xs font-extrabold text-black">
                Max Prize
              </Label>
              <Input
                className="text-xs text-[#7d7d7d] font-normal border-none shadow-none -translate-x-3 translate-y-1 w-28 h-8"
                placeholder="Rs 1200"
              />
            </div>
          </div>
          <Button variant="outline" className="h-full">
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;

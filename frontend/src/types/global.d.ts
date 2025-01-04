import { JsonRpcProvider } from "ethers";

declare global {
    interface Window {
        ethereum: EthereumProvider;
    }

    interface EthereumProvider {
        request: (args: { method: string; params?: unknown[] }) => Promise<any>;
        isMetaMask?: boolean; // Optional property to check if it's MetaMask
    }
}
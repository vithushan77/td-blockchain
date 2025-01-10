import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import {injected} from "wagmi/connectors";

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}

export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [injected()],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
    ssr: true,
})
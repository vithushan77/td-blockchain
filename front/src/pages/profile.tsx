import {useAccount, useChainId, useConnect, useWriteContract} from 'wagmi'
import { useBlockNumber } from 'wagmi'
import { useGasPrice } from 'wagmi'
import {sepolia} from "wagmi/chains";
import {injected} from "wagmi/connectors";
import React from "react";



export function Profile() {
    const blockNumberData  = useBlockNumber()
    const chainId = useChainId()
    const gasPrice = useGasPrice()
    const { connectAsync } = useConnect()
    const { address } = useAccount()
    const { writeContractAsync } = useWriteContract()


    const handlePayment = async () => {
        try {

            if(!address) {
                await connectAsync({ chainId: sepolia.id, connector: injected()})
            }

            const data = await writeContractAsync({
                chainId: sepolia.id,
                address: '0x480CDbB2aB7e7D2CC9a34F246e906c449Dd84394',
                functionName: 'transfer',
                abi: [{ "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }],
                args: [
                    '0x480CDbB2aB7e7D2CC9a34F246e906c449Dd84394',
                ],
            })
            console.log(data)
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <div>
            <button
                onClick={handlePayment}
            >connect to your wallet</button>
            chain ID : {chainId}
            <div> Block Number : {blockNumberData.data?.toString() || 'Loading...'}{'\n'}</div>
            <div>Block Hash : {chainId}</div>
            <div> gas Used : {chainId}</div>
            <div>gas price : {gasPrice.data?.toString()}</div>
            Burnt Fees : {chainId} </div>

    );
}
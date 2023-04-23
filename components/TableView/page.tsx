'use client'
import React from "react";
import { forEachChild } from "typescript";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import Gogh from "../../classes/Gogh"
import { PublicKey } from "@solana/web3.js";



const TableView = async () => {

    const mint = new PublicKey("8AfHqqJ7UWzk9BL9fwreVmAVt8yqQBamWhLtHM3fjUZB")
    const mint2 = new PublicKey("EhJ3m8FbwKhsYmvLthNTx4dctbSEtEaN7BiktEnt1wL6")
    const mint3 = new PublicKey("52cbuLsKShDvjEZaqmwXgqSyKm2PNr9P5f79AS7D68QE")

    const MintArray = [ mint, mint2, mint3 ]
    
    var GoghArray = new Array 



    


    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase">
                <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Preview</th>
                    <th className="px-6 py-3">Mint Address</th>
                    <th className="px-6 py-3">Last Transaction</th>
                    <th className="px-6 py-3">Owner</th>
                </tr>
            </thead>
            <tbody>
            {MintArray.map(element => (
                <Gogh mintAddress={element} key={element}></Gogh>
            ))}

            </tbody>
        </table>
        </div>
  )
}


export default TableView;

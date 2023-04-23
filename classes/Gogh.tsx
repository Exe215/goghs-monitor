import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Metaplex, bundlrStorage, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import moment from "moment";
import Image from "next/image";

const connection = new Connection(clusterApiUrl("devnet"));
const wallet = Keypair.generate();
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

const Gogh = ({ mintAddress }) => {
  const [name, setName] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [owner, setOwner] = useState(undefined);
  const [latestTransaction, setLatestTransaction] = useState(undefined);

  const convertBlockTime = (blockdate) => {
    const formattedDate = moment.unix(blockdate).format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
  };

  const getNftData = async () => {
    try {
      const data = await metaplex.nfts().findByMint({ mintAddress });
      setData(data);
      setImage(data.json?.image);
      setName(data.name);
    } catch (error) {
      console.error("Error getting NFT data:", error);
    }
  };

  const getNftOwner = async () => {
    try {
      const largestAccounts = await connection.getTokenLargestAccounts(
        new PublicKey(mintAddress)
      );
      const largestAccountInfo = await connection.getParsedAccountInfo(
        largestAccounts.value[0].address
      );
      setOwner(largestAccountInfo.value?.data.parsed.info.owner);
    } catch (error) {
      console.error("Error getting NFT owner:", error);
    }
  };

  const getLatestTransactions = async () => {
    try {
      const transactionList = await connection.getSignaturesForAddress(mintAddress, {
        limit: 1
      });
      const blockTime = convertBlockTime(transactionList[0].blockTime?.toString());
      setLatestTransaction(blockTime);
    } catch (error) {
      console.error("Error getting latest transactions:", error);
    }
  };

  useEffect(() => {
    const updateGogh = async () => {
      await getNftData();
      await getNftOwner();
      await getLatestTransactions();

    };
    updateGogh();
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount


  return (
    <tr>
      <td className="px-6 py-3">{name}</td>
      <td className="px-6 py-3"><Image src={image} alt="image" width={25} height={25} ></Image></td>
      <td className="px-6 py-3">{mintAddress.toString()}</td>
      <td className="px-6 py-3">{latestTransaction}</td>
      <td className="px-6 py-3">{owner}</td>
    </tr>
  );
};


export default Gogh;

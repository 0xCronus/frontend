"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBalance } from "@wagmi/core";
import { config } from "@/lib/contracts";

const Dashboard = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [etherBalance, setEtherBalance] = useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);

  // const [walletAddress, setWalletAddress] = useState(account>.address);
  useEffect(() => {
    console.log("isConnected", isConnected, address);

    if (isConnected && address) {
      getBalance(config, {
        address,
        unit: "ether",
      })
        .then((balance) => {
          // Set the ether balance state
          console.log("balance", balance);
          setEtherBalance(
            balance?.formatted
              .toString()
              .slice(0, balance.formatted.toString().indexOf(".") + 7)
          );
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
        });
      getBalance(config, {
        address,
        token: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      })
        .then((balance) => {
          console.log("usdc balance", balance);
          setUsdcBalance(
            balance?.formatted
              .toString()
              .slice(0, balance.formatted.toString().indexOf(".") + 6)
          );
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
        });
    }
  }, [isConnected, address]);

  const [userProfile, setUserProfile] = useState({
    username: "IncognitoAlpha Foster",
    address: "0x30BCD2e90B3C05e54446568d823408B2ddfa7A01",
    twitterHandle: "https://twitter.com/0xshikhar",
    avatar: "/images/avatar.png",
    stats: {
      matchesPlayed: 10,
      matchesWon: 6,
      matchesLost: 4,
    },
    ongoingBets: [],
    pastBets: [
      { match: "Match 1", result: "Won", amountWon: 100 },
      { match: "Match 2", result: "Lost", amountLost: 50 },
    ],
  });

  const data = [
    ["Investments", "Ratio"],
    ["DeFi", 11],
    ["Meme", 2],
    ["GameFi", 2],
    ["Misc", 2],
  ];

  const options = {
    title: "My Investments",
    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    // slices: {
    //   1: { offset: 0.2 }, // Explodes the second slice
    // },
    pieStartAngle: 100, // Rotates the chart
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  };

  if (!isConnected) {
    return (
      <div className=" min-h-screen p-10">
        <div className="container mx-auto">
          <div className="p-10 bg-gray-100 rounded-3xl">
            <h2 className="text-3xl font-semibold">
              Connect your wallet to view your dashboard
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen p-10">
      <div className="container mx-auto">
        {/* Profile and Statistics Sections */}
        <div className="p-5 bg-gray-100 rounded-3xl mb-6">
          <div className="flex px-5 justify-between items-center">
            <div className="flex flex-row items-center space-x-4 ">
              <Image
                src={userProfile.avatar}
                alt="Avatar"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="flex-col">
                <h1 className="text-3xl font-bold">{userProfile.username}</h1>
                <div className="text-sm"> {address} </div>
              </div>
            </div>
            {/* <button className="bg-custom-color text-black px-4 py-2 rounded hover:bg-custom-color-500 transition duration-300">
                            Connect to {userProfile.twitterHandle}
                        </button> */}

            {/* <button className="bg-custom-color  text-black px-4 py-2 rounded hover:bg-custom-color-500 transition duration-300"
                                onClick={() => router.push('https://global-stg.transak.com/?apiKey=4aae77ea-df1a-4a88-9095-89625873c08e')}
                            >
                                Buy APT Token
                            </button> */}
            <div className="flex flex-row gap-4">
              <div className="flex items-center justify-end">
                <div className="w-px h-12 bg-blue-400"></div>
                <div className="flex flex-col px-2">
                  <div> {etherBalance}</div>
                  <div className="text-xs font-bold">ETH</div>
                </div>
              </div>
              {/* <div className="flex items-center justify-center">
                <div className="w-px h-12 bg-blue-400"></div>
                <div className="flex flex-col px-2">
                  <div> {usdcBalance}</div>
                  <div className="text-xs font-bold">USDC</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="p-10 rounded-3xl bg-gray-100 mb-6">
          <h2 className="text-3xl font-semibold">Statistics</h2>
          <div className="flex gap-5 pt-5">
            <div className="rounded-3xl w-[60%]">
              {" "}
              {/* Adjust height as needed */}
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </div>

            <div className="p-10 w-[40%] rounded-3xl bg-white">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-2xl"> Distribution</h2>
                {/* <div className='text-xs bg-blue-500 px-2 py-1 rounded-xl font-bold text-white'> </div> */}
              </div>
              {/* // defi, meme, gamefi, misc */}
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="ml-2">DeFi Crates</div>
                </div>
                <div>11 ETH</div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="ml-2">Meme Crates</div>
                </div>
                <div>5 ETH</div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="ml-2">GameFi Crates</div>
                </div>
                <div>3 ETH</div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="ml-2">Misc Crates</div>
                </div>
                <div>2 ETH</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 bg-gray-100 rounded-3xl">
          <div className="text-3xl font-bold"> Transaction History</div>
          <div className="card w-full my-5 p-5 items-center shadow-xl">
            {!isConnected ? (
              <div className="card-body">
                <h2 className="card-title">Connect your Wallet</h2>
                <div>
                  <span className="loading loading-ring loading-xs"></span>
                  <span className="loading loading-ring loading-sm"></span>
                  <span className="loading loading-ring loading-md"></span>
                  <span className="loading loading-ring loading-lg"></span>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Hash
                        </th>
                        <th scope="col" className="px-6 py-3">
                          No of Crates
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Crates
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          0x9726e6cac75e92941f13bfe705a0b32cf132ff2451ce1a6cc8bf0748a6c61b17
                        </th>
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> 10:23:50 13 Oct</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> invest</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> Defi Crate 1</div>
                          </div>
                        </td>

                        {/* <td className="px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delegate</a>
                                                </td> */}
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          0xj3k3jb235e92941f13bfe705a0b32cf132ff2451ce1a6cc8bf0748a6c61b17
                        </th>
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> 2:23:50 13 Oct</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> withdraw</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> Defi Crate 2</div>
                          </div>
                        </td>

                        {/* <td className="px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delegate</a>
                                                </td> */}
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          0x34jn726e6cac75e92941f13bfe705a0b32cf132ff2451ce1a6cc8bf0748a6c61b17
                        </th>
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> 1:23:50 12 Oct</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> invest</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> Meme Crate 1</div>
                          </div>
                        </td>

                        {/* <td className="px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delegate</a>
                                                </td> */}
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          0x34kje6cac75e92941f13bfe705a0b32cf132ff2451ce1a6cc8bf0748a6c61b17
                        </th>
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> 3:23:50 11 Oct</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> invest</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className=" "> GameFi Crate 1</div>
                          </div>
                        </td>

                        {/* <td className="px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delegate</a>
                                                </td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

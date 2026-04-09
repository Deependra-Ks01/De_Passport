require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

const rpcUrl = process.env.GANACHE_RPC_URL || "http://127.0.0.1:7545";
const privateKey = process.env.GANACHE_PRIVATE_KEY;

module.exports = {
  contracts_directory: "./contract",
  contracts_build_directory: "./contract/build",
  migrations_directory: "./migrations",
  networks: {
    development: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: rpcUrl,
          pollingInterval: 8000,
        }),
      network_id: process.env.CHAIN_ID || 5777,
      gas: 3000000,
      gasPrice: 20000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "paris",
      },
    },
  },
};

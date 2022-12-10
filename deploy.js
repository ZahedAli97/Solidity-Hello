const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile"); // interface is  abi

// infura goerli key - https://goerli.infura.io/v3/e11c628ecfa348c0af37bcbb8724b95e

const provider = new HDWalletProvider(
  "",
  "https://goerli.infura.io/v3/e11c628ecfa348c0af37bcbb8724b95e"
); // We pass two arguments to this instance simultaneously, 1 is account pneumonic
// that we create for goerli and another is the infura test network goerli api

// *** why do we need infura, we created goerli test account and have test ether, we want to test our contract
// in main simulation network like goerli. to connect to goerli network we need an address of an existing node inside
// goerli test network. so we use infura for that.
// We can also create our own node inside the network and connect to our node but it is compilacted for now

// let provider = new HDWalletProvider({
//   mnemonic: {
//     phrase:
//       "puzzle marriage drink wear cattle relax anxiety primary emotion head stamp snow"
//   },
//   providerOrUrl: "https://goerli.infura.io/v3/e11c628ecfa348c0af37bcbb8724b95e"
// });

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts(); // A mneumonic can we be used to generate many accounts so its  alist
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hello World!"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to ", result.options.address);
  provider.engine.stop(); // This line prevents a hanging deployment
};

deploy();

const assert = require('assert');
const ganache = require('ganache-cli') // Local test network
const Web3 = require('web3') // Constructor for web3
const web3 = new Web3(ganache.provider()) // web3 is instance of Web3, ganache.provider() tells the web3 instance to 
// connect to this local network that we are hosting on our machine only for testing purpose
// ganache.provider() will be replaced with other providers if we want to connect to main network or the rinkby test network

const { interface, bytecode } = require('../compile')

// Ganache provides us some unlocked accounts for testing

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    // Every function tied to web3 returns a promise
    // web3.eth.getAccounts()
    //     .then(fetchedAccounts => {
    //         console.log(fetchedAccounts);
    //     })

    // ** updating above code of promise to async/await

    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy the contract
    // web3 can interact with other blockchain netowrks, so to specify ethereum we use .eth
    inbox = await new web3.eth.Contract(JSON.parse(interface)) // We are chaining function to contract object, JSON.parse converts json to js object
    .deploy({data:bytecode,arguments:['Hi There!']}) // Deploy the contace with inital arguments // deploy function creates an object that can be deployed to a network using send function
    .send({from:accounts[0],gas:1000000}) // Use Ganache account to deploy the contract and use 1 million wei gas units

    // all of the above code returns an interactive object that is on blockchain
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })
    it('has a default message',async()=>{
        const message = await inbox.methods.message().call(); // whi message has () when we are calling it through call?
        // to pass in any paramters to message function
        assert.equal(message,'Hi There!')
    })

    it('can change the message',async () => {
        await inbox.methods.setMessage('Bye There!').send({from : accounts[0]}); // unlike call, send is only used to set some data and only returns the transaction id/receipt
        const message = await inbox.methods.message().call(); 
        assert.equal(message,'Bye There!')
    })
})




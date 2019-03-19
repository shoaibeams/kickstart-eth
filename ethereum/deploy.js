const HDWalletProvider = require('truffle-hdwallet-provider')
const keys = require('./config/keys')
const Web3 = require('web3')
const { bytecode, interface } = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  keys.mnemonic,
  `https://rinkeby.infura.io/${keys.infuraKey}`
)

const web3 = new Web3(provider)

const deploy = async () => {
  accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from ' + accounts[0])
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to ' + result.options.address)
}

deploy()

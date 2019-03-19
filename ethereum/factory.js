import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xDb411B33A621a4E1E819e215717444Eb41d3348F'
)

export default instance

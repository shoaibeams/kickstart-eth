import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address)
    const summary = await campaign.methods.getSummary().call()
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager
    } = this.props
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution  (wei)',
        description: 'You must contribute at least this much money to campaign.'
      },
      {
        header: requestsCount,
        meta: 'No of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers.'
      },
      {
        header: approversCount,
        meta: 'No of Approvers',
        description: 'No of people who have already to this campaign.'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (Ethers)',
        description: 'The balance is how much money this campaign has left to spend.'
      }
    ]
    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}
export default CampaignShow
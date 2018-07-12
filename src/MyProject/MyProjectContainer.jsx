import React from 'react'
import { withRouter } from 'react-router-dom'
import TruffleContract from 'truffle-contract'
import { withContext } from '../_API/withContext'
import MyProjectPage from './MyProjectPage'
import CrowdSaleAppContract from '../../build/contracts/CrowdSaleApp'

class MyProjectContainer extends React.PureComponent {

	constructor(props) {
		super(props)
		this.crowdSaleApp = TruffleContract(CrowdSaleAppContract)
		this.crowdSaleApp.setProvider(this.props.web3Provider)
	}

	componentDidMount() {
		this.props.web3.eth.getCoinbase((err, account) => {
			this.crowdSaleApp.deployed()
				.then((crowdSaleAppInstance) => {
					crowdSaleAppInstance.LogCrowdSaleCreated({creator: account}, {
						fromBlock: 0,
						toBlock: 'latest'
					}).get((error, logs) => {
						console.log('allEvents', logs)
					})
				})
				.catch(console.log)
		})
	}

	render() {
		return (
			<MyProjectPage
				{...this.state}
			/>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'crowdSaleAppInstance',
	'web3Provider'
])(withRouter(MyProjectContainer))

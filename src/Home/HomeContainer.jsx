import React from 'react'
import TruffleContract from 'truffle-contract'
import HomePage from './HomePage'
import { withContext } from '../_API/withContext'
import CrowdSaleAppContract from '../../build/contracts/CrowdSaleApp'

class HomeContainer extends React.PureComponent {
	// static getDerivedStateFromProps(props) {
	// 	console.log(props)
	// }
	state = {
		account: '',
		crowdSaleAppInstance: null
	}

	constructor(props) {
		super(props)
		this.crowdSaleApp = TruffleContract(CrowdSaleAppContract)
		this.crowdSaleApp.setProvider(props.web3Provider)
	}

	componentDidMount() {
		this.props.web3.eth.getCoinbase((err, account) => {
			this.crowdSaleApp.deployed()
				.then((crowdSaleAppInstance) => {
					this.setState({
						account,
						crowdSaleAppInstance
					})
				})
				.then(console.log)
				.catch(console.log)
		})
	}

	render() {
		return (
			<HomePage
				{...this.state}
				LogCrowdSaleCreated={this.props.LogCrowdSaleCreated}
				web3Provider={this.props.web3Provider}
				web3={this.props.web3}
			/>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'web3Provider',
	'LogCrowdSaleCreated'
])(HomeContainer)

import React from 'react'
import { withContext } from '../_API/withContext'
import HomePage from './HomePage'

class HomeContainer extends React.PureComponent {
	// static getDerivedStateFromProps(props) {
	// 	console.log(props)
	// }
	state = {
		account: '',
	}

	render() {
		return (
			<HomePage
				{...this.state}
				LogCrowdSaleCreated={this.props.LogCrowdSaleCreated}
				web3Provider={this.props.web3Provider}
				web3={this.props.web3}
				crowdSaleAppInstance={this.props.crowdSaleAppInstance}
			/>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'web3Provider',
	'LogCrowdSaleCreated',
	'crowdSaleAppInstance'
])(HomeContainer)

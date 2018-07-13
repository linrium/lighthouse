import React from 'react'
import { withContext } from '../_API/withContext'
import HomePage from './HomePage'
import {withRouter} from 'react-router-dom'

class HomeContainer extends React.PureComponent {
	static getDerivedStateFromProps(props) {
		return {
			LogCrowdSaleCreated: props.match.path === '/' ?
				props.LogCrowdSaleCreated :
				props.LogCrowdSaleCreated.filter(n => n.args.creator === props.account)
		}
	}
	state = {
		account: '',
	}

	render() {
		return (
			<HomePage
				{...this.state}
				LogCrowdSaleCreated={this.state.LogCrowdSaleCreated}
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
])(withRouter(HomeContainer))

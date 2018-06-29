import React from 'react'
import HomePage from './HomePage'
import { withContext } from '../_API/withContext'

class HomeContainer extends React.PureComponent {
	// static getDerivedStateFromProps(props) {
	// 	console.log(props)
	// }
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

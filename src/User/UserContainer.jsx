import React from 'react'
import { withRouter } from 'react-router-dom'
import { withContext } from '../_API/withContext'
import UserPage from './UserPage'

class UserContainer extends React.PureComponent {
	render() {
		return (
			<UserPage
				{...this.state}
				web3={this.props.web3}
				web3Provider={this.props.web3Provider}
			/>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'web3Provider',
])(withRouter(UserContainer))

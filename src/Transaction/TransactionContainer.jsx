import React from 'react'
import { withRouter } from 'react-router-dom'
import { withContext } from '../_API/withContext'
import TransactionPage from './TransactionPage'

class TransactionContainer extends React.PureComponent {
	render() {
		return (
			<TransactionPage
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
])(withRouter(TransactionContainer))

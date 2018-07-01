import React from 'react'
import { withRouter } from 'react-router-dom'
import { withContext } from '../_API/withContext'
import MyProjectPage from './MyProjectPage'

class MyProjectContainer extends React.PureComponent {
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

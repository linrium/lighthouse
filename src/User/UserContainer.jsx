import React from 'react'
import { withRouter } from 'react-router-dom'
import TruffleContract from 'truffle-contract'
import { withContext } from '../_API/withContext'
import UserPage from './UserPage'
import axios from 'axios'
import CrowdSaleAppContract from '../../build/contracts/CrowdSaleApp'

class UserContainer extends React.PureComponent {
	state = {
		user: {
			address: '',
			biography: '',
			email: '',
			username: ''
		}
	}

	constructor(props) {
		super(props)
		this.crowdSaleApp = TruffleContract(CrowdSaleAppContract)
		this.crowdSaleApp.setProvider(this.props.web3Provider)
	}

	getUserInfo = (id) => {
		axios
			.get(`https://ipfs.io/ipfs/${id}`)
			.then(result => {
				this.setState({
					user: result.data
				})
			})
			.catch(console.log)
	}

	componentDidMount() {
		this.crowdSaleApp.deployed().then((crowdSaleAppInstance) => {
			crowdSaleAppInstance.creators(this.props.match.params.userId)
				.then(id => this.getUserInfo(id))
				.catch(console.log)
		})
	}

	test = () => {
		console.log(this.props)
	}

	render() {
		return (
			<UserPage
				{...this.state}
				web3={this.props.web3}
				web3Provider={this.props.web3Provider}
				test={this.test}
			/>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'web3Provider',
])(withRouter(UserContainer))

import React from 'react'
import { withContext } from '../_API/withContext'
import TruffleContract from 'truffle-contract'
import CrowdSaleAppContract from '../../build/contracts/CrowdSaleApp'

class CrowdSaleApp extends React.PureComponent {
	crowdSaleApp = null
	crowdSaleAppInstance = null

	state = {
		title: '',
		description: '',
		fundingGoalInEthers: 0,
		durationInMinutes: 0
	}

	constructor(props) {
		super(props)

		this.crowdSaleApp = TruffleContract(CrowdSaleAppContract)
		this.crowdSaleApp.setProvider(this.props.web3Provider)
	}

	componentDidMount() {
		this.crowdSaleApp.deployed().then((instance) => {
			this.crowdSaleAppInstance = instance
			this.watchEvents()
		})
	}

	watchEvents() {
		this.crowdSaleAppInstance.allEvents({}, {
			fromBlock: 0,
			toBlock: 'latest'
		}).watch((error, logs) => {
			console.log('allEvents', logs)
		})
	}

	onChangeText = key => e => {
		this.setState({
			[key]: e.target.value
		})
	}

	onCreateNewCrowdSale = () => {
		this.crowdSaleAppInstance
			.createCrowdSale(
				'Hello',
				'Hello world',
				5,
				1,
				{from: this.props.account}
			)
			.then(console.log)
			.catch(console.error)
	}

	render() {
		const {
			title,
			description,
			fundingGoalInEthers,
			durationInMinutes
		} = this.state

		return (
			<div>
				<h1>Create CrowdSale</h1>
				<form>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={this.onChangeText('title')}
					/>
					<br/>
					<label htmlFor="description">description</label>
					<input
						type="text"
						id="description"
						value={description}
						onChange={this.onChangeText('description')}
					/>
					<br/>
					<label htmlFor="description">Funding Goal In Ethers</label>
					<input
						type="number"
						id="fundingGoalInEthers"
						value={fundingGoalInEthers}
						onChange={this.onChangeText('fundingGoalInEthers')}
					/>
					<br/>
					<label htmlFor="description">Duration In Minutes</label>
					<input
						type="number"
						id="durationInMinutes"
						value={durationInMinutes}
						onChange={this.onChangeText('durationInMinutes')}
					/>
					<br/>
					<input type="button" value="Create" onClick={this.onCreateNewCrowdSale}/>
				</form>
			</div>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'web3Provider'
])(CrowdSaleApp)
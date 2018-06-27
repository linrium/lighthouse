import React from 'react'
import TruffleContract from 'truffle-contract'
import moment from 'moment'
import CrowdSaleContract from '../../build/contracts/CrowdSale'
import { withContext } from '../_API/withContext'

class CrowdSale extends React.PureComponent {
	crowdSale = null
	crowdSaleInstance = null
	web3 = null

	state = {
		fundingGoal: 0,
		timeInMinutes: 0,
		address: ''
	}

	constructor(props) {
		super(props)

		this.crowdSale = TruffleContract(CrowdSaleContract)
		this.crowdSale.setProvider(this.props.web3Provider)
	}

	componentDidMount() {
		this.crowdSale.deployed().then((instance) => {
			this.crowdSaleInstance = instance
			this.watchEvents()
			this.getData()
		})
	}

	getData = () => {
		Promise.all([
			this.crowdSaleInstance.fundingGoal(),
			this.crowdSaleInstance.amountRaised(),
			this.crowdSaleInstance.deadline(),
		])
			.then(([fundingGoal, amountRaised, deadline]) => {
				console.log(this.props.account)
				console.log(this.props.web3.fromWei(fundingGoal.toNumber(), 'ether'))
				console.log(this.props.web3.fromWei(amountRaised.toNumber(), 'ether'))
				console.log(moment.unix(deadline.toNumber()).format('DD/MM/YYYY HH:mm:ss'))
			})
	}

	getBalanceOf = () => {
		if (!this.state.address) return console.error('Missing address')
		this.crowdSaleInstance.balanceOf(this.state.address)
			.then(val => {
				console.log(this.web3.fromWei(val.toNumber(), 'ether'))
			})
	}

	watchEvents() {
		this.crowdSaleInstance.GoalReached({}, {
			fromBlock: 0,
			toBlock: 'latest'
		}).watch((error, logs) => {
			console.log('GoalReached', logs)
		})

		this.crowdSaleInstance.FundTransfer({}, {
			fromBlock: 0,
			toBlock: 'latest'
		}).watch((error, logs) => {
			console.log('FundTransfer', logs)
		})
	}

	onChangeText = key => e => {
		this.setState({
			[key]: e.target.value
		})
	}

	onSubmit = () => {
		console.log(this.state)
	}

	render() {
		const {
			fundingGoal,
			timeInMinutes,
			address
		} = this.state
		return (
			<div>
				<h1>CrowdSale</h1>
				<form>
					<label htmlFor="fundingGoal">Funding goal</label>
					<input
						type="number"
						id="fundingGoal"
						value={fundingGoal}
						onChange={this.onChangeText('fundingGoal')}
					/>
					<br/>
					<label htmlFor="timeInMinutes">Time in minutes</label>
					<input
						type="number"
						id="timeInMinutes"
						value={timeInMinutes}
						onChange={this.onChangeText('timeInMinutes')}
					/>
					<br/>
					<input type="button" value="Create" onClick={this.onSubmit}/>

					<br/>
					<br/>
					<label htmlFor="address">Balance Of</label>
					<input
						type="text"
						id="address"
						value={address}
						onChange={this.onChangeText('address')}
					/>
					<br/>
					<input type="button" value="Check" onClick={this.getBalanceOf}/>
				</form>
			</div>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'web3Provider'
])(CrowdSale)
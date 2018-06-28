import React from 'react'
import TruffleContract from 'truffle-contract'
import moment from 'moment'
import CrowdSaleContract from '../../build/contracts/CrowdSale'
import { withContext } from '../_API/withContext'

class CrowdSale extends React.PureComponent {
	crowdSale = null
	crowdSaleInstance = null

	state = {
		crowdSaleData: null,
		fundingInEthers: 2,
		address: ''
	}

	constructor(props) {
		super(props)

		this.crowdSale = TruffleContract(CrowdSaleContract)
		this.crowdSale.setProvider(this.props.web3Provider)
	}

	componentDidMount() {
		this.crowdSale.at('0x672d635c4bf08da629c2c8cc648d70319d80ca11')
			.then((instance) => {
				this.crowdSaleInstance = instance
				this.watchEvents()
				this.getData()
			})
	}

	getData = () => {
		const {account, web3} = this.props
		Promise.all([
			this.crowdSaleInstance.title(),
			this.crowdSaleInstance.description(),
			this.crowdSaleInstance.fundingGoal(),
			this.crowdSaleInstance.amountRaised(),
			this.crowdSaleInstance.deadline(),
			this.crowdSaleInstance.owner(),
		])
			.then(([title, description, fundingGoal, amountRaised, deadline]) => {
				const crowdSaleData = {
					title,
					description,
					account,
					fundingGoal: web3.fromWei(fundingGoal.toNumber(), 'ether'),
					amountRaised: web3.fromWei(amountRaised.toNumber(), 'ether'),
					deadline: moment.unix(deadline.toNumber()).format('DD/MM/YYYY HH:mm:ss')
				}
				this.setState({crowdSaleData})
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
		// this.crowdSaleInstance.GoalReached({}, {
		// 	fromBlock: 0,
		// 	toBlock: 'latest'
		// }).watch((error, logs) => {
		// 	console.log('GoalReached', logs)
		// })
		//
		// this.crowdSaleInstance.FundTransfer({}, {
		// 	fromBlock: 0,
		// 	toBlock: 'latest'
		// }).watch((error, logs) => {
		// 	console.log('FundTransfer', logs)
		// })

		this.crowdSaleInstance.allEvents({}, {
			fromBlock: 0,
			toBlock: 'latest'
		}).watch((error, logs) => {
			console.log('allEvents0', logs)
		})
	}

	onChangeText = key => e => {
		this.setState({
			[key]: e.target.value
		})
	}

	onSubmit = () => {
		console.log(this.state)
		this.crowdSaleInstance.updatePrice({from: this.props.account})
			.then(console.log)
	}

	onSendTransaction = () => {
		this.crowdSaleInstance.sendTransaction({
			from: this.props.account,
			to: this.crowdSaleInstance.address,
			value: this.props.web3.toWei('5', 'ether') //optional, if you want to pay the contract Ether
		})
			.then(console.log)
			.catch(console.log)
	}

	render() {
		const {
			crowdSaleData
		} = this.state
		return (
			<div>
				<h1>CrowdSale</h1>
				<ul>
					{
						crowdSaleData && Object.keys(crowdSaleData)
							.map(k => <li key={k}>{crowdSaleData[k]}</li>)
					}
				</ul>
				<input
					type="number"
					value={this.state.fundingInEthers}
					onChange={this.onChangeText('fundingInEthers')}
				/>
				<button>Fund</button>
			</div>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'web3Provider'
])(CrowdSale)
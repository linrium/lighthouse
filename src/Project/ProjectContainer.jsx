import axios from 'axios/index'
import React from 'react'
import { withContext } from '../_API/withContext'
import ProjectPage from './ProjectPage'
import moment from 'moment/moment'
import TruffleContract from 'truffle-contract'
import CrowdSaleContract from '../../build/contracts/CrowdSale'
import CrowdSaleAppContract from '../../build/contracts/CrowdSaleApp'
import { withRouter } from 'react-router-dom'
import { pathOr } from 'ramda'

class ProjectContainer extends React.PureComponent {
	static getDerivedStateFromProps(props) {
		const LogCrowdSaleCreatedByAddr = props.LogCrowdSaleCreated
			.find(item => item.args.contractAddr === props.match.params.projectId)

		return {
			LogCrowdSaleCreatedByAddr
		}
	}

	static defaultProps = {
		args: {}
	}

	state = {
		amountRaised: 0,
		valueFund: 0,
		LogFundTransfer: [],
		creator: {}
	}

	constructor(props) {
		super(props)

		this.crowdSale = TruffleContract(CrowdSaleContract)
		this.crowdSale.setProvider(this.props.web3Provider)

		this.crowdSaleApp = TruffleContract(CrowdSaleAppContract)
		this.crowdSaleApp.setProvider(props.web3Provider)
	}

	componentDidMount() {
		const {projectId} = pathOr('', ['match', 'params'], this.props)
		this.crowdSale.at(projectId)
			.then(instance => {
				this.crowdSaleInstance = instance
				this.initData()
				this.getAllEvents()
				// this.watchEvents()
			})
	}

	componentDidUpdate() {
		if (
			this.state.LogCrowdSaleCreatedByAddr &&
			!this.isLoaded
		) {

			this.crowdSaleApp.deployed()
				.then((crowdSaleAppInstance) => {
					this.setState({
						crowdSaleAppInstance
					})
					const creatorId = this.state.LogCrowdSaleCreatedByAddr.args.creator
					return crowdSaleAppInstance.creators(creatorId)
				})
				.then(this.getCreator)
				.then(result => {
					this.setState({
						creator: result.data
					})
				})
				.catch(console.log)
			this.isLoaded = true
		}
	}

	getCreator = (infoHash) => {
		if(!infoHash) return
		return axios.get(`https://ipfs.io/ipfs/${infoHash}`)
	}

	onChangeText = key => e => {
		this.setState({
			[key]: e.target.value
		})
	}

	initData = () => {
		Promise.all([
			this.crowdSaleInstance.amountRaised(),
			this.crowdSaleInstance.deadline(),
			this.crowdSaleInstance.totalContributors()
		])
			.then(([amountRaised, deadline, totalContributors]) => {
				this.setState({
					amountRaised: this.props.web3.fromWei(amountRaised.toNumber(), 'ether'),
					deadline: moment.unix(deadline).fromNow().capitalize(),
					totalContributors: totalContributors.toNumber()
				})
			})
			.catch(console.error)
	}

	getAllEvents = () => {
		this.crowdSaleInstance.allEvents({
			fromBlock: 0,
			toBlock: 'latest'
		})
			.get((err, logs) => {
				if (err) return console.error(err)

				this.setState({
					LogFundTransfer: logs.reverse()
				})
			})
	}

	watchEvents = () => {
		this.crowdSaleInstance.allEvents({})
			.watch((err, logs) => {
				if (err) return console.error(err)

			})
	}

	onFund = () => {
		this.crowdSaleInstance.sendTransaction({
			from: this.props.account,
			to: this.crowdSaleInstance.address,
			value: this.props.web3.toWei(this.state.valueFund, 'ether') //optional, if you want to pay the contract Ether
		})
			.then(result => {
				const NewLogs = result.logs.filter(log => {
					return log.event === 'LogFundTransfer'
				})

				this.setState({
					LogFundTransfer: NewLogs.concat(this.state.LogFundTransfer)
				})
			})
			.catch(console.log)
	}

	render() {
		return (
			<ProjectPage
				{...this.state}
				web3={this.props.web3}
				web3Provider={this.props.web3Provider}
				onChangeText={this.onChangeText}
				onFund={this.onFund}
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
])(withRouter(ProjectContainer))

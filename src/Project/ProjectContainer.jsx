import React from 'react'
import { withContext } from '../_API/withContext'
import ProjectPage from './ProjectPage'
import moment from 'moment/moment'
import TruffleContract from 'truffle-contract'
import CrowdSaleContract from '../../build/contracts/CrowdSale'
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
	}

	constructor(props) {
		super(props)

		this.crowdSale = TruffleContract(CrowdSaleContract)
		this.crowdSale.setProvider(this.props.web3Provider)
	}

	componentDidMount() {
		const {projectId} = pathOr('', ['match', 'params'], this.props)
		this.crowdSale.at(projectId)
			.then(instance => {
				this.crowdSaleInstance = instance
				this.initData()
			})
	}

	initData = () => {
		Promise.all([
			this.crowdSaleInstance.amountRaised(),
			this.crowdSaleInstance.deadline()
		])
			.then(([amountRaised, deadline]) => {
				this.setState({
					amountRaised: amountRaised.toNumber(),
					deadline: moment.unix(deadline).fromNow().capitalize()
				})
			})
			.catch(console.error)
	}

	render() {
		return (
			<ProjectPage
				{...this.state}
				web3Provider={this.props.web3Provider}
			/>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'web3Provider',
	'LogCrowdSaleCreated'
])(withRouter(ProjectContainer))

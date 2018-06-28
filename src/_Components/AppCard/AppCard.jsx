import React from 'react'
import moment from 'moment'
import {
	ByAuthor,
	Category,
	Container,
	Deadline,
	Funded,
	InfoContainer,
	Pledged,
	ProgressBar,
	Thumbnail,
	Title
} from './AppCardStyled'
import { Colors } from '../../_Variables/Colors'
import { clone } from 'ramda'
import TruffleContract from 'truffle-contract'
import CrowdSaleContract from '../../../build/contracts/CrowdSale'

class AppCard extends React.PureComponent {
	crowdSale = null
	crowdSaleInstance = null

	static defaultProps = {
		args: {

		}
	}
	
	state = {
		amountRaised: 0
	}
	
	constructor(props) {
		super(props)
		
		this.crowdSale = TruffleContract(CrowdSaleContract)
		this.crowdSale.setProvider(this.props.web3Provider)
	}

	componentDidMount() {
		this.crowdSale.at(this.props.args.contractAddr)
			.then(instance => {
				this.crowdSaleInstance = instance
				this.getAmountRaised()
			})
	}

	get getPledgedPercent() {
		const {fundingGoalInEthers} = this.props.args
		return (this.state.amountRaised / fundingGoalInEthers) * 100
	}

	getAmountRaised = () => {
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
		const {amountRaised, deadline} = this.state
		const {
			creator,
			title,
			description,
			fundingGoalInEthers,
			durationInMinutes,
			thumbnailHash
		} = this.props.args
		return (
			<Container to={this.props.to}>
				<Thumbnail value={`https://ipfs.io/ipfs/${thumbnailHash}`}/>
				<InfoContainer>
					<Title>{title}</Title>
					<ByAuthor>by <span>Linh The Human</span></ByAuthor>
					<ProgressBar>
						<ProgressBar style={{width: this.getPledgedPercent}} bgColor={Colors.accent}/>
					</ProgressBar>
					<Pledged>{amountRaised}/{fundingGoalInEthers.toNumber()} pledged</Pledged>
					<Funded>{this.getPledgedPercent}% funded</Funded>
					<Deadline>{deadline}</Deadline>
					<Category>Wearables</Category>
				</InfoContainer>
			</Container>
		)
	}
}

export default AppCard
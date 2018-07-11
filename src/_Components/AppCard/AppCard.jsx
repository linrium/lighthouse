import moment from 'moment'
import React from 'react'
import TruffleContract from 'truffle-contract'
import CrowdSaleContract from '../../../build/contracts/CrowdSale'
import { Colors } from '../../_Variables/Colors'
import {
	ByAuthor,
	Container,
	Deadline,
	Funded,
	InfoContainer,
	Pledged,
	ProgressBar,
	Thumbnail,
	Title
} from './AppCardStyled'
import axios from 'axios'

class AppCard extends React.PureComponent {
	crowdSale = null
	crowdSaleInstance = null

	static defaultProps = {
		args: {

		}
	}
	
	state = {
		amountRaised: 0,
		creator: null
	}
	
	constructor(props) {
		super(props)
		
		this.crowdSale = TruffleContract(CrowdSaleContract)
		this.crowdSale.setProvider(this.props.web3Provider)
	}

	componentDidMount() {
		console.log(this.props)
		this.crowdSale.at(this.props.args.contractAddr)
			.then(instance => {
				this.crowdSaleInstance = instance
				this.initData()
			})
		this._mouted = true
	}

	componentWillUnmount() {
		this._mouted = false
	}

	get getPledgedPercent() {
		const {fundingGoalInEthers} = this.props.args
		if (fundingGoalInEthers === 0) return 0

		return ((this.state.amountRaised / fundingGoalInEthers) * 100).toFixed(2)
	}
	
	getCreator = (infoHash) => {
		return axios.get(`https://ipfs.io/ipfs/${infoHash}`)
	}

	initData = () => {
		Promise.all([
			this.crowdSaleInstance.amountRaised(),
			this.crowdSaleInstance.deadline(),
			this.props.crowdSaleAppInstance.creators(this.props.args.creator)
				.then(this.getCreator)
		])
			.then(([amountRaised, deadline, creator]) => {
				console.log(creator)
				if(this._mouted) {
					this.setState({
						amountRaised: this.props.web3.fromWei(amountRaised.toNumber(), 'ether'),
						deadline: moment.unix(deadline).fromNow().capitalize(),
						creator: creator.data
					})
				}
			})
			.catch(console.error)
	}

	render() {
		const {amountRaised, deadline, creator} = this.state
		const {
			title,
			fundingGoalInEthers,
			thumbnailHash
		} = this.props.args
		return (
			<Container to={this.props.to}>
				<Thumbnail value={`https://ipfs.io/ipfs/${thumbnailHash}`}/>
				<InfoContainer>
					<Title>{title}</Title>
					{
						creator &&
						<ByAuthor>
							<span>by <span>{creator.username}</span></span>
						</ByAuthor>
					}
					<ProgressBar>
						<ProgressBar style={{width: this.getPledgedPercent + '%'}} bgColor={Colors.accent}/>
					</ProgressBar>
					<Pledged>{amountRaised}/{fundingGoalInEthers.toNumber()} pledged</Pledged>
					<Funded>{this.getPledgedPercent}% funded</Funded>
					<Deadline>{deadline}</Deadline>
					{/*<Category>Wearables</Category>*/}
				</InfoContainer>
			</Container>
		)
	}
}

export default AppCard
import React from 'react'
import { captureFile } from '../_API/captureFile'
import StartPage from './StartPage'
import { withContext } from '../_API/withContext'
import { ipfs } from '../_API/ipfsAPI'

class StartContainer extends React.PureComponent {
	crowdSaleAppInstance = null

	state = {
		title: '',
		description: '',
		fundingGoalInEthers: 0,
		durationInMinutes: 0,
		categories: [
			{id: 'art', value: 'Art'},
			{id: 'comics', value: 'Comics'},
			{id: 'crafts', value: 'Crafts'},
			{id: 'dance', value: 'Dance'},
			{id: 'design', value: 'Design'},
			{id: 'fashion', value: 'Fashion'},
		],

		ipfsHash: '',
		buffer: null,
		imagePreviewUrl: '',
		status: '',

		startDate: null,
		endDate: null
	}

	// static getDerivedStateFromProps(props) {
	// 	console.log(props)
	// }

	onChangeText = key => e => {
		this.setState({
			[key]: e.target.value
		})
	}

	captureFile = captureFile(
		(reader) => this.setState({buffer: Buffer(reader.result)}),
		(reader) => this.setState({imagePreviewUrl: reader.result})
	)

	onCreate = () => {
		const {
			title,
			description,
			fundingGoalInEthers,
			durationInMinutes
		} = this.state

		const parseFundingGoal = parseInt(fundingGoalInEthers, 10)
		const parseDuration = parseInt(durationInMinutes, 10)

		if (!title) {
			this.setState({status: 'Missing title.'})
			return
		}

		if (!description) {
			this.setState({status: 'Missing description.'})
			return
		}

		if (Number.isNaN(parseFundingGoal)) {
			this.setState({status: 'Funding goal must be a number.'})
			return
		}

		if (Number.isNaN(parseDuration)) {
			this.setState({status: 'Duration must be a number.'})
			return
		}

		if (!this.state.buffer) {
			console.error('Please select thumbnail')
			return
		}

		this.setState({
			status: 'Uploading thumbnail to IPFS.',
			loading: true
		})
		ipfs.files.add(this.state.buffer, (err, result) => {
			if (err) return console.error(err)
			this.setState({
				status: 'Create your project.'
			})

			this.props.crowdSaleAppInstance
				.createCrowdSale(
					title,
					description,
					parseFundingGoal,
					parseDuration,
					result[0].hash,
					// 'QmSeyZj2LVYrpsQ487STwipki2gwabGFzmvmqUvDShAo89',
					{from: this.props.account}
				)
				.then(result => {
					console.log(result)
					this.setState({
						status: 'Create your project succeeded.',
						loading: false
					})

					location.reload()
				})
				.catch(console.error)
		})
	}

	render() {
		return (
			<StartPage
				{...this.state}
				onChangeText={this.onChangeText}
				onCreate={this.onCreate}
				captureFile={this.captureFile}

				onDatesChange={({startDate, endDate}) => this.setState({startDate, endDate})}
				onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,

			/>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'crowdSaleAppInstance'
])(StartContainer)

import React from 'react'
import StartPage from './StartPage'
import { withContext } from '../_API/withContext'
import ipfsAPI from 'ipfs-api'

const ipfs = new ipfsAPI({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

class StartContainer extends React.PureComponent {
	crowdSaleApp = null
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
		imagePreviewUrl: ''
	}
	
	// static getDerivedStateFromProps(props) {
	// 	console.log(props)
	// }

	onChangeText = key => e => {
		this.setState({
			[key]: e.target.value
		})
	}

	captureFile = files => {
		// e.preventDefault()
		const file = files[0]
		const reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => {
			this.setState({
				buffer: Buffer(reader.result),
			})
		}


		const readerURL = new window.FileReader()
		readerURL.readAsDataURL(file)
		readerURL.onloadend = () => {
			this.setState({
				imagePreviewUrl: readerURL.result
			})
		}
	}

	onCreate = () => {
		console.log(this.state)
		const {
			title,
			description,
			fundingGoalInEthers,
			durationInMinutes
		} = this.state

		const parseFundingGoal = parseInt(fundingGoalInEthers, 10)
		const parseDuration = parseInt(durationInMinutes, 10)

		// if(!title) {
		// 	console.error('Missing title')
		// 	return
		// }
		//
		// if(!description) {
		// 	console.error('Missing description')
		// 	return
		// }
		//
		// if(Number.isNaN(parseFundingGoal)) {
		// 	console.error('Funding goal must be a number')
		// 	return
		// }
		//
		// if(Number.isNaN(parseDuration)) {
		// 	console.error('Duration must be a number')
		// 	return
		// }
		//
		// if(!this.state.buffer) {
		// 	console.error('Please select thumbnail')
		// 	return
		// }

		console.log('uploading')
		ipfs.files.add(this.state.buffer, (err, result) => {
			if (err) return console.error(err)
			console.log('upload image succeeded', result)
			console.log('create crowd sale')

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
					console.log('create crowd sale succeeded')
				})
				.catch(console.error)
		})
	}

	render() {
		return (
			<div style={{marginTop: 100}}>
				{/*<form onSubmit={this.onUploadImage}>*/}
					{/*<input type='file' onChange={this.captureFile}/>*/}
					{/*<input type='submit'/>*/}
				{/*</form>*/}
				<StartPage
					{...this.state}
					onChangeText={this.onChangeText}
					onCreate={this.onCreate}
					captureFile={this.captureFile}
				/>
			</div>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'crowdSaleAppInstance'
])(StartContainer)

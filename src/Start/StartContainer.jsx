import React from 'react'
import StartPage from './StartPage'
import { withContext } from '../_API/withContext'
import TruffleContract from 'truffle-contract'
import CrowdSaleAppContract from '../../build/contracts/CrowdSaleApp'
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
		this.crowdSaleAppInstance.LogCrowdSaleCreated({}, {
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

	captureFile = e => {
		e.preventDefault()
		const file = e.target.files[0]
		const reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => {
			this.setState({buffer: Buffer(reader.result)})
			console.log('buffer', this.state.buffer)
		}
	}

	onUploadImage = e => {
		e.preventDefault()
		ipfs.files.add(this.state.buffer, (err, result) => {
			if (err) return console.error(err)

			console.log(result)
		})
	}

	onCreate = () => {
		this.crowdSaleAppInstance
			.createCrowdSale(
				'Hello 1',
				'Hello world 1',
				5,
				1,
				{from: this.props.account}
			)
			.then(console.log)
			.catch(console.error)
	}

	render() {
		return (
			<div style={{marginTop: 100}}>
				<form onSubmit={this.onUploadImage}>
					<input type='file' onChange={this.captureFile}/>
					<input type='submit'/>
				</form>
				<StartPage
					{...this.state}
					onChangeText={this.onChangeText}
					onCreate={this.onCreate}
				/>
			</div>
		)
	}
}


export default withContext([
	'web3',
	'account',
	'web3Provider'
])(StartContainer)

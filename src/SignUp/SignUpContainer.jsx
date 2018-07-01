import axios from 'axios'
import React from 'react'
import { withRouter } from 'react-router-dom'
import TruffleContract from 'truffle-contract'
import CrowdSaleAppContract from '../../build/contracts/CrowdSaleApp'
import { captureFile } from '../_API/captureFile'
import { ipfs } from '../_API/ipfsAPI'
import { withContext } from '../_API/withContext'
import SignUpPage from './SignUpPage'

class SignUpContainer extends React.PureComponent {
	// static getDerivedStateFromProps(props) {
	// 	console.log(props)
	// }
	state = {
		username: '',
		email: '',
		address: '',
		biography: '',

		buffer: '',
		imagePreviewUrl: '',
		status: '',
		loading: false
	}

	constructor(props) {
		super(props)
		this.crowdSaleApp = TruffleContract(CrowdSaleAppContract)
		this.crowdSaleApp.setProvider(this.props.web3Provider)
	}

	componentDidMount() {
		this.crowdSaleApp.deployed().then((crowdSaleAppInstance) => {
			const userId = this.props.match.params.userId
			if (userId) {
				crowdSaleAppInstance.creators(userId)
					.then(id => this.getUserInfo(id))
					.catch(console.log)
			}
		})
	}

	getUserInfo = (id) => {
		axios
			.get(`https://ipfs.io/ipfs/${id}`)
			.then(result => {
				console.log(result)
				this.setState({
					...result.data,
					imagePreviewUrl: `https://ipfs.io/ipfs/${result.data.avatarHash}`
				})
			})
			.catch(console.log)
	}

	onChangeText = key => e => {
		this.setState({
			[key]: e.target.value
		})
	}

	captureFile = captureFile(
		(reader) => this.setState({buffer: Buffer(reader.result)}),
		(reader) => this.setState({imagePreviewUrl: reader.result})
	)

	uploadAvatar = () => {
		return new Promise((resolve, reject) => {
			ipfs.files.add(this.state.buffer, (err, result) => {
				if (err) reject(err)
				
				resolve(result)
			})
		})
	}

	uploadInfo = (data) => {
		return new Promise((resolve, reject) => {
			const {username, email, address, biography} = this.state
			const content = Buffer(JSON.stringify({
				username,
				email,
				address,
				biography,
				...data
			}))
			ipfs.files.add(content, (err, result) => {
				if (err) reject(err)

				resolve(result)
			})
		})
	}

	onCreate = () => {
		this.setState({
			status: 'Uploading avatar',
			loading: true
		})
		this.uploadAvatar()
			.then(result => {
				this.setState({status: 'Uploading user info'})
				console.log(result)
				return this.uploadInfo({avatarHash: result[0].hash})
			})
			.then(result => {
				this.setState({
					status: 'Uploading user info completed',
				})

				return this.props.crowdSaleAppInstance
					.createCreator(result[0].hash, {from: this.props.account})
			})
			.then(val => {
				this.setState({
					loading: false
				})
			})
			.catch(err => {
				this.setState({status: err.message})
			})
	}

	render() {
		return (
			<SignUpPage
				{...this.state}
				onChangeText={this.onChangeText}
				captureFile={this.captureFile}
				onCreate={this.onCreate}
			/>
		)
	}
}

export default withContext([
	'web3',
	'account',
	'crowdSaleAppInstance',
	'web3Provider'
])(withRouter(SignUpContainer))

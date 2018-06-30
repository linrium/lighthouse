import React from 'react'
import { captureFile } from '../_API/captureFile'
import SignUpPage from './SignUpPage'
import { withContext } from '../_API/withContext'
import { ipfs } from '../_API/ipfsAPI'

class SignUpContainer extends React.PureComponent {
	// static getDerivedStateFromProps(props) {
	// 	console.log(props)
	// }
	state = {
		username: 'linh',
		email: 'linh@gmail.com',
		address: 'HCM VN',
		biography: 'Hello world',

		buffer: '',
		imagePreviewUrl: '',
		status: '',
		loading: false
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
				return this.uploadInfo({avatarHash: result.hash})
			})
			.then(result => {
				this.setState({
					status: 'Uploading user info completed',
				})

				return this.props.crowdSaleAppInstance
					.createCreator(result[0].hash, {from: this.props.account})
			})
			.then(val => {
				console.log(val)
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
])(SignUpContainer)

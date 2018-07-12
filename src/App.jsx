import axios from 'axios/index'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import TruffleContract from 'truffle-contract'
import Web3 from 'web3'
import CrowdSaleAppContract from '../build/contracts/CrowdSaleApp'
import AppHeader from './_Components/AppHeader/AppHeader'
import {
	BackgroundImage,
} from './AppStyled'
import { RouterContent } from './routes'

export const AppContext = React.createContext()

export class App extends React.PureComponent {
	constructor(props) {
		super(props)
		let web3 = window.web3
		let isInstalledMeta = false

		if (typeof web3 !== 'undefined') {
			this.web3Provider = web3.currentProvider
			isInstalledMeta = true
		} else {
			this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
		}

		this.web3 = new Web3(this.web3Provider)

		this.crowdSaleApp = TruffleContract(CrowdSaleAppContract)
		this.crowdSaleApp.setProvider(this.web3Provider)


		this.state = {
			account: null,
			crowdSaleInstance: null,
			crowdSaleAppInstance: null,

			LogCrowdSaleCreated: [],
			isInstalledMeta,
			currentCreator: this.defaultCretor
		}
	}

	get defaultCretor() {
		return {
			username: '',
			email: '',
			address: '',
			biography: ''
		}
	}

	componentDidMount() {
		this.web3.eth.getCoinbase((err, account) => {

			this.crowdSaleApp.deployed()
				.then((crowdSaleAppInstance) => {
					this.setState({
						account,
						crowdSaleAppInstance
					}, () => {
						this.watchEvents()
						setInterval(this.onListenChangeAccount, 1000)
					})

					return crowdSaleAppInstance.creators(account)
				})
				.then(id => {
					this.getUserInfo(id)
				})
				.catch(console.log)
		})
	}

	onListenChangeAccount = () => {
		const account = this.web3.eth.accounts[0]
		if (account !== this.state.account) {
			this.setState({account}, () => {
				const isReload = confirm('You changed account. Do you want to reload this website.')
				if(isReload) {
					location.replace('http://localhost:3000')
					location.reload()
				} else {
					alert('Your account changed. Please reload this website again.')
				}
			})
		}
	}

	watchEvents(filter = {}) {
		const {
			crowdSaleAppInstance,
		} = this.state
		crowdSaleAppInstance.LogCrowdSaleCreated(filter, {
			fromBlock: 0,
			toBlock: 'latest'
		}).get((error, logs) => {
			// console.log('allEvents', logs)
			this.setState({
				LogCrowdSaleCreated: logs
			})
		})
	}

	getUserInfo = (id) => {
		if (!id) {
			this.setState({
				currentCreator: this.defaultCretor
			})
			return
		}
		axios
			.get(`https://ipfs.io/ipfs/${id}`)
			.then(result => {
				this.setState({
					currentCreator: {
						...result.data,
						imagePreviewUrl: `https://ipfs.io/ipfs/${result.data.avatarHash}`
					}
				})
			})
			.catch(() => {
				this.setState({
					currentCreator: this.defaultCretor
				})
			})
	}

	render() {
		if (!this.state.isInstalledMeta) {
			return (
				<h1>Please install MetaMask: <a href="https://metamask.io/">https://metamask.io/</a></h1>
			)
		}

		return (
			<AppContext.Provider value={{
				web3: this.web3,
				web3Provider: this.web3Provider,
				account: this.state.account,
				crowdSaleAppInstance: this.state.crowdSaleAppInstance,
				LogCrowdSaleCreated: this.state.LogCrowdSaleCreated,
				currentCreator: this.state.currentCreator,
				onUpdateUser: currentCreator => this.setState({currentCreator})
			}}>
				<BrowserRouter>
					<div>
						<AppHeader/>
						<RouterContent/>
						<BackgroundImage/>

					</div>
				</BrowserRouter>
			</AppContext.Provider>
		)
	}
}
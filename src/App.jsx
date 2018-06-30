import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import TruffleContract from 'truffle-contract'
import Web3 from 'web3'
import CrowdSaleAppContract from '../build/contracts/CrowdSaleApp'
import AppHeader from './_Components/AppHeader/AppHeader'
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
			web3: null,
			account: null,
			crowdSaleInstance: null,
			crowdSaleAppInstance: null,

			LogCrowdSaleCreated: [],
			isInstalledMeta,
			currentCreator: {
				username: 'linh',
				email: 'linh@gmail.com',
				address: 'HCM VN',
				biography: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
			}
		}
	}

	componentDidMount() {
		this.web3.eth.getCoinbase((err, account) => {
			this.crowdSaleApp.deployed().then((crowdSaleAppInstance) => {
				this.setState({
					account,
					crowdSaleAppInstance
				}, () => {
					this.watchEvents()
				})
			})
		})
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
				currentCreator: this.state.currentCreator
			}}>
				<BrowserRouter>
					<div>
						<AppHeader/>
						<RouterContent/>
					</div>
				</BrowserRouter>
			</AppContext.Provider>
		)
	}
}
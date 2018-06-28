import React from 'react'
import Web3 from 'web3'
import { BrowserRouter } from 'react-router-dom'
import { RouterContent } from './routes'
import AppHeader from './_Components/AppHeader/AppHeader'
import TruffleContract from 'truffle-contract'
import CrowdSaleAppContract from '../build/contracts/CrowdSaleApp'
import CrowdSaleContract from '../build/contracts/CrowdSale'

export const AppContext = React.createContext()

export class App extends React.PureComponent {
	web3 = null
	web3Provider = null

	state = {
		web3: null,
		account: null,
		crowdSaleInstance: null,
		crowdSaleAppInstance: null,

		LogCrowdSaleCreated: []
	}

	constructor(props) {
		super(props)
		let web3 = window.web3
		if (typeof web3 !== 'undefined') {
			this.web3Provider = web3.currentProvider
		} else {
			this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
		}

		this.web3 = new Web3(this.web3Provider)

		this.crowdSaleApp = TruffleContract(CrowdSaleAppContract)
		this.crowdSaleApp.setProvider(this.web3Provider)

		this.crowdSale = TruffleContract(CrowdSaleContract)
		this.crowdSale.setProvider(this.web3Provider)
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
			LogCrowdSaleCreated
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
		return (
			<AppContext.Provider value={{
				web3: this.web3,
				web3Provider: this.web3Provider,
				account: this.state.account,
				crowdSale: this.crowdSale,
				crowdSaleAppInstance: this.state.crowdSaleAppInstance,
				LogCrowdSaleCreated: this.state.LogCrowdSaleCreated
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
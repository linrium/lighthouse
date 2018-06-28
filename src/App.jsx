import React from 'react'
import Web3 from 'web3'
import { BrowserRouter } from 'react-router-dom'
import { RouterContent } from './routes'
import AppHeader from './_Components/AppHeader/AppHeader'
import TruffleContract from 'truffle-contract'
import CrowdSaleAppContract from '../build/contracts/CrowdSaleApp'

export const AppContext = React.createContext()

export class App extends React.PureComponent {
	web3 = null
	account = null
	web3Provider = null

	state = {
		web3: null,
		account: null
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
	}

	componentDidMount() {
		this.web3.eth.getCoinbase((err, account) => {
			this.setState({
				account,
			})

			this.crowdSaleApp.deployed().then((instance) => {
				this.crowdSaleAppInstance = instance
				this.watchEvents()
			})
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

	render() {
		return (
			<AppContext.Provider value={{
				web3: this.web3,
				web3Provider: this.web3Provider,
				account: this.state.account,
				crowdSaleAppInstance: this.crowdSaleAppInstance
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
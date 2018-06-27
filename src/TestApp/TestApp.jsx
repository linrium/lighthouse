import React, { Component } from 'react'
import TestApp from '../../build/contracts/TestApp.json'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'

class App extends Component {
	testApp = null
  testAppInstance = null
  web3 = null

	state = {
		storageValue: 0,
		account: null,
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

		this.testApp = TruffleContract(TestApp)
		this.testApp.setProvider(this.web3Provider)
	}

	componentDidMount() {
		this.web3.eth.getCoinbase((err, account) => {
			this.setState({ account })
			this.testApp.deployed().then((instance) => {
        this.testAppInstance = instance
        this.watchEvents()
        this.testAppInstance.getBalance()
        .then((val) => {
					console.log('balance', val.toNumber())
        })
        .catch(err => {
          console.log(err)
        })

        this.testAppInstance.EURGBP()
        .then((val) => {
					console.log('EURGBP', val)
        })
        .catch(err => {
          console.log(err)
        })
			})
		})
	}

	watchEvents() {
		// TODO: trigger event when vote is counted, not when component renders
		this.testAppInstance.LogPriceUpdated({}, {
			fromBlock: 0,
			toBlock: 'latest'
		}).watch((error, logs) => {
			console.log('logs', logs)
		})
	}

	onSubmit = () => {
		this.testAppInstance
			.updatePrice({from: this.state.account})
      .then(console.log)
      .catch(console.log)
  }
  
  onSendTransaction = () => {
    this.testAppInstance.sendTransaction({
      from: this.state.account,
      to: this.testAppInstance.address,
      value: this.web3.toWei('5', 'ether') //optional, if you want to pay the contract Ether
    })
    .then(console.log)
    .catch(console.log)
  }

	render() {
		return (
			<div className="App">
				<nav className="navbar pure-menu pure-menu-horizontal">
					<a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
				</nav>

				<main className="container">
					<div className="pure-g">
						<div className="pure-u-1-1">
							<p>The stored value is: {this.state.storageValue}</p>
							<button onClick={this.onSubmit}>Submit</button>
							<button onClick={this.onSendTransaction}>Submit Transaction</button>
						</div>
					</div>
				</main>
			</div>
		)
	}
}

export default App
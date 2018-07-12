import React from 'react'
import AppCard from '../_Components/AppCard/AppCard'
import { ListCards } from './HomeStyled'

export const HomeListCards = ({data, web3, web3Provider, account, crowdSaleAppInstance}) => (
	<ListCards>
		{
			data
				.map(log => {
					const address = log.args.contractAddr
					return (
						<AppCard
							account={account}
							crowdSaleAppInstance={crowdSaleAppInstance}
							web3={web3}
							web3Provider={web3Provider}
							args={log.args}
							key={log.transactionHash}
							to={`/project/${address}`}
						/>
					)
				})
		}
	</ListCards>
)
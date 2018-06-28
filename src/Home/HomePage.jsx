import React from 'react'
import {
	Container,
	ListCards,
	Wrapper
} from './HomeStyled'
import AppCard from '../_Components/AppCard/AppCard'
import AppButton from '../_Components/AppButton/AppButton'

class HomePage extends React.PureComponent {
	render() {
		return (
			<Container>
				<Wrapper>
					<ListCards>
						{
							this.props.LogCrowdSaleCreated
								.map(log => {
									return (
										<AppCard
											address={log.address}
											web3Provider={this.props.web3Provider}
											args={log.args}
											key={log.transactionHash}
											to={`project/${log.transactionHash}`}
										/>
									)
								})
						}
					</ListCards>
					<AppButton value="Load more"/>
				</Wrapper>
			</Container>
		)
	}
}

export default HomePage
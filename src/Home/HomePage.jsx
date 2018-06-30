import React from 'react'
import { HomeListCards } from './HomeListCards'
import {
	Container,
	Wrapper
} from './HomeStyled'

class HomePage extends React.PureComponent {
	get isEmptyProject() {
		return this.props.LogCrowdSaleCreated.length === 0
	}

	render() {
		return (
			<Container>
				<Wrapper>
					{
						this.isEmptyProject ?
							<h2>Empty</h2> :
							<HomeListCards
								web3={this.props.web3}
								web3Provider={this.props.web3Provider}
								data={this.props.LogCrowdSaleCreated}
							/>
					}
					{/*<AppButton value="Load more"/>*/}
				</Wrapper>
			</Container>
		)
	}
}

export default HomePage
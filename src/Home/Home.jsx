import React from 'react'
import {
	Container,
	ListCards,
	Wrapper
} from './HomeStyled'
import AppCard from '../_Components/AppCard/AppCard'
import AppButton from '../_Components/AppButton/AppButton'

class Home extends React.PureComponent {
	render() {
		return (
			<Container>
				<Wrapper>
					<ListCards>
						{
							[...Array(9).keys()]
								.map(k => (<AppCard key={k}/>))
						}
					</ListCards>
					<AppButton/>
				</Wrapper>
			</Container>
		)
	}
}

export default Home
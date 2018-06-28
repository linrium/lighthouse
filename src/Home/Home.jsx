import React from 'react'
import { Container, Wrapper } from './HomeStyled'
import AppHeader from '../_Components/AppHeader/AppHeader'
import AppCard from '../_Components/AppCard/AppCard'
import AppButton from '../_Components/AppButton/AppButton'

class Home extends React.PureComponent {
	render() {
		return (
			<Container>
				<AppHeader/>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 40,
					marginBottom: 40
				}}>
					<Wrapper>
						{
							[...Array(9).keys()]
								.map(k => (<AppCard key={k}/>))
						}
					</Wrapper>
					<AppButton/>
				</div>
			</Container>
		)
	}
}

export default Home
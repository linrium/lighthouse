import React from 'react'
import {
	Container,
	ListCards,
	Wrapper
} from './ProjectStyled'
import AppCard from '../_Components/AppCard/AppCard'
import AppButton from '../_Components/AppButton/AppButton'

class Project extends React.PureComponent {
	render() {
		return (
			<Container>
				<Wrapper>
					<h1>Hello</h1>
				</Wrapper>
			</Container>
		)
	}
}

export default Project
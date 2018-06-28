import React from 'react'
import { Container } from './AppButtonStyled'

class AppButton extends React.PureComponent {
	render() {
		return (
			<Container>
				{this.props.value}
			</Container>
		)
	}
}

export default AppButton
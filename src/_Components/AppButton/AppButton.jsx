import React from 'react'
import { Container } from './AppButtonStyled'

class AppButton extends React.PureComponent {
	render() {
		const {value, ...rest} = this.props
		return (
			<Container {...rest}>
				{value}
			</Container>
		)
	}
}

export default AppButton
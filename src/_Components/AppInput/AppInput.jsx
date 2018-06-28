import React from 'react'
import {
	Container,
	Input,
} from './AppInputStyled'

class AppInput extends React.PureComponent {
	render() {
		return (
			<Container>
				<Input {...this.props}/>
			</Container>
		)
	}
}

export default AppInput
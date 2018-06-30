import React from 'react'
import { HashLoader } from 'react-spinners'
import { Colors } from '../../_Variables/Colors'
import { Container } from './AppButtonStyled'

class AppButton extends React.PureComponent {
	render() {
		const {value, loading, ...rest} = this.props
		return (
			<Container {...rest}>
				{
					loading ?
						<HashLoader
							color={Colors.secondary}
							loading={true}
						/> :
						value
				}
			</Container>
		)
	}
}

export default AppButton
import React from 'react'
import {
	Container,
	TextArea,
} from './AppTextAreaStyled'

class AppTextArea extends React.PureComponent {
	render() {
		return (
			<Container>
				<TextArea
					rows={5}
					placeholder={this.props.placeholder}
				/>
			</Container>
		)
	}
}

export default AppTextArea
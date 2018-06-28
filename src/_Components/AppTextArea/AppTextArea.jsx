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
					{...this.props}
				/>
			</Container>
		)
	}
}

export default AppTextArea
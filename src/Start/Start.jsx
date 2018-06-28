import React from 'react'
import {
	Container,
	Label,
	SubLabel,
	Wrapper
} from './StartStyled'
import AppInput from '../_Components/AppInput/AppInput'
import AppTextArea from '../_Components/AppTextArea/AppTextArea'

class Start extends React.PureComponent {
	render() {
		return (
			<Container>
				<Wrapper>
					<Label>First, let’s get you set up.</Label>
					<SubLabel>Pick a project category to connect with a specific community. You can always update this later.</SubLabel>
					<AppInput/>

					<Label>Describe what you’ll be creating.</Label>
					<SubLabel>And don’t worry, you can edit this later, too.</SubLabel>
					<AppTextArea/>

					<Label>Finally, let’s confirm your eligibility.</Label>
					<SubLabel>Tell us where you’re based and confirm a few other details before we proceed.</SubLabel>
					<AppInput/>
				</Wrapper>
			</Container>
		)
	}
}

export default Start
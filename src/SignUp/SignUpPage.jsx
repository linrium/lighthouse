import React from 'react'

import AppButton from '../_Components/AppButton/AppButton'
import AppInput from '../_Components/AppInput/AppInput'
import AppTextArea from '../_Components/AppTextArea/AppTextArea'
import {
	FormFooter,
	Status
} from '../Start/StartStyled'
import {
	Container,
	DropZone,
	Label,
	Wrapper
} from './SignUpStyled'

class SignUpPage extends React.PureComponent {

	render() {
		const {
			username,
			email,
			address,
			biography,
			imagePreviewUrl,

			onChangeText,
			onCreate
		} = this.props

		return (
			<Container>
				<Wrapper>
					<Label>Username</Label>
					<AppInput
						placeholder="Ex: Linh The Human"
						value={username}
						onChange={onChangeText('username')}
					/>

					<Label>Email</Label>
					<AppInput
						placeholder="Ex: linrium@gmail.com"
						value={email}
						onChange={onChangeText('email')}
					/>

					<Label>Address</Label>
					<AppInput
						placeholder="Ex: 20"
						value={address}
						onChange={onChangeText('address')}
					/>

					<Label>Biography</Label>
					<AppTextArea
						placeholder="Ex: Make world is a better place"
						value={biography}
						onChange={onChangeText('biography')}
					/>

					<Label>Avatar</Label>
					<DropZone
						multiple={false}
						onDrop={this.props.captureFile}
					>
						{
							imagePreviewUrl ?
								<img src={this.props.imagePreviewUrl} alt="thumbnail" width="100%"/> :
								<p>Try dropping some files here, or click to select files to upload.</p>
						}
					</DropZone>

					<FormFooter>
						<Status error={this.props.error}>
							{this.props.status}
						</Status>
						<AppButton
							value="Create"
							onClick={onCreate}
							loading={this.props.loading}
						/>
					</FormFooter>
				</Wrapper>
			</Container>
		)
	}
}

export default SignUpPage
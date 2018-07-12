import React from 'react'


import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import AppButton from '../_Components/AppButton/AppButton'
import AppInput from '../_Components/AppInput/AppInput'
import AppSelect from '../_Components/AppSelect/AppSelect'
import AppTextArea from '../_Components/AppTextArea/AppTextArea'
import './react-dates.css'
import {
	Container,
	DropZone,
	FormFooter,
	Label,
	Status,
	SubLabel,
	Wrapper
} from './StartStyled'


class StartPage extends React.PureComponent {

	render() {
		const {
			title,
			description,
			fundingGoalInEthers,
			durationInMinutes,
			imagePreviewUrl,

			onChangeText,
			onCreate
		} = this.props

		return (
			<Container>
				<Wrapper>
					{/*<Label>First, let’s get you set up.</Label>*/}
					{/*<SubLabel>Pick a project category to connect with a specific community. You can always update this*/}
					{/*later.</SubLabel>*/}
					{/*<AppSelect data={this.props.categories}/>*/}

					<Label>Enter your project name</Label>
					{/*<SubLabel>Be careful!!! You can't change it after create.</SubLabel>*/}
					<AppInput
						placeholder="Ex: Hello world"
						value={title}
						onChange={onChangeText('title')}
					/>

					<Label>Describe what you’ll be creating.</Label>
					{/*<SubLabel>You can't also edit this later, too.</SubLabel>*/}
					<AppTextArea
						placeholder="Ex: Make world is a better place"
						value={description}
						onChange={onChangeText('description')}
					/>

					<Label>How many ETH you want to raise?</Label>
					{/*<SubLabel>Be careful !!! You can't change it after create.</SubLabel>*/}
					<AppInput
						placeholder="Ex: 20"
						value={fundingGoalInEthers}
						onChange={onChangeText('fundingGoalInEthers')}
					/>

					<Label>When is the project end?</Label>
					{/*<SubLabel>Be careful !!! You can't change it after create.</SubLabel>*/}
					<AppInput
						placeholder="Ex: 20"
						value={durationInMinutes}
						onChange={onChangeText('durationInMinutes')}
					/>

					{/*<Label>When is the project end?</Label>*/}
					{/*<DateRangePicker*/}
						{/*startDate={this.props.startDate} // momentPropTypes.momentObj or null,*/}
						{/*startDateId="startDate" // PropTypes.string.isRequired,*/}
						{/*endDate={this.props.endDate} // momentPropTypes.momentObj or null,*/}
						{/*endDateId="endDate" // PropTypes.string.isRequired,*/}
						{/*onDatesChange={this.props.onDatesChange} // PropTypes.func.isRequired,*/}
						{/*focusedInput={this.props.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,*/}
						{/*onFocusChange={this.props.onFocusChange} // PropTypes.func.isRequired,*/}
					{/*/>*/}

					<Label>Add thumbnail</Label>
					{/*<SubLabel>Be careful !!! You can't change it after create.</SubLabel>*/}
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

					{/*<Label>Where are your country?</Label>*/}
					{/*<SubLabel>You can't also edit this later, too.</SubLabel>*/}
					{/*<AppSelect data={countries} idKey="code" valueKey="name"/>*/}

					<FormFooter>
						<Status>
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

export default StartPage
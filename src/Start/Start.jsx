import React from 'react'
import {
	DateRangePicker,
	SingleDatePicker,
	DayPickerRangeController
} from 'react-dates'
import {
	Container,
	Label,
	SubLabel,
	Wrapper
} from './StartStyled'
import AppInput from '../_Components/AppInput/AppInput'
import AppTextArea from '../_Components/AppTextArea/AppTextArea'
import AppSelect from '../_Components/AppSelect/AppSelect'
import AppButton from '../_Components/AppButton/AppButton'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './react-dates.css'

class Start extends React.PureComponent {
	state = {
		categories: [
			{id: 'art', value: 'Art'},
			{id: 'comics', value: 'Comics'},
			{id: 'crafts', value: 'Crafts'},
			{id: 'dance', value: 'Dance'},
			{id: 'design', value: 'Design'},
			{id: 'fashion', value: 'Fashion'},
		]
	}

	render() {
		const {
			categories
		} = this.state

		return (
			<Container>
				<Wrapper>
					<Label>First, let’s get you set up.</Label>
					<SubLabel>Pick a project category to connect with a specific community. You can always update this
						later.</SubLabel>
					<AppSelect data={categories}/>

					<Label>Enter your project name</Label>
					<SubLabel>Be careful!!! You can't change it after create.</SubLabel>
					<AppInput placeholder="Ex: Hello world"/>

					<Label>How many ETH you want to raise?</Label>
					<SubLabel>Be careful !!! You can't change it after create.</SubLabel>
					<AppInput placeholder="Ex: Make world is a better place"/>

					<Label>When is the project end?</Label>
					<SubLabel>Be careful !!! You can't change it after create.</SubLabel>
					<DateRangePicker
						startDate={this.state.startDate} // momentPropTypes.momentObj or null,
						startDateId="startDate" // PropTypes.string.isRequired,
						endDate={this.state.endDate} // momentPropTypes.momentObj or null,
						endDateId="endDate" // PropTypes.string.isRequired,
						onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
						focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
						onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
					/>

					<Label>Describe what you’ll be creating.</Label>
					<SubLabel>You can't also edit this later, too.</SubLabel>
					<AppTextArea/>

					<div style={{
						display: 'flex',
						justifyContent: 'flex-end',
						width: '100%'
					}}>
						<AppButton value="Create"/>
					</div>
				</Wrapper>
			</Container>
		)
	}
}

export default Start
import React from 'react'
import { DateRangePicker } from 'react-dates'
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
import countries from './countries'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './react-dates.css'

class StartPage extends React.PureComponent {

	render() {
		const {
			categories,
			title,
			description,
			fundingGoalInEthers,
			durationInMinutes,

			onChangeText,
			onCreate
		} = this.props

		return (
			<Container>
				<Wrapper>
					<Label>First, let’s get you set up.</Label>
					<SubLabel>Pick a project category to connect with a specific community. You can always update this
						later.</SubLabel>
					<AppSelect data={categories}/>

					<Label>Enter your project name</Label>
					<SubLabel>Be careful!!! You can't change it after create.</SubLabel>
					<AppInput
						placeholder="Ex: Hello world"
						value={title}
						onChange={onChangeText('title')}
					/>

					<Label>Describe what you’ll be creating.</Label>
					<SubLabel>You can't also edit this later, too.</SubLabel>
					<AppTextArea
						placeholder="Ex: Make world is a better place"
						value={description}
						onChange={onChangeText('description')}
					/>

					<Label>How many ETH you want to raise?</Label>
					<SubLabel>Be careful !!! You can't change it after create.</SubLabel>
					<AppInput
						placeholder="Ex: 20"
						value={fundingGoalInEthers}
						onChange={onChangeText('fundingGoalInEthers')}
					/>

					<Label>When is the project end?</Label>
					<SubLabel>Be careful !!! You can't change it after create.</SubLabel>
					<AppInput
						placeholder="Ex: 20"
						value={durationInMinutes}
						onChange={onChangeText('durationInMinutes')}
					/>

					{/*<Label>When is the project end?</Label>*/}
					{/*<SubLabel>Be careful !!! You can't change it after create.</SubLabel>*/}
					{/*<DateRangePicker*/}
					{/*startDate={this.state.startDate} // momentPropTypes.momentObj or null,*/}
					{/*startDateId="startDate" // PropTypes.string.isRequired,*/}
					{/*endDate={this.state.endDate} // momentPropTypes.momentObj or null,*/}
					{/*endDateId="endDate" // PropTypes.string.isRequired,*/}
					{/*onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,*/}
					{/*focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,*/}
					{/*onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,*/}
					{/*/>*/}

					{/*<Label>Where are your country?</Label>*/}
					{/*<SubLabel>You can't also edit this later, too.</SubLabel>*/}
					{/*<AppSelect data={countries} idKey="code" valueKey="name"/>*/}

					<div style={{
						display: 'flex',
						justifyContent: 'flex-end',
						width: '100%'
					}}>
						<AppButton
							value="Create"
							onClick={onCreate}
						/>
					</div>
				</Wrapper>
			</Container>
		)
	}
}

export default StartPage
import React from 'react'
import {
	ByAuthor,
	Category,
	Container,
	Deadline,
	Funded,
	InfoContainer,
	Pledged,
	ProgressBar,
	Thumbnail,
	Title
} from './AppCardStyled'
import { Colors } from '../../_Variables/Colors'

class AppCard extends React.PureComponent {
	render() {
		return (
			<Container>
				<Thumbnail/>
				<InfoContainer>
					<Title>RUNVI - THE WORLD’S MOST ADVANCED DIGITAL RUNNING COACH</Title>
					<ByAuthor>by <span>Linh The Human</span></ByAuthor>
					<ProgressBar>
						<ProgressBar width={60} bgColor={Colors.accent}/>
					</ProgressBar>
					<Pledged>3,600 pledged</Pledged>
					<Funded>24% funded</Funded>
					<Deadline>35 days to go</Deadline>
					<Category>Wearables</Category>
				</InfoContainer>
			</Container>
		)
	}
}

export default AppCard
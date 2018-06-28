import React from 'react'
import {
	Container,
	Description,
	GroupText,
	InfoContainer,
	Label,
	Text,
	TextPrimary,
	Thumbnail,
	Title,
	Wrapper
} from './ProjectStyled'
import { Colors } from '../_Variables/Colors'
import { ProgressBar } from '../_Components/AppCard/AppCardStyled'
import AppButton from '../_Components/AppButton/AppButton'

class ProjectPage extends React.PureComponent {
	render() {
		return (
			<Container>
				<Wrapper>
					<Title>RUNVI - THE WORLD’S MOST ADVANCED DIGITAL RUNNING COACH</Title>
					<Thumbnail/>
					<InfoContainer>
						<div style={{flex: 1}}>
							<Label>About</Label>
							<Description>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam architecto asperiores
								assumenda autem blanditiis commodi dolorem enim eum illo, labore maiores molestiae mollitia odit
								praesentium quo quos, tempora voluptatibus.</Description>

							<Label marginTop={50}>Backers</Label>
							<h1>Hello</h1>
						</div>
						<div style={{
							flex: 0.7,
							marginLeft: 32
						}}>
							<ProgressBar>
								<ProgressBar width={60} bgColor={Colors.accent}/>
							</ProgressBar>
							<GroupText>
								<TextPrimary>ETH 3,600</TextPrimary>
								<Text>pledged of ETH 655 goal</Text>
							</GroupText>

							<GroupText>
								<TextPrimary>24%</TextPrimary>
								<Text>funded</Text>
							</GroupText>

							<GroupText>
								<TextPrimary>300</TextPrimary>
								<Text>backers</Text>
							</GroupText>

							<GroupText>
								<TextPrimary>35</TextPrimary>
								<Text>days to go</Text>
							</GroupText>

							<AppButton
								value="Back this project"
								textAlign="center"
							/>
						</div>
					</InfoContainer>
				</Wrapper>
			</Container>
		)
	}
}

export default ProjectPage
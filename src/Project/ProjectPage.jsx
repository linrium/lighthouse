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
	static defaultProps = {
		amountRaised: 0,
		LogCrowdSaleCreatedByAddr: {
			args: {
				fundingGoalInEthers: 0
			}
		}
	}

	get getPledgedPercent() {
		const {fundingGoalInEthers} = this.props.LogCrowdSaleCreatedByAddr.args
		if (fundingGoalInEthers === 0) return 0

		return (this.props.amountRaised / fundingGoalInEthers) * 100
	}


	render() {
		const {
			creator,
			title,
			description,
			fundingGoalInEthers,
			durationInMinutes,
			thumbnailHash
		} = this.props.LogCrowdSaleCreatedByAddr.args
		return (
			<Container>
				<Wrapper>
					<Title>{title}</Title>
					{
						thumbnailHash &&
						<Thumbnail value={`https://ipfs.io/ipfs/${thumbnailHash}`}/>
					}
					<InfoContainer>
						<div style={{flex: 1}}>
							<Label>About</Label>
							<Description>{description}</Description>

							<Label marginTop={50}>Backers</Label>
							<h1>Hello</h1>
						</div>
						<div style={{
							flex: 0.7,
							marginLeft: 32
						}}>
							<ProgressBar>
								<ProgressBar style={{width: this.getPledgedPercent}} bgColor={Colors.accent}/>
							</ProgressBar>
							<GroupText>
								<TextPrimary>ETH {this.props.amountRaised}</TextPrimary>
								<Text>pledged of ETH {fundingGoalInEthers ? fundingGoalInEthers.toNumber() : 0} goal</Text>
							</GroupText>

							<GroupText>
								<TextPrimary>{this.getPledgedPercent}%</TextPrimary>
								<Text>funded</Text>
							</GroupText>

							<GroupText>
								<TextPrimary>300</TextPrimary>
								<Text>backers</Text>
							</GroupText>

							<GroupText>
								<TextPrimary>{this.props.deadline}</TextPrimary>
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
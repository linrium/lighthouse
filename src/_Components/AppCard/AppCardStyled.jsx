import styled from 'styled-components'
import { Colors } from '../../_Variables/Colors'
import { Link } from 'react-router-dom'
import { Images } from '../../_Variables/Images'

export const Container = styled(Link)`
	display: block;
	width: 400px;
	//height: 500px;
	border: 1px solid ${Colors.primary};
	font-weight: 300;
	cursor: pointer;
	text-decoration: none;
	color: ${Colors.primary};
`

export const Thumbnail = styled.div`
	background: url("${Images.thumbnail1}") no-repeat center center;
	background-size: 100%;
	width: 100%;
	height: 300px;
`

export const InfoContainer = styled.div`
	padding: 16px;
`

export const Title = styled.h2`
	font-size: 18px;
	margin-bottom: 8px;
	line-height: 25px;
	&:hover {
		color: ${Colors.accent}
	}
`

export const ByAuthor = styled.h3`
	margin: 16px 0 32px;

	span {
		font-weight: 400;
			&:hover {
			color: ${Colors.accent}
		}
	}
	
`

export const ProgressBar = styled.div`
	margin-bottom: 8px;
	width: ${props => props.width || 100}%;
	height: 5px;
	background: ${props => props.bgColor || Colors.primary};
`

export const Pledged = styled.h4`
	margin: 16px 0;
	color: ${Colors.accent};
	&:before {
		content: "ETH ";
	}
`

export const Funded = styled.h4`
	margin: 16px 0;
`

export const Deadline = styled.h4`
	margin: 16px 0;
`

export const Category = styled.h4`
	text-decoration: underline;
	&:hover {
		color: ${Colors.accent}
	}
`
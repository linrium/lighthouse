import styled from 'styled-components'
import { Colors } from '../../_Variables/Colors'

export const Container = styled.div`
	padding: 16px;
	margin: 16px 0;
	color: ${Colors.secondary};
	background: ${Colors.accent};
	cursor: pointer;
	text-align: ${props => props.textAlign || 'left'};
	
	&:hover {
		background: ${Colors.primary};
	}
`
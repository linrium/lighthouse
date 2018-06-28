import styled from 'styled-components'
import { Colors } from '../../_Variables/Colors'

export const Container = styled.div`
	margin: 16px 0;
	width: 600px;
`

export const Input = styled.input`
	padding: 16px;
	display: block;
	font-size: 16px;
	border: 1px solid ${Colors.primary};
	width: 100%;
	box-sizing: border-box;
	
	&:focus {
		border-color: ${Colors.accent};
	}
`

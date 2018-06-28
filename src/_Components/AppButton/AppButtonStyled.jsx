import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../_Variables/Colors'

export const Container = styled.div`
	padding: 16px;
	margin: 16px 0;
	color: ${Colors.secondary};
	background: ${Colors.accent};
	cursor: pointer;
	
	&:hover {
		background: ${Colors.primary};
	}
`
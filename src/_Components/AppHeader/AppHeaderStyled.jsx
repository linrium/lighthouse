import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../_Variables/Colors'

export const Container = styled.div`
	background: white;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	color: ${Colors.primary};
	display: flex;
	font-weight: 300;
	border-bottom: 1px solid ${Colors.primary};
`

export const Logo = styled.h1`
	padding: 16px;
	display: block;
`

export const MenuItem = styled.h1`
	padding: 16px;
	cursor: pointer;
	&:hover {
		color: ${Colors.secondary};
		background: ${Colors.accent};
	}
`

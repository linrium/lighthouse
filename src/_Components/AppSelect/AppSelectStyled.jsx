import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../_Variables/Colors'

export const Container = styled.div`
	margin: 16px 0;
	width: 600px;
	position: relative;
`

export const Input = styled.input`
	display: block;
	border: 1px solid ${Colors.primary};
	width: 100%;
	padding: 16px;
	font-size: 16px;
	cursor: pointer;
	box-sizing: border-box;
	
	&:focus {
		border-color: ${Colors.accent};
	}
`

export const List = styled.ul`
	border: 1px solid ${Colors.primary};
	position: absolute;
	background: ${Colors.secondary};
	top: 68px;
	left: 0;
	right: 0;
	max-height: 240px;
	overflow-y: scroll;
`

export const ListItem = styled.ul`
	padding: 16px;
	cursor: pointer;
	&:hover {
		background: ${Colors.accent};
		color: ${Colors.secondary}
	}
`

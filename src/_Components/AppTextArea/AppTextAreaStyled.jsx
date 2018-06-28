import React from 'react'
import styled from 'styled-components'
import TextareaAutosize from 'react-autosize-textarea'
import { Colors } from '../../_Variables/Colors'

export const Container = styled.div`
	margin: 16px 0;
	width: 600px;
`

export const TextArea = styled(TextareaAutosize)`
	padding: 16px;
	display: block;
	font-size: 16px;
	border: 1px solid ${Colors.primary};
	width: 100%;
	resize: none;
	
	&:focus {
		border-color: ${Colors.accent};
	}
`

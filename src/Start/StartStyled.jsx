import React from 'react'
import styled from 'styled-components'
import { Colors } from '../_Variables/Colors'

export const Container = styled.div`
	//background: url("assets/thumbnail.jpeg") no-repeat fixed center center;
	width: 100%;
	display: flex;
  justify-content: center;
`

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 40px 0;
  margin-top: 49px;
  max-width: 600px;
`

export const Label = styled.span`
	font-size: 26px;
	line-height: 26px;
	color: ${Colors.primary};
	margin-top: 32px;
`

export const SubLabel = styled.span`
	font-size: 18px;
	line-height: 25px;
	color: ${Colors.primary};
	margin-top: 16px;
	font-weight: 300;
`
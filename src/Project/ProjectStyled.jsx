import React from 'react'
import styled from 'styled-components'
import { Images } from '../_Variables/Images'
import { Colors } from '../_Variables/Colors'

export const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`

export const Wrapper = styled.div`
	width: 1024px;
	margin-top: 49px;
	padding: 40px 0;
`

export const Thumbnail = styled.div`
	background: url("${Images.thumbnail1}") no-repeat center center;
	background-size: 100%;
	width: 100%;
	height: 500px;
`

export const Title = styled.h2`
	font-size: 32px;
	line-height: 25px;
	margin: 20px 0;
	&:hover {
		color: ${Colors.accent}
	}
`

export const Description = styled.p`
	font-weight: 300;
	line-height: 25px;
`

export const Label = styled.h3`
	font-size: 20px;
	margin-bottom: 16px;
	margin-top: ${props => props.marginTop || 0}px;
`

export const InfoContainer = styled.div`
	margin: 20px 0;
	display: flex;
	justify-content: space-between;
`

export const TextPrimary = styled.h4`
	font-size: 25px;
`

export const Text = styled.h4`
	font-size: 18px;
	font-weight: 300;
`

export const GroupText = styled.div`
	margin: 16px 0;
	line-height: 30px;
`
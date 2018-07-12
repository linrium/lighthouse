import styled from 'styled-components'
import { Colors } from '../../_Variables/Colors'
import { Link } from 'react-router-dom'

export const Container = styled.div`
	background: linear-gradient(to left,#26eae0,#0ed2f7);
	box-shadow: 0px 2px 6px 0px #8e858540;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	color: ${Colors.secondary};
	display: flex;
	font-weight: 300;
	z-index: 1000;
	height: 50px;
  align-items: center;
`

export const Logo = styled.h1`
	padding: 16px;
	display: block;
	text-transform: uppercase;
`

export const MenuItem = styled(Link)`
	display: ${props => props.show || 'flex'};
	padding: 0 16px;
	cursor: pointer;
	color: ${Colors.secondary};
	text-decoration: none;
	align-items: center;
	height: 100%;
	&:hover {
		color: ${Colors.secondary};
		background: ${Colors.accent};
	}
`

export const Avatar = styled.div`
	background: url("${props => props.bgImage}") no-repeat center center;
	background-size: cover;
	height: 35px;
  width: 35px;
  margin: 0 16px;
  border-radius: 50%;
}
`
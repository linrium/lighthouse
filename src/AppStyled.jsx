import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const BackgroundImage = styled.div`
	background: url("https://images.unsplash.com/photo-1531259769599-1a298417f81d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=20e8073751f2d194c4fad5d0ab907861&auto=format&fit=crop&w=2468&q=80");
	background-size: cover;
	filter: alpha(opacity=50);
	opacity: 0.5;
	position: fixed;
  top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: -1;
`
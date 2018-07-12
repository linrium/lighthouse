import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Colors } from '../_Variables/Colors'
import Dropzone from 'react-dropzone'

export const Container = styled.div`
	//background: url("assets/thumbnail.jpeg") no-repeat fixed center center;
	width: 100%;
	display: flex;
  justify-content: center;
  flex-direction: row;
`

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 40px;
  max-width: 600px;
  margin: 100px 0;
  background: white;
`

export const Label = styled.span`
	font-size: 26px;
	line-height: 26px;
	color: ${Colors.primary};
	margin-top: 32px;
`

export const DropZone = styled(Dropzone)`
    position: relative;
    width: 100%;
    height: 200px;
    border: 1px dashed ${Colors.primary};
    border-radius: 0;
    margin: 16px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
`


export const MenuItem = styled(Link)`
	padding: 16px;
	cursor: pointer;
	color: ${Colors.primary};
	text-decoration: none;
	align-items: center;
	width: 100%;
	&:hover {
		color: ${Colors.secondary};
		background: ${Colors.accent};
	}
`
import styled from 'styled-components'
import { Colors } from '../_Variables/Colors'
import Dropzone from 'react-dropzone'

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
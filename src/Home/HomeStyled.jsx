import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
	//background: url("assets/thumbnail.jpeg") no-repeat fixed center center;
	height: 100vh;
	width: 100%;
	//background-size: 100%;
`

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const ListCards = styled.div`
	padding: 40px 0;
	display: grid;
  /* Display as a Grid */
  grid-template-columns: repeat(3, minmax(400px, 400px));
  /* repeat = as many times as you can fit */
  /* auto-fit = fit as many items on the line as possible, go bigger if you need to */
  /*minmax = (min size, max size) = the minimum size the column should be is 200px, but if there's space then give them all 1fr of that width. */
  grid-gap: 32px;
  margin-top: 49px;
`
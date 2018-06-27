import {
	AppContext
} from '../App'
import React from 'react'

export const withContext = (data) => (WrappedComponent) => {
	return class extends React.Component {
		createPropsFromArray = (context) => {
			if(data.length === 0) return context

			return data.reduce((acc, key) => {
				acc[key] = context[key]
				return acc
			}, {})
		}

		createProps = (context) => {
			if(Array.isArray(data)) {
				return this.createPropsFromArray(context)
			}

			if(typeof data === 'function') {
				return data(context)
			}
		}

		render() {
			return (
				<AppContext.Consumer>
					{
						(context) => {
							return (
								<WrappedComponent
									{...this.createProps(context)}
									{...this.props}
								/>
							)
						}
					}
				</AppContext.Consumer>
			)
		}
	}
}
import React from 'react'
import ClickOutside from 'react-click-outside'
import {
	Container,
	Input,
	List,
	ListItem,
} from './AppSelectStyled'

class AppSelect extends React.PureComponent {
	static defaultProps = {
		data: [],
		idKey: 'id',
		valueKey: 'value',
		setValueSuccess: () => {}
	}

	state = {
		open: false,
		item: null
	}

	onSetValue = (item) => {
		this.setState({
			item,
			open: false
		})

		this.props.setValueSuccess(item)
	}

	render() {
		const {
			open,
			item
		} = this.state
		const {
			idKey,
			valueKey
		} = this.props
		return (
			<ClickOutside onClickOutside={() => this.setState({open: false})}>
				<Container>
					<Input
						value={item ? item[valueKey] : ''}
						onClick={() => this.setState({open: !open})}
					/>
					{
						open &&
						<List>
							{
								this.props.data
									.map(item => (
										<ListItem key={item[idKey]} onClick={() => this.onSetValue(item)}>{item[valueKey]}</ListItem>
									))
							}
						</List>
					}
				</Container>
			</ClickOutside>
		)
	}
}

export default AppSelect
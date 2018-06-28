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
		setValueSuccess: () => {}
	}

	state = {
		open: false,
		item: ''
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
		return (
			<ClickOutside onClickOutside={() => this.setState({open: false})}>
				<Container>
					<Input
						value={item.value}
						onClick={() => this.setState({open: !open})}
					/>
					{
						open &&
						<List>
							{
								this.props.data
									.map(item => (
										<ListItem key={item.id} onClick={() => this.onSetValue(item)}>{item.value}</ListItem>
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
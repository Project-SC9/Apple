import React, { Component } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import styles from './index.css';

/**
 * 全局的布局
 */
class Index extends Component {

	render() {
		const { children } = this.props;
		return (
			<div> {children} </div>
		)
	}
	componentDidMount() {
		document.title = 'Apple'
	}



}

const mapStateToProps = (state) => {
	return {
		state,
	}
}

export default withRouter(connect(mapStateToProps)(Index));

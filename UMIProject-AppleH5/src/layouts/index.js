import React, { Component } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import styles from './index.css';
import { Spin } from 'antd';

/**
 * 全局的布局
 */
class Index extends Component {
	_reduxPersistor = null;

	componentDidMount() {
	}

	componentWillMount() {
		document.title = 'juuuce.com'
		this._reduxPersistor = persistStore(window.g_app._store);
		console.log(this._reduxPersistor)
		window._reduxPersistor = this._reduxPersistor;
	}

	render() {
		const { children } = this.props;
		return (

			<PersistGate loading={null} persistor={this._reduxPersistor}>

				{children}
			</PersistGate>
		)
	}




}

const mapStateToProps = (state) => {
	return {
		state,
	}
}

export default withRouter(connect(mapStateToProps)(Index));

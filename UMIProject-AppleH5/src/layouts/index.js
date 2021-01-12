import React, { Component } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import styles from './index.css';
import { Spin } from 'antd';
import router from 'umi/router';
/**
 * 全局的布局
 */
class Index extends Component {
	_reduxPersistor = null;

	componentWillMount() {
		document.title = 'juuuce.com'
		console.log("document", document)
		document.icon = 'https://i.loli.net/2020/12/13/M5aVNmzFvjYgLBA.png'
		this._reduxPersistor = persistStore(window.g_app._store);
		window._reduxPersistor = this._reduxPersistor;
		window.addEventListener('beforeunload', this.beforeunload);
	}

	render() {
		const { children, isLoading } = this.props;
		return (

			<PersistGate loading={null} persistor={this._reduxPersistor}>
				<Spin spinning={isLoading} size="large" tip="加载中..." delay={5}>
					{children}
				</Spin>
			</PersistGate>
		)
	}
	componentDidMount() {
		const { dispatch, taskNumber } = this.props
		window.setInterval(() => {
			localStorage.clear();
		}, 172800000)

		setInterval(() => {
			dispatch({ type: "player/taskNumberUpdate" })
		}, 10000)

		if (this.props.location.pathname == '/') {
			if (window.screen.width < 450) {
				router.push('/juuuce/main');
			}
		}
	}
}

const mapStateToProps = (state) => {
	let isLoading = state.loading.global;
	if (state.loading.effects['player/fetchLogSave']) {
		isLoading = false;
	}
	return {
		isLoading,
	}
}

export default withRouter(connect(mapStateToProps)(Index));

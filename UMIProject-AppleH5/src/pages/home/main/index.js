import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './index.css';
/**
 * 首页
 */
class Index extends Component {
  state = {
  };
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.main_content}>

        </div>
      </div>
    )
  }
}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  return {
    state
  };
}

export default connect(mapStateToProps)(Index);

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import styles from './_layout.css';

/**
 * main布局
 */
class Index extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.wrapper}>
        {children}
      </div>
    );
  }

}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  return {
    state
  }
}

export default withRouter(connect(mapStateToProps)(Index));

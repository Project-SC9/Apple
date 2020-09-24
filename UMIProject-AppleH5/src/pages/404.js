import React, { PureComponent } from 'react';
import { connect } from 'dva';

// import styles from './index.css';

/**
 * main布局
 */
class Index extends PureComponent {

  render() {
    return (
      <div>404</div>
    );
  }

  componentDidMount() {
    // <script>window.routerBase = window.location.pathname.split("/")[1];</script>
  }

}

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

export default connect(mapStateToProps)(Index);

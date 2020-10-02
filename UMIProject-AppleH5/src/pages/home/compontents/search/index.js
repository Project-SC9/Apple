import React, { PureComponent } from 'react';
import styles from './index.css';
import { SearchBar } from 'antd-mobile';
/**
 * 搜索栏
 */
export class Index extends PureComponent {
    render() {
        return (
            <div className={styles.footer}>
                <div className={styles.search}>
                    <SearchBar
                        placeholder="聊下状态，再看吃的"
                        onChange={this.searchChangedHandler}
                        onSubmit={this.searchSubmitHandler}
                        showCancelButton={false}
                    />
                    <img src="https://i.loli.net/2020/09/25/jGL2kAgpcqw3dsS.png" />
                </div>
            </div>
        )
    }
    /**
     * 搜索框字段改变事件
     */
    searchChangedHandler = (val) => {
        const { onSearchChange } = this.props;
        !!onSearchChange & onSearchChange(val)
    }

    /**
     * 搜索框字段提交事件
     */
    searchSubmitHandler = (val) => {
        const { onSearchSubmit } = this.props;
        !!onSearchSubmit && onSearchSubmit(val)
    }
}

export default Index

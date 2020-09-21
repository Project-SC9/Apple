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
                        placeholder="Search.."
                        onSubmit={value => console.log(value, 'onSubmit')}
                        onClear={value => console.log(value, 'onClear')}
                        onFocus={() => console.log('onFocus')}
                        onBlur={() => console.log('onBlur')}
                        onCancel={() => console.log('onCancel')}
                        onChange={this.searchChangedHandler}
                        showCancelButton={false}
                    />
                </div>
            </div>
        )
    }
    /**
     * 搜索框字段改变事件
     */
    searchChangedHandler = () => {

    }
}

export default Index

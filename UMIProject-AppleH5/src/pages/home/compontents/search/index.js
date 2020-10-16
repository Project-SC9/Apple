import React, { PureComponent } from 'react';
import styles from './index.css';
import { SearchBar } from 'antd-mobile';
/**
 * 搜索栏
 */
export class Index extends PureComponent {
    state = {
        searchValue: ''
    }
    render() {
        return (
            <div className={styles.footer} >
                <div className={styles.search}>
                    <SearchBar
                        id="search"
                        ref={component => this.searchBarRef = component}
                        placeholder="聊下状态，再看吃的"
                        onChange={this.searchChangedHandler}
                        onSubmit={this.searchSubmitHandler}
                        onFocus={this.searchFocusHandler}
                        showCancelButton={false}
                    />
                    <img src={require('assets/image/chatbot.png')} onClick={this.searchClickedHandler} />
                </div>
            </div>
        )
    }

    searchFocusHandler = () => {
        const focus = document.documentElement.getElementsByClassName(styles.footer)
        // focus[0].style.bottom = '10%'
        // console.log(focus)
        // var focus = document.getElementById("search");
        // console.log()
        focus[0].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        window.addEventListener("resize", function () {
            // 解决键盘弹起后遮挡输入框的问题
            if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
    /**
     * 搜索框字段改变事件
     */
    searchChangedHandler = (val) => {
        this.state.searchValue = val
    }

    /**
     * 搜索框字段提交事件
     */
    searchSubmitHandler = (val) => {
        const { onSearchSubmit } = this.props;
        !!onSearchSubmit && onSearchSubmit(val)
        const focus = document.documentElement.getElementsByClassName(styles.footer)

        focus[0].style.bottom = '0'
    }

    searchClickedHandler = () => {
        let val = this.state.searchValue
        // const { onClickSubmit } = this.props;
        // !!onClickSubmit && onClickSubmit(val)
        const { onSearchSubmit } = this.props;
        !!onSearchSubmit && onSearchSubmit(val)
        const focus = document.documentElement.getElementsByClassName(styles.footer)
        focus[0].style.bottom = '0'

    }

    //在组件的did生命周期函数中加入
    componentDidMount() {
        //监听页面尺寸变化
        window.addEventListener("resize", function () {
            // 解决键盘弹起后遮挡输入框的问题
            if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }

            // //解决键盘弹起把固定在底部的按钮顶上去的问题
            // //btnSubmit是按钮区域的的节点id
            // const bottomBtn = document.querySelector("#btnSubmit");
            // if (document.body.scrollHeight < 300) {
            //     this.searchBarRef.style.display = "none";
            // } else {
            //     this.searchBarRef.style.display = "block";
            // }
        })

    }

}

export default Index

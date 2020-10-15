import React, { Component } from 'react'
import Luo from 'iscroll-luo';
export class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 2, 3]
        };
    }

    /** 下拉刷新 **/
    onDown() {
        this.setState({
            data: [1, 2, 3]
        });
        /** 注意此处，就算没有数据或接口调用失败等情况，也要刷一下原始数据，Luo内部才知道状态更新了 **/
    }

    options = {
        backgroundColor: '#f5f5f5',	//# 背景颜色，是滑动底层的背景颜色
        fontColor: 'red', 		//# 文字颜色，是下拉刷新、上拉加载那些文字的颜色
        fontSize: 24,
        beyondHeight: 100,		//# 超过此长度后触发下拉或上拉, 单位px
        pulldownInfo: '下拉刷新',	    // # 下拉刷新的文字
        //pulldownReadyInfo: '松开刷新',	//# 触发下拉刷新的文字
        pulldownReadyInfo: '松开刷新',	//# 触发下拉刷新的文字
        pulldowningInfo: '刷新中…',//	# 正在刷新中的文字
        pullupingInfo: '加载中…',	//# 正在加载中的文字
    }

    render() {
        return (

            < div style={{ position: 'relative', height: '100vh' }}>
                <Luo
                    id='id'
                    onDown={() => this.onDown()}
                    options={this.options}
                >
                    {
                        this.state.data.map((v, i) => <div key={i}>{v}</div>)
                    }
                </Luo>
            </div>
        )
    }
}

// .iscroll - luo - box.sl_scroller.scroller - pullDown, .iscroll - luo - box.sl_scroller.scroller - pullUp {
//     height: 0.3rem;
//     line - height: 0.3rem;
//     font - size: 0.3rem;
//     text - align: center;
//     position: absolute;
//     left: 0px;
//     width: 100 %;
//     overflow: hidden;
// }

// .iscroll - luo - box.sl_scroller.scroller - pullDown {
//     top: -42px;
//     -webkit - user - select: none;
//     user - select: none;
// }

// .iscroll - luo - box.sl_scroller.scroller - pullDown.icon img, .iscroll - luo - box.sl_scroller.scroller - pullUp.icon img {
//     width: 0.3rem;
//     height: auto;
// }

export default test

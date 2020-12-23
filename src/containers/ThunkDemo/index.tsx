import React from 'react';
import { connect } from 'react-redux';
import { startPolling, stopPolling } from '@actions/thunk';

// 间隔一段时间轮询数据列表
// 支持搜索，触发搜索时，重新轮询
// 支持字段排序，排序状况变动，重新轮询
// 支持分页，页面容量修改，分页状况变动，重新轮询
// 组件卸载时，结束轮询

class ThunkDemo extends React.Component<any, any> {
    componentDidMount() {
        // 间隔一段时间轮询数据列表
        this.props.startPolling()
    }

    componentWillUnmount() {
        // 组件卸载时，结束轮询
        this.props.stopPolling()
    }

    render() {
        console.log(this.props.xxx);
        return <div>thunk</div>
    }
}

const mapStateToProps = (state) => ({
    'xxx': state,
});
const mapDispatchToProps = (dispatch) => ({
    startPolling: () => dispatch(startPolling()),
    stopPolling: () => dispatch(stopPolling())
});
export default connect(mapStateToProps, mapDispatchToProps)(ThunkDemo);
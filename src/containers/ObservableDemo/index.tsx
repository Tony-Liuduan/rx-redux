import React from 'react';
import { connect } from 'react-redux';
import { startPolling, stopPolling } from '@/actions/observable';
import ActionPanel from './components/ActionPanel';
import ListTable from './components/ListTable';

class ObservableDemo extends React.Component<any, any> {
    componentDidMount() {
        // 间隔一段时间轮询数据列表
        this.props.startPolling()
    }

    componentWillUnmount() {
        // 组件卸载时，结束轮询
        this.props.stopPolling()
    }

    render() {
        return (
            <>
                <ActionPanel />
                <ListTable />
            </>
        )
    }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
    startPolling: () => dispatch(startPolling()),
    stopPolling: () => dispatch(stopPolling()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ObservableDemo)
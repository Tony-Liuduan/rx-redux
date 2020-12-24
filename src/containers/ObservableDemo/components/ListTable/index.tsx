import React from 'react';
import { connect } from 'react-redux';
import { Table as AntTable, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { changePagination } from '@/actions/observable';

const columns: Array<ColumnProps<any>> = [{
    key: '_rank',
    title: '排名',
    width: 150,
    render: (_text: string, _record, index: number) => index + 1
}, {
    key: 'username',
    dataIndex: 'username',
    title: '用户',
}]

const ListTable: React.FC<any> = (props) => {
    const { dataSource, pagination, loading, changePagination, error } = props;

    if (error) {
        message.error(error);
    }

    return (
        <AntTable
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            onChange={changePagination}
            loading={loading}
            size="small"
            rowKey="id"
            bordered
        />
    )
}

const mapStateToProps = ({ observable }) => ({
    dataSource: observable.list,
    pagination: {
        ...observable.pagination,
    },
    loading: observable.loading,
    error: observable.error,
});
const mapDispatchToProps = (dispatch) => ({
    changePagination: (pagination) => dispatch(changePagination(pagination)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ListTable);

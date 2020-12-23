import React from 'react';
import { connect } from 'react-redux';
import { Table as AntTable, message } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { ColumnProps } from 'antd/lib/table';

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
    const { dataSource, pagination, loading, changePagination, error } = props

    if (error) {
        message.error(error)
    }

    const handleTableChange = (pagination: PaginationProps) => {
        changePagination({
            page: pagination.current,
            pageSize: pagination.pageSize
        })
    }

    return (
        <AntTable
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            onChange={handleTableChange}
            loading={loading}
            size="small"
            rowKey="id"
            bordered
        />
    )
}

const mapStateToProps = ({ thunk }) => ({
    dataSource: thunk.list,
    pagination: {
        total: thunk.pagination.total,
        current: thunk.pagination.page,
        pageSize: thunk.pagination.pageSize
    },
    loading: thunk.isSilentLoading ? false : thunk.loading,
    error: thunk.error
})

const mapDispatchToProps = (dispatch) => ({
    changePagination: (pagination) => {
        // return dispatch(changePagination(pagination))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)

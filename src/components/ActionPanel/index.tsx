import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Select, Input } from 'antd';
import { changeQuery, changeSort } from '@/actions/thunk';

const Option = Select.Option
const Search = Input.Search

const ORDER_LIST = [{
    text: '按 star 数目排序',
    value: 'stars'
}, {
    text: '按 fork 数目排序',
    value: 'forks'
}]

const ActionPanel: React.FC<any> = (props) => {
    const { sort, changeQuery, changeSort } = props
    return (
        <Row
            gutter={20}
            align="middle"
            justify="end"
            style={{ marginBottom: 24 }}
        >
            <Col>
                <Select value={sort} onChange={changeSort} style={{ minWidth: '150px' }} placeholder="请选择">
                    {ORDER_LIST.map((option) => {
                        return <Option key={option.value} value={option.value}>{option.text}</Option>
                    })}
                </Select>
            </Col>
            <Col>
                <Search
                    placeholder="search ..."
                    onSearch={changeQuery}
                    enterButton
                />
            </Col>
        </Row>
    )
}

const mapStateToProps = ({ thunk }) => ({
    sort: thunk.sort,
})

const mapDispatchToProps = (dispatch) => ({
    changeQuery: (query) => dispatch(changeQuery(query)),
    changeSort: (sort) => dispatch(changeSort(sort)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionPanel)

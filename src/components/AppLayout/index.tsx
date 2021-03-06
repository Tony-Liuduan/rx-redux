import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';

const { Content, Footer, Header } = Layout;

export default withRouter(class AppLayout extends React.Component<any, any> {
    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.props.location.pathname]}>
                        <Menu.Item key="/thunk" icon={<PieChartOutlined />}>
                            <Link to='/thunk'>redux-thunk</Link>
                        </Menu.Item>
                        <Menu.Item key="/observable" icon={<DesktopOutlined />}>
                            <Link to='/observable'>redux-observable</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '24px 50px', backgroundColor: '#fff' }}>
                    {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>探索 @redux-observable</Footer>
            </Layout>
        );
    }
});

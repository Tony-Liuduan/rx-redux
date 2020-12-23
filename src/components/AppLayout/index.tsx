import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

export class AppLayout extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    }

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to='/thunk'>redux-thunk</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            rx-redux
                            <Link to='/observable'>redux-observable</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>@rx-observable</Footer>
                </Layout>
            </Layout>
        );
    }
}

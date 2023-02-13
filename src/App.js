import 'antd/dist/reset.css';
import './App.css';
import { ConfigProvider, theme, Layout } from 'antd';
import Chat from './component/Chat';
const { Header, Content, Footer } = Layout;

function App() {
    return (
        <div className="App">
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm
                }}
            >
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div className="site-layout-content">

                            <Chat />

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>monsieurjesaistout ©2023 Created by Ludovic Blondon</Footer>
                </Layout>
            </ConfigProvider>
        </div>
    );
}

export default App;

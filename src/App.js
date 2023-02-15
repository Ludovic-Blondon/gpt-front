import 'antd/dist/reset.css';
import './App.css';
import { ConfigProvider, theme, Layout } from 'antd';
import Chat from './component/Chat';

const { Header, Content, Footer } = Layout;
const year = new Date().getFullYear();

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
                    <Footer style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <strong>monsieurjesaistout</strong> ©{year} Created by Ludovic Blondon <strong>Use ChatGPT</strong>
                    </Footer>
                </Layout>
            </ConfigProvider>
        </div>
    );
}

export default App;

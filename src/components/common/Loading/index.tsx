import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const LoadingIndicator=()=>{
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


    return <Spin indicator={antIcon} />
}

export default LoadingIndicator


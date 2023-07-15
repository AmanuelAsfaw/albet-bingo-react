import { Button,Modal,Tag } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import {CloudUploadOutlined} from "@ant-design/icons";



const UpgradeComponent:FC<{title:string}>=({title})=>{
    const [isModalVisible, setIsModalVisible] = useState(false);



  const handleOk = () => {
    setIsModalVisible(false);
  };





    return(
        <>
        <Button
        type='link'
          onClick={() => setIsModalVisible(true)}
        >
          {title}
        </Button>
        <Modal
          style={{width:'440px',height:'auto'}}
          className="upgrade-modal"
          centered
          visible={isModalVisible}
          onCancel={handleOk}
          footer={[]}
        >
          <CloudUploadOutlined style={{fontSize:'48px',color:'#0033a1',textAlign:'center',display:'block'}}/>
          {/* <div className="text-center my-4">
            <Tag color="#0033a1">ENTERPRISE</Tag><span>FEATURE</span>
          </div> */}
        <h4 className="text-center mt-4">Upgrade to Enterprise</h4>
        <p className="text-center mb-2" style={{color:'#585B72',fontFamily:'Campton-Book'}}>Please upgrade to Enterprise to Import files</p>
            <Button
              className="d-flex mx-auto w-50 justify-content-around mt-5"
              type="primary"        
              href="https://condigital.io"            
            >
              Upgrade
            </Button>
        </Modal>
      </>
    )

}

/**
 * Map State to Props
 *
 * @param state
 */
 const mapStateToProps = (state: any) => ({
   
  });
  
  /**
   * Map Dispatch to Props
   *
   * @param dispatch
   */
  const mapDispatchToProps = (dispatch: any) => ({
   
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpgradeComponent)
import { useState } from "react";
import Logo from "../../Images/logogreen-icon.png";
import { getRoute, login } from "./util/Login.util";
import {
  ErrorHandler,
  initAxios,
  saveUserData,
} from "../../utilities/utilities";
import { useNavigate } from "react-router-dom";

import AboutComponent from "./components/About/About.component";
import TermComponent from "./components/Terms/Tems.component";
import Password from "antd/lib/input/Password";
import { Alert, Button, Card, Form, Input, Row } from "antd";

const LoginComponent = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generate_access_tokens = (role: string) =>{
    if(role == 'Casher'){
      return ['/ticketing','/keno-bills','/keno-game']
    }
    else if (role == 'Agent'){
      return ['/keno-bills', '/keno-report','/keno-game']
    }
    return []
  }

  const onFinish = (values: any) => {
    setError("");
    setLoading(true);
    login(values)
      .then((res) => {
        console.log(res);
        if(res?.data && res.data.status){
          const user = {
            id: res.data.user_id,
            full_name: res.data.username,
            email: res.data.email,
            phone_number: "09123",
            company: {
              id: 0,
              name: "AL-Bet",
              type: "string",
              category: "string",
              address: "string",
              country: "string",
            },
            chat_id: "0323",
            signature: null,
            access_type: generate_access_tokens(res.data.role.toString()),
            last_seen: false,
            role: res.data.role,
            is_super_user: false,
            status: "Active",
            token: res.data.refresh,
          }
          initAxios(res.data.refresh)
          setLoading(false);
          saveUserData(user);
          navigate(getRoute(user));
        }
        
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);

        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else if (error.response?.status) {
          setError("Invalid username or password");
        } else {
          setError("Oops, seems server is down, try again in a moment!");
        }
      });
  };

  return (
    <div className="login-wrapper">
      <div>
        <div className="mb-2 mx-auto">
          {error && <Alert message={error} type="error" closable />}
        </div>
        <Card
          style={{ width: "400px", height: "auto" }}
          // actions={[<AboutComponent />, <TermComponent />]}
        >
          <img
            src={Logo}
            alt="logo"
            className="LoginLogo mx-auto d-block pb-4"
          />
          <Form name="basic" layout={"vertical"} onFinish={onFinish}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password",
                },
              ]}
            >
              <Password />
            </Form.Item>
            <Button
              htmlType="submit"
              className="mt-4"
              type="primary"
              block
              loading={loading}
            >
              Sign In
            </Button>
          </Form>
        </Card>
        <Row className="mx-auto mt-3">
          <h5 className="text-center col-lg primary small">AL-Betting, Inc.</h5>
        </Row>
      </div>
    </div>
  );
};
export default LoginComponent;

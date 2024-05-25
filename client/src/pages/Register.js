import React, { useState } from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import zxcvbn from "zxcvbn";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import '../resourses/auth.css';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
  
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/register", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onPasswordChange = (e) => {
    const value = e.target.value;
    const strength = zxcvbn(value).score;
    setPasswordStrength(strength);
  };

  const renderPasswordStrength = () => {
    const strengthClasses = ["weak", "fair", "good", "strong", "very-strong"];
    return (
      <div className={`password-strength ${strengthClasses[passwordStrength]}`}>
        <div className="strength-bar" style={{ width: `${(passwordStrength + 1) * 20}%` }}></div>
      </div>
    );
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <div className="w-400 card p-3">
        <h1 className="text-lg">BookmyBus - Register</h1>
        <hr />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters long!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!'
              }
            ]}
          >
            <input type="password" onChange={onPasswordChange} />
            
          </Form.Item>
          {renderPasswordStrength()}
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/login">Click Here To Login</Link>
            <button className="secondary-btn" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;

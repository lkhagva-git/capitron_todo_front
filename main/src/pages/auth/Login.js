import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginFetch, postRequest } from '../../utils';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Divider, Form, Input, message, Modal, Spin } from 'antd';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = { username, password };
            const responseTokens = await loginFetch(data);

            login(responseTokens.access, responseTokens.refresh);
            message.success('Амжилттай нэвтэрлээ!');
            navigate('/');
            window.location.reload();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const [firstModalOpen, setFirstModalOpen] = useState(false);

    const firstModalHandleCancel = () => {
        setFirstModalOpen(false);
    };


    const onFinish = async (values) => {
        try {
            const res = await postRequest('/api/signin/', values);

            login(res.access, res.refresh);

            setFirstModalOpen(false);
            navigate('/');
            window.location.reload();
            message.success('Бүртгэл амжилттай!');

        } catch (error) {
            console.error(error.message);
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Modal title="Бүртгүүлэх" open={firstModalOpen} onCancel={firstModalHandleCancel} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Овог"
                        name="last_name"
                        rules={[{ required: true, message: 'Овог оруулана уу!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Нэр"
                        name="first_name"
                        rules={[{ required: true, message: 'Нэр оруулана уу!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="И-мэйл"
                        name="email"
                        rules={[{ required: true, message: 'И-мэйл оруулана уу!' }]}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Нууц үг"
                        name="password"
                        rules={[{ required: true, message: 'Нууц үг оруулана уу!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" >
                            Бүртгүүлэх
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Spin spinning={loading}>
                <section className="bg-indigo-800 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    To do app
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Нэвтрэх нэр</label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Нууц үг</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button type="primary" htmlType="submit" block>
                                        Нэвтрэх
                                    </Button>
                                    <Divider style={{ marginTop: 5 }}>Эсвэл</Divider>
                                    <Button type="default" className='text-indigo-500' style={{ marginTop: 5 }} onClick={() => setFirstModalOpen(true)} block>
                                        Бүртгүүлэх
                                    </Button>

                                    {error && <p style={{ color: 'red' }}>{error}</p>}

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Spin >
        </>

    );
};

export default Login;

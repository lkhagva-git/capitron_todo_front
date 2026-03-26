import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, message, Modal, Select, Space, Table, Tag } from 'antd';
import { getRequest, postRequest } from '../utils';
import dayjs from 'dayjs';


const Home = () => {

    const [tasks, setTasks] = useState([]);
    const [form] = Form.useForm();
    const [taskModalOpen, setTaskModalOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);




    const taskModalHandleCancel = () => {
        form.resetFields();
        setTaskModalOpen(false);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    const openAddModal = () => {
        setIsEdit(false);
        setCurrentTask(null);
        form.resetFields();
        setTaskModalOpen(true);
    };



    const openEditModal = (task) => {
        setIsEdit(true);
        setCurrentTask(task);
        setTaskModalOpen(true);

        form.setFieldsValue({
            ...task,
            deadline: dayjs(task.deadline)
        });
    };

    const handleSubmit = async (values) => {
        try {

            if (isEdit) {
                await postRequest('/api/update_task/', {
                    ...values,
                    id: currentTask.id,
                });
                message.success('Амжилттай заслаа!');
            } else {
                await postRequest('/api/add_task/', values);
                message.success('Амжилттай даалгавар үүсгэлээ!');
            }

            form.resetFields();
            setTaskModalOpen(false);
            await fetchTasks();

        } catch (error) {
            console.error(error);
            message.error('Алдаа гарлаа!');
        }
    };




    const onDelete = async (values) => {
        try {
            await postRequest('api/delete_task/', { id: values.id });
            await fetchTasks();
            message.success('Амжилттай даалгавар устгалаа!');
        } catch (error) {
            console.error(error);
            message.error('Устгах үед алдаа гарлаа!');
        }
    };

    const statusOptions = [{ label: 'Хийх', value: 0, color: 'volcano' }, { label: 'Хийж буй', value: 1, color: 'geekblue' }, { label: 'Хийж дууссан', value: 2, color: 'green' }];
    const priorityOptions = [{ label: 'Энгийн', value: 0, color: 'geekblue' }, { label: 'Яаралтай', value: 1, color: 'volcano' }];

    const columns = [
        {
            title: 'Нэр',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Эцсийн хугцаа',
            dataIndex: 'deadline',
            key: 'deadline',
            render: (deadline) => deadline ? dayjs(deadline).format('YYYY-MM-DD HH:mm:ss') : '',
        },
        {
            title: 'Төлөв',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                let color;
                let label;

                if (status === 0) {
                    color = 'volcano';
                    label = 'Хийх';
                } else if (status === 1) {
                    color = 'geekblue';
                    label = 'Хийж буй';
                } else if (status === 2) {
                    color = 'green';
                    label = 'Хийсэн';
                }

                return (
                    <Tag color={color}>
                        {label}
                    </Tag>
                );
            }
        },
        {
            title: 'Priority',
            key: 'priority',
            dataIndex: 'priority',
            render: (priority) => {
                let color;
                let label;

                if (priority === 0) {
                    color = 'geekblue';
                    label = 'Энгийн'
                } else if (priority === 1) {
                    color = 'volcano';
                    label = 'Яаралтай'
                }

                return (
                    <Tag color={color}>
                        {label}
                    </Tag>
                );
            }
        },
        // {
        //     title: 'Үүсгэсэн хугцаа',
        //     dataIndex: 'created_at',
        //     key: 'created_at',
        // },
        // {
        //     title: 'Төрөл',
        //     dataIndex: 'category',
        //     key: 'category',
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="medium">
                    <Button color="primary" variant="solid" onClick={() => { openEditModal(record); }}>
                        Засах
                    </Button>
                    <Button color="danger" variant="solid" onClick={() => { onDelete(record); }}>
                        Устгах
                    </Button>
                </Space>
            ),
        },
    ];


    const fetchTasks = async () => {
        try {
            const data = await getRequest('api/get_task/');
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>

            <Modal title={isEdit ? "Даалгавар засах" : "Даалгавар нэмэх"} open={taskModalOpen} onCancel={taskModalHandleCancel} footer={null}>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Нэр"
                        name="name"
                        rules={[{ required: true, message: 'Нэр оруулана уу!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Эцсийн хугцаа"
                        name="deadline"
                        rules={[{ required: true, message: 'Эцсийн хугцаа оруулана уу!' }]}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>

                    <Form.Item
                        label="Төлөв"
                        name="status"
                        rules={[{ required: true, message: 'Төлөв сонгоно уу!' }]}

                    >
                        <Select options={statusOptions} />
                    </Form.Item>

                    <Form.Item
                        label="Priority"
                        name="priority"
                        rules={[{ required: true, message: 'Priority сонгоно уу!' }]}

                    >
                        <Select options={priorityOptions} />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            {isEdit ? "Засах" : "Нэмэх"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            <div className='mx-5'>
                <Button onClick={() => { openAddModal(); }} type="primary" style={{ marginBottom: 16, marginTop: 16 }}>
                    Даалгавар нэмэх
                </Button>
                {tasks.length !== 0 ? (
                    <Table
                        columns={columns}
                        dataSource={tasks}
                        rowKey="id"
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '20'],
                            showTotal: (total) => `Нийт ${total} даалгавар`,
                        }}
                    />
                ) : (
                    'No data'
                )}
            </div>
        </>
    );
};

export default Home;
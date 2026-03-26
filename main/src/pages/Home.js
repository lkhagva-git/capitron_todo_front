import React from 'react';
import { Button, Flex, Space, Table, Tag } from 'antd';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <Flex gap="small" align="center" wrap>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'kawaii') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </Flex>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="medium">
                <Button color="primary" variant="solid">
                    Засах
                </Button>
                <Button color="danger" variant="solid">
                    Устгах
                </Button>
                {/* <a>Invite {record.name}</a>
                <a>Delete</a> */}
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['kawaii'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const Home = () => {

    return (
        <>
            <Button onClick={() => { console.log("add task") }} type="primary" style={{ marginBottom: 16 }}>
                Add a task
            </Button>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default Home;
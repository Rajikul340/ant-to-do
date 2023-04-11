// import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input, Form } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TableRow from "./TableRow";


function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  // console.log("search", searchText);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch("https://my.api.mockaroo.com/eu4.json?key=41f8a070")
      .then((res) => res.json())
      .then((data) => setDataSource(data));
  }, []);

 


  const columns = [
    {
      key: "1",
      title: "time",
      dataIndex: "time",
      sorter: (a, b) => {
        return a.time > b.time;
      },
    },
    {
      key: "2",
      title: "title",
      dataIndex: "title",
      sorter: (a, b) => {
        return a.title > b.title;
      },
      // render: (text) => text.slice(0, 10),
    },
    {
      key: "3",
      title: "description",
      dataIndex: "body",
      sorter: (a, b) => {
        return a.description > b.description;
      },
      // render: (text) => text.slice(0, 50),
    },
    {
      key: "4",
      title: " date",
      dataIndex: "date",
      sorter: (a, b) => {
        return a.date > b.date;
      },
    },
    {
      key: "5",
      title: "tag",
      dataIndex: "tag",
    },
    {
      key: "6",
      title: "status",
      dataIndex: "status",
      filters: [
        { text: "done", value: "done" },
        { text: "working", value: "working" },
      ],
      filterMultiple: false,
    },

    {
      key: "7",
      title: "action",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const handleGlobalSearch = (e) => {
    console.log("event", e);
    const filterData = dataSource.filter((value) => {
      return (
        value.tag.toLowerCase().includes(e.toLowerCase()) ||
        value.title.toLowerCase().includes(e.toLowerCase()) ||
        value.status.toLowerCase().includes(e.toLowerCase())
      );
    });

    setSearchText(filterData);
  };

  const onAddStudent = (data) => {
    console.log('add data ',data.date);

    const DAte = new Date().toLocaleTimeString([], { hour12: false });
    const randomNumber = parseInt(Math.random() * 1000);
    const newData = {
      id: randomNumber,
      time: DAte,
      title: data.title,
      body: data.des,
      date: data.date,
      tag: data.tag,
      status: data.status,
    };
    setDataSource((pre) => {
      return [...pre, newData];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this  record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((singleData) => singleData.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="btnStyle">
          <Input.Search
            onChange={(e) => {
              handleGlobalSearch(e.target.value);
            }}
            style={{
              width: 200,
              marginRight: "20px",
            }}
          ></Input.Search>
          {/* <Button onClick={onAddStudent}>Add a new Data</Button> */}
        </div>
          <div>
         <TableRow onAddStudent={onAddStudent}/>
          </div>
        <Table
          columns={columns}
          dataSource={searchText ? searchText : dataSource}
          pagination={true}
        ></Table>
        <Modal
          title="Edit data"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre?.map((data, i) => {
                if (data.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return data;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            maxLength={500}
            required
            value={editingStudent?.body}
            placeholder="description"
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, body: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.title}
            placeholder="title"
            maxLength={100}
            required
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.date}
            placeholder="date"
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, date: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.tag}
            placeholder="tag"
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, tag: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.status}
            placeholder="status"
            required
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, status: e.target.value };
              });
            }}
          />
        </Modal>
      
      </header>
    </div>
  );
}

export default App;

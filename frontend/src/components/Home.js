import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {ADD_TASK, DELETE_TASK} from '../actions/index';
import Modal from 'react-modal';
import axios from'axios';
import "./style.css";

const rootUrl ='http://localhost:4000';
const usertoken= localStorage.getItem('userToken')
function generateAlphanumeric() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 10;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
}

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const taskreducers = useSelector((state) => state.taskreducers);
    const [data, setData] = useState({
        taskTitle: "",
        description: "",
    });
    const [modal, setModal] = useState(false);
    const [editTask, setEditTask] = useState({});
    console.log('taskreducers',taskreducers.tasks)

    const loginAPi = async() => {
        const token = JSON.parse(usertoken)
        if(!token){
            navigate('/')
            return 
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${rootUrl}/api/all-task`,
            headers: { 
                'Authorization': token
            }
        };
        console.log("config", config)
        const response = await axios.request(config)
        console.log("response", response.data)
        if(response?.data?.data){
            dispatch({type: "ALL_TASK", payload : response?.data.data })
        }
    };
    const commonFunction = async()=>{
        const token = JSON.parse(usertoken)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${rootUrl}/api/all-task`,
            headers: { 
                'Authorization': token
            }
        };
        console.log("config", config)
        const response = await axios.request(config)
        console.log("response", response.data)
        if(response?.data?.data){
            dispatch({type: "ALL_TASK", payload : response?.data.data })
        }
    }

    useEffect(() => {
        loginAPi();
    },[])

    const taskAPi = async (obj) => {
        const token = JSON.parse(usertoken)
        let data = JSON.stringify(obj);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${rootUrl}/api/task`,
            headers: { 
                'Authorization':token , 
                'Content-Type': 'application/json'
            },
            data : data
        };

        console.log("config",config)

        axios.request(config)
        .then((response) => response.data)
        .then(async (data) => {
            await commonFunction()
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const updateAPi = async (obj) => {
        const token = JSON.parse(usertoken)
        let data = JSON.stringify(obj);
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${rootUrl}/api/task/${obj.id}`,
            headers: { 
                'Authorization':token , 
                'Content-Type': 'application/json'
            },
            data : data
        };

        console.log("config",config)

        axios.request(config)
        .then((response) => response.data)
        .then(async (data) => {
            setModal(false)
            await commonFunction()
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const deleteAPi =  (id) => {
        const token = JSON.parse(usertoken)
        console.log(id)
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${rootUrl}/api/task/${id}`,
            headers: { 
                'Authorization':token, 
                'Content-Type': 'application/json'
            },
        };

        axios.request(config)
        .then((response) => response.data)
        .then( async (data) => {
            await commonFunction()
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const submitHandler = (event) => {
        const body = {
            id :  generateAlphanumeric(),
            taskTitle : data.taskTitle,
            description : data.description
        }
        dispatch({type : ADD_TASK , payload : body });
        taskAPi(body)
    }
    const editHandler = (value) => {
        setModal(!modal)
        setEditTask(value)
    }
    const deleteHandler = async (event) => {
        console.log(event)
        deleteAPi(event)
    }

    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const editChangeHandler = (event) => {
        setEditTask({ ...editTask, [event.target.name]: event.target.value });
    };

    const updateHandler = (updatedObj) => {
        console.log("updatedObj", updatedObj)
        updateAPi(updatedObj)
    }

    console.log("taskreducers",taskreducers)

  return (
    <div className={'container-home'}>
        <div className={'container-task'}>
            <div className={'formLogin'}>
                <h2>Create Task</h2>
                <div>
                <div>
                    <input type="text" name="taskTitle" value={data.taskTitle} placeholder="Title" onChange={changeHandler} autoComplete="off" />
                </div>
                </div>
                <div>
                <div>
                    <input type="text" name="description" value={data.description} placeholder="Description" onChange={changeHandler} autoComplete="off" />
                </div>
                </div>
                <div>
                <button onClick = {submitHandler} type="submit">Create</button>
                </div>
            </div>
        </div>
        <div className={'container-task'}>
            <div className={'formLogin'}>
                <h2>List of Task</h2>
                {taskreducers?.tasks.map((obj) => {
                    return <TaskRow obj = {obj} editHandler = {editHandler} deleteHandler = {deleteHandler} />
                })}
            </div>
        </div>
        { modal && 
            <Modal
                isOpen={modal}
                onRequestClose={() => editHandler(false)}
                style={{
                    top: '50%',
                    left: '50%',
                    right: '50%',
                    bottom: '50%',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                }}
                contentLabel="Example Modal"
            >
                <div className={'formLogin'}>
                    <h2>Update Task</h2>
                    <div>
                        <div>
                            <input type="text" disabled name="taskTitle" value={editTask.taskTitle} placeholder="Title" onChange={editChangeHandler} autoComplete="off" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="text" name="description" value={editTask.description} placeholder="Description" onChange={editChangeHandler} autoComplete="off" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="text" name="status" value={editTask.status} placeholder="status" onChange={editChangeHandler} autoComplete="off" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="text" name="priority" value={editTask.priority} placeholder="priority" onChange={editChangeHandler} autoComplete="off" />
                        </div>
                    </div>
                    <div>
                        <button onClick = {() => updateHandler(editTask)} type="submit">Update</button>
                    </div>
                </div>
          </Modal>
        }
    </div>
  );
};

export default Home;

function TaskRow({obj, deleteHandler, editHandler}) {
    return <div key={obj}>
        <div style={{backgroundColor: 'lightgray', padding: '20px', textAlign: 'center' }}>

            <div style = {{display : 'flex', flexDirection : 'row'}}>
                <label>Title:</label>
                <label style = {{marginLeft : '20px'}}>{obj.taskTitle}</label>
            </div>
            <div style = {{display : 'flex', flexDirection : 'row'}}>
                <label>description: </label>
                <label style = {{marginLeft : '20px'}}>{obj.description}</label>
            </div>
            <div style = {{display : 'flex', flexDirection : 'row'}}>
                <label>Due Date: </label>
                <label style = {{marginLeft : '20px'}}>{obj.dueDate}</label>
            </div>
            <div style = {{display : 'flex', flexDirection : 'row'}}>
                <label>Priority: </label>
                <label style = {{marginLeft : '20px'}}>{obj.priority}</label>
            </div>
            <div style = {{display : 'flex', flexDirection : 'row'}}>
                <label>Status: </label>
                <label style = {{marginLeft : '20px'}}>{obj.status}</label>
            </div>
        </div>
        <div>
            <button
                onClick = {() => editHandler(obj)}
                style={{
                    backgroundColor: '#4ad0cc',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                type="submit"
            >
                Edit
            </button>
        </div>
        <div>
            <button
                onClick={() => deleteHandler(obj.id)}
                style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                type="submit"
            >
                Delete
            </button>
        </div>
    </div>;
}

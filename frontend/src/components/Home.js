import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {ADD_TASK} from '../actions/index'

import "./style.css";


const Home = () => {
    const dispatch = useDispatch();
    const taskreducers = useSelector((state) => state.taskreducers);
    const [data, setData] = useState({
        title: "",
        description: "",
    });

    const submitHandler = (event) => {
        dispatch({type : ADD_TASK , payload : data })
    }

    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    console.log("taskreducers",taskreducers)
  return (
    <div className={'container-home'}>
        <div className={'container-task'}>
            <div className={'formLogin'}>
                <h2>Create Task</h2>
                <div>
                <div>
                    <input type="text" name="title" value={data.title} placeholder="Title" onChange={changeHandler} autoComplete="off" />
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
                    return <li>{obj.title}</li>
                })}
            </div>
           
        </div>
    </div>
  );
};

export default Home;
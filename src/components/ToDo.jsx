import React, { useRef, useState, useEffect } from "react";
import "../index.css";
import logo from "../assets/todo4.png";
import ToDoItems from "./ToDoItems";

function ToDo() {
    const [toDoList, setToDoList] = useState(localStorage.getItem("todo_list") ? JSON.parse(localStorage.getItem("todo_list")) : []);
    const inputRef = useRef();

    const add = () => {
        // sets current value from input
        const inputText = inputRef.current.value.trim();

        // checks if input is empty
        if (inputText == "") {
            return null;
        }

        // creates new todolist object
        const newToDo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };

        // retreives previous todolist and appends new list item
        setToDoList((prev) => {
            return [...prev, newToDo];
        });
        inputRef.current.value = "";
    };

    const deleteToDo = (id) => {
        setToDoList((prevToDos) => {
            return prevToDos.filter((todo) => todo.id !== id);
        });
    };

    const toggle = (id) => {
        setToDoList((prevToDos) => {
            return prevToDos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete };
                }
                return todo;
            });
        });
    };

    useEffect(() => {
        localStorage.setItem("todo_list", JSON.stringify(toDoList));
    }, [toDoList]);

    return (
        <>
            <div className="container">
                {/* title and logo */}
                <div className="title">
                    <img src={logo} alt="logo" id="logo" />
                    <h2>To Do List</h2>
                </div>

                {/* task input box */}
                <div className="input-box">
                    <input ref={inputRef} className="task" type="text" name="task" placeholder="Enter your task here" />
                    <button onClick={add}>+</button>
                </div>

                {/* tasks list */}
                <div className="todolist">
                    {toDoList.map((item, index) => {
                        return <ToDoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteToDo={deleteToDo} toggle={toggle} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default ToDo;

import React from "react";
import "../index.css";
import tick from "../assets/ticked1_2.png";
import untick from "../assets/unticked1_2.png";
import remove from "../assets/delete1_2.png";

function ToDoItems({ text, id, isComplete, deleteToDo, toggle }) {
    return (
        <div className="todo-list">
            <div
                onClick={() => {
                    toggle(id);
                }}
            >
                <img src={isComplete ? tick : untick} alt="checked" />
                <p style={{ textDecoration: isComplete ? "line-through" : "none" }}>{text}</p>
            </div>

            <img
                id="deleteToDo"
                onClick={() => {
                    return deleteToDo(id);
                }}
                src={remove}
                alt="delete"
            />
        </div>
    );
}

export default ToDoItems;

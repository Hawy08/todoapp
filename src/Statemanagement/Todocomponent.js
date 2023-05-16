import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo, deletetodo, toggletodo } from "./todoSlice";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import  '../styling/inputstyles.css'
import {    faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function Todocomponent() {
  const [newTodo, setnewTodo] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const filterIncompletedTodos=(todos)=> todos &&
    !todos.completed
  const incompletedTaskCounts= todos.filter(filterIncompletedTodos).length;
  
  useEffect(() => {
    const fetchTodo = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const fetchedTodos = [];
      querySnapshot.forEach((doc) => {
        fetchedTodos.push(doc.data());
      });
      dispatch({type:"todos/fetchedtodos",payload:fetchedTodos})
    };
    fetchTodo();
  },[dispatch]);

  const handleAddTodo = async () => {
    if(newTodo.trim()===''){
      return
    }
    const todoData = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    dispatch(addtodo(todoData));
    try {
      const docRef = await addDoc(collection(db, "todos"), todoData);
      console.log("To do written with id:", docRef.id);
      setnewTodo("");
    } catch (error) {
      console.log("Error adding document:", error);
    }
  };
  const handleKeyPress=(e)=>{
    if(e.key==='Enter'){
        handleAddTodo()
    }
  }

  const handleToggleTodo = (todoId) => {
    dispatch(toggletodo(todoId));
  };

  const handleDelete = (todoId) => {
    dispatch(deletetodo(todoId));
  };
  return (
    <div>
      <div className="todoWrapper container-fluid">
        <h1>ToDo App <FontAwesomeIcon className="clr" icon={faCheckCircle}/></h1>
        <div className="inputbox">
          <input
          type="text"
          value={newTodo}
          placeholder="Add your new todo"
          onKeyDown={handleKeyPress}
          onChange={(e) => setnewTodo(e.target.value)}
        />
        <button className="addtaskbtn" onClick={handleAddTodo} >+</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                
                  className={todo.completed ?'completed':'' }
                onClick={() => handleToggleTodo(todo.id)}
              >
                {todo.text}{" "}
              </span>
              <button className={todo.completed?'bgBlue':'bgRed'} onClick={() => handleDelete(todo.id)}>{todo.completed ?<FontAwesomeIcon icon={faCheckCircle} />:<FontAwesomeIcon icon={faTrash} />}</button>
            </li>
          ))}
        </ul>
        <p className="footer">You have <span>{incompletedTaskCounts}</span> pending task{incompletedTaskCounts!==1?"s":''}!</p>
      </div>
    </div>
  );
}

export default Todocomponent;

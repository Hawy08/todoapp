import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo, deletetodo, toggletodo } from "./todoSlice";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import  '../styling/inputstyles.css'

function Todocomponent() {
  const [newTodo, setnewTodo] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

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

  const handleToggleTodo = (todoId) => {
    dispatch(toggletodo(todoId));
  };

  const handleDelete = (todoId) => {
    dispatch(deletetodo(todoId));
  };
  return (
    <div>
      <div>
        <input
          type="text"
          value={newTodo}
          placeholder="add todo"
          onChange={(e) => setnewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Task</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => handleToggleTodo(todo.id)}
              >
                {todo.text}{" "}
              </span>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todocomponent;

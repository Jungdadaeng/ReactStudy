import React, { useState } from 'react';
import { connect } from 'react-redux';

const ReduxPractice = ({ todos, addTodo, deleteTodo }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = event => {
    setInputText(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputText !== '') {
      addTodo(inputText);
      setInputText('');
    }
  };

  const handleDeleteTodo = id => {
    deleteTodo(id);
  };

  return (
    <>
      <h1>To-Do List</h1>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  addTodo: text => dispatch({ type: 'ADD_TODO', id: Date.now(), text }),
  deleteTodo: id => dispatch({ type: 'DELETE_TODO', id })
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPractice);
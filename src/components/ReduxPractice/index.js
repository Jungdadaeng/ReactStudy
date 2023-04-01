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

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPractice); // react-redux 패키지에서 제공하는 함수로 Redux Store와 React 컴포넌트를 연결해주는 역할, mapStateToprops는 스토어에서 상태를 가져와 ReactComponent의 pops로 매핑해주는 역할 mapDispatchToProps는 상태 업데이트할 때 사용하는 액션을 디스패치하는 함수를 React컴포넌트의 props로 매핑해주는 역할
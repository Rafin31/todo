import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import './Todo.css'

const Todo = () => {

    const [todos, setTodos] = useState([])
    const [completed, isCompleted] = useState(" ")

    useEffect(() => {
        fetch("https://glacial-fjord-08537.herokuapp.com/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
    }, [todos])



    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const todo = e.target.todo.value
        const todo_des = e.target.todo_description.value


        await fetch('https://glacial-fjord-08537.herokuapp.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo, todo_des }),
        })
            .then(res => res.json())
            .then(data => console.log(data))

        setTodos([])
    }



    const handleDelete = async (e, id) => {
        e.preventDefault()

        await fetch(`https://glacial-fjord-08537.herokuapp.com/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => console.log(data))

        setTodos([])


    }

    const handleupdate = async (e, id) => {
        e.preventDefault()

        await fetch(`https://glacial-fjord-08537.herokuapp.com/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => console.log(data))

        setTodos([])


    }

    return (
        <div>
            <div className="container todo-container ">
                <div className="row w-100">
                    <div class="card w-100 text-left">
                        <div class="card-body">
                            <h4 class="card-title text-center text-capitalize">Todo</h4>

                            <div className="card_input">
                                <form onSubmit={(e) => handleFormSubmit(e)}>
                                    <div className="row g-0">

                                        <input name='todo' required type="text" className='form-input' placeholder='Write your Todo here..' />

                                        <input name='todo_description' required type="text" className='form-input my-3' placeholder='Write your Todo here..' />


                                        <input type="submit" value={"Submit"} className="d-inline-block btn btn-success py-3 px-4" />

                                    </div>
                                </form>
                                <br />
                                {
                                    todos.length ?

                                        <>
                                            <br />
                                            <hr />

                                            {
                                                todos.map((todo, index) => {
                                                    return (
                                                        <>

                                                            <div className="todos">

                                                                {index + 1}.
                                                                {todo.status ?

                                                                    <div className="row w-100">
                                                                        <div className="col-12 col-lg-6">
                                                                            <del>{todo.task}</del>

                                                                        </div>
                                                                        <div className="col-12 col-lg-6">
                                                                            <del>{todo.description}</del>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        <div className="row w-100" >
                                                                            <div className="col-12 col-lg-6">
                                                                                <p>{todo.task}</p>

                                                                            </div>
                                                                            <div className="col-12 col-lg-6">
                                                                                <p>{todo.description}</p>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }
                                                                {
                                                                    !todo.status ?
                                                                        <div className="todo_buton">
                                                                            <button className='btn btn-warning' onClick={
                                                                                (e) => handleupdate(e, todo._id)
                                                                            }>Complete</button>
                                                                            <button className='btn btn-danger' onClick={
                                                                                (e) => handleDelete(e, todo._id)
                                                                            }>Delete</button>
                                                                        </div>
                                                                        :
                                                                        <button className='btn btn-danger' onClick={
                                                                            (e) => handleDelete(e, todo._id)
                                                                        }>Delete</button>
                                                                }
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }

                                        </>
                                        :

                                        <p className="text-center">Add your Todos...</p>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
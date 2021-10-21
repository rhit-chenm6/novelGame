import React from 'react';
import './index.css';


class TodoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            addNewTodo: false,
            editingIndex: -1,
            editing:false
        };
        this.addNewForm = this.addNewForm.bind(this);
        this.checkBoxChangeHandler = this.checkBoxChangeHandler.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.editingForm = this.editingForm.bind(this);
    }

    addNewForm() {
        this.setState({ addNewTodo: true });
    }

    editingForm(id) {
        this.setState({ editingIndex: id });
        this.setState({ editing: true });
    }

    checkBoxChangeHandler = (id) => {
        var newTodos = this.state.todos.slice();
        newTodos[id - 1].completed = !newTodos[id - 1].completed;
        this.setState({ todos: newTodos });
    }

    addNewTask() {
        var newTodos = this.state.todos.slice();
        const length = this.state.todos.length;
        const newDescription = document.getElementById("newTaskInput").value;
        newTodos[length] = { id: length + 1, description: newDescription, completed: false };
        this.setState({ todos: newTodos });
        this.setState({ addNewTodo: false });
    }

    editTodo = (id) => {
        console.log("edit losu focus");
        var newTodos = this.state.todos.slice();
        const newDescription = document.getElementById("editTaskInput").value;
        newTodos[id - 1] = { id: id, description: newDescription, completed: false };
        this.setState({ todos: newTodos });
        this.setState({ editingIndex: -1 });
        this.setState({ editing: false });
    
    }

    render() {
        const length = this.state.todos.length;
        const rows = [];
        this.state.todos.forEach((todo) => {
            rows.push(
                <TodoCheckBox
                    description={todo.description}
                    key={todo.id} completed={todo.completed} index={todo.id}
                    editing={this.state.editing}
                    editingIndex={this.state.editingIndex}
                    onChange={id => this.checkBoxChangeHandler(todo.id)}
                    onClick={id => this.editingForm(todo.id)}
                    onBlur={id => this.editTodo(todo.id)} />
            );
        });

        return (
            <div>
                <h1>If you can dream it, you can TODO it!</h1>
                {length <= 0 && !this.state.addNewTodo &&
                    <p>
                        There are no tasks remaining! You should add one!
                    </p>}
                <div>
                    < ul id="todos" >
                        {rows}
                    </ul >
                </div>
                {this.state.addNewTodo &&
                    <form>
                        <label htmlFor="newTaskInput">Task Description</label>
                        <input
                            id="newTaskInput" autoFocus name="description" required type="text"
                            onBlur={this.addNewTask} />
                    </form>
                }
                {!this.state.addNewTodo && !this.state.editing &&
                    <a className="button" onClick={this.addNewForm}>Add task</a>}
            </div>
        );
    }
}

function TodoCheckBox(props) {
    return (
        <li>
            {((!props.editing) || (props.editingIndex != props.index)) &&
            <div>
            <input type="checkbox" id="todoCheckBox" name="todoCheckBox" checked={props.completed}
                onChange={props.onChange} />
            <a onClick={props.onClick}>{props.description}</a>
            </div>
            }
            {(props.editingIndex == props.index) &&
                <form>
                    <label htmlFor="editTaskInput">Task Description</label>
                    <input
                        id="editTaskInput" autoFocus name="description" required type="text"
                        onBlur={props.onBlur} defaultValue={props.description} />
                </form>
            }
        </li>
    );

}

export default TodoTable;

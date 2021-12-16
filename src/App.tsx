import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListID1 = v1();
    let todoListID2 = v1();
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "HTML2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "React2", isDone: false},
            {id: v1(), title: "Redux2", isDone: false},
        ]
    });

    // tasks
    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone} : m)})

    }

    function changeTaskTitle(todolistID: string, taskId: string, title: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, title: title} : m)})

    }

    // todoLists
    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }

    function changeTodoTitle(todolistID: string, title: string) {
        setTodoLists(todoLists.map(m => m.id === todolistID ? {...m, title: title} : m))
    }

    function removeTodolist(todolistID: string) {
        setTodoLists(todoLists.filter(f => f.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodo: TodoListsType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(m => {
                let tasksForTodoList = tasks[m.id];
                if (m.filter === "active") {
                    tasksForTodoList = tasks[m.id].filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodoList = tasks[m.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist title={m.title}
                              key={m.id}
                              todolistID={m.id}
                              filter={m.filter}
                              tasks={tasksForTodoList}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              removeTodolist={removeTodolist}
                              changeTaskStatus={changeStatus}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoTitle={changeTodoTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;

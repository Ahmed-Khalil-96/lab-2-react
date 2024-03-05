import React, { Component } from "react";
import axios from "axios";

export default class TaskTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            totalTasks: 0,
            min: 0,
            max: 5,
        };
    }

    componentDidMount() {
        axios
            .get("http://jsonplaceholder.typicode.com/todos")
            .then(response => {
                this.setState({ tasks: response.data, totalTasks: response.data.length });
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
            });
    }

    handleNextTasks = () => {
        const { min, max, totalTasks } = this.state;
        if (max + 5 <= totalTasks) {
            this.setState({
                min: min + 5,
                max: max + 5,
            });
        } else {
            this.setState({
                min: 0,
                max: 5,
            });
        }
    };

    handlePrevTasks = () => {
        const { min, max, totalTasks } = this.state;
        if (min - 5 >= 0) {
            this.setState({
                min: min - 5,
                max: max - 5,
            });
        } else {
            this.setState({
                min: totalTasks - 5,
                max: totalTasks,
            });
        }
    };

    render() {
        const { tasks, min, max } = this.state;

        return (
            <div className="task-table">
                <table className="task-table__table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => {
                            const shouldDisplay = task.id > min && task.id <= max;
                            return shouldDisplay ? (
                                <tr key={task.id}>
                                    <th scope="row">{task.id}</th>
                                    <td>{task.title}</td>
                                    <td>
                                        {task.completed ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-check-all task-table__check-icon" viewBox="0 0 16 16">
                                                <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg task-table__cross-icon" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                            </svg>
                                        )}
                                    </td>
                                </tr>
                            ) : null;
                        })}
                    </tbody>
                </table>
                <div className="task-table__controls">
                    <button className="btn btn-dark" onClick={this.handlePrevTasks}>Previous</button>
                    <button className="btn btn-dark" onClick={this.handleNextTasks}>Next</button>
                </div>
            </div>
        );
    }
}

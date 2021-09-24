import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class Student extends Component {

    state = {
        students: [],
    }

    async componentDidMount() {
        const res = await axios.get('http://127.0.0.1:8000/api/students');
        // console.log(res);
        if (res.data.status === 200) {

            this.setState({
                students: res.data.students,
            });

        }
    }

    deleteStudent = async (e, id) => {

        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Deleting";

        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}`);
        if(res.data.status === 200)
        {
            thidClickedFunda.closest("tr").remove();
            // console.log(res.data.message);
            swal({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
                button: "ok",
            });

        }
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card ">
                            <div className="card-header">
                                <h4>Student Data
                                    <Link to={'add-student'} className="btn btn-primary btn-sm float-right">Add Student</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Course</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.students.length > 0 && this.state.students.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.course}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>
                                                        <Link to={`edit-student/${item.id}`} className="btn btn-success btn-sm" >Edit</Link>
                                                    </td>
                                                    <td>
                                                        <button onClick={(e) => this.deleteStudent(e, item.id)} className="btn btn-danger btn-sm" type="button">Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}
export default Student;
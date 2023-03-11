import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export class Employee extends Component {
    static displayName = Employee.name;

    constructor(props) {
        super(props);
        this.state = {
            employeeList: [], departments: [], loading: true, showAddDialog: false, formData: {}
        };
        this.handleChange.bind(this);
        this.toggle.bind(this);
    }

    componentDidMount() {
        this.populateData();
    }



    renderemployeeListTable(employeeList) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Departments</th>
                        <th>Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employeeList.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{(employee.department || {}).departmentName}</td>
                            <td>{employee.createdTime}</td>
                            <td>
                                <Button color="warning"
                                    onClick={() => this.toggle(employee)}>Edit</Button>
                                <Button color="danger"
                                    onClick={() => this.deleteEmployee(employee.id)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderemployeeListTable(this.state.employeeList);

        var formData = this.state.formData || {};
        var departments = this.state.departments;

        return (
            <>
                <div>
                    <h1 id="tabelLabel" >Employee List</h1>
                    <Button color="primary"
                        onClick={() => this.toggle()}>Add Employee</Button>
                    <Input onChange={(event) => this.searchEmployee(event)} value={this.state.searchTerm} className="mt-2" type="text" placeholder="type here for search..." />
                    {contents}
                </div>
                <div style={{
                    display: 'block', width: 700, padding: 30
                }}>

                    <Modal isOpen={this.state.showAddDialog}
                        toggle={() => this.toggle()}
                        modalTransition={{ timeout: 300 }}>
                        <ModalHeader toggle={this.toggle}>Add Employee</ModalHeader>
                        <ModalBody>
                            <div>
                                <Form>
                                    <FormGroup>
                                        <Label for="firstName">First Name</Label>
                                        <Input onChange={(event) => this.handleChange(event)} value={formData.firstName || ''} type="text" name="firstName" id="firstName" placeholder="First Name" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="lastName">Last Name</Label>
                                        <Input onChange={(event) => this.handleChange(event)} value={formData.lastName || ''}
                                            type="text" name="lastName" id="lastName" placeholder="Last Name" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input onChange={(event) => this.handleChange(event)} value={formData.email || ''}
                                            type="email" name="email" id="email" placeholder="Email" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phoneNumber">Phonenumber</Label>
                                        <Input onChange={(event) => this.handleChange(event)} value={formData.phoneNumber || ''}
                                            type="email" name="phoneNumber" id="phoneNumber" placeholder="Phonenumber" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="department">Departments</Label>
                                        <Input onChange={(event) => this.handleChange(event)}
                                            type="select" name="departmentId" id="departmentId">
                                            {(departments || []).map(department => <option key={department.id} value={department.id}>{department.departmentName}</option>)}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input onChange={(event) => this.handleChange(event)} value={formData.address || ''}
                                            type="textarea" name="address" id="address" />
                                    </FormGroup>

                                </Form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.save()}>Save</Button>{' '}
                            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div >
            </>
        );
    }
    async searchEmployee(event) {
        console.log('event', event.target.value)
        if (event.target.value) {
            console.log('deb', event.target.value)
            var fetchSearch = async () => {
                const response = fetch('api/employee/search/' + event.target.value).then(response => response.json()).then(data => data).catch(error => alert(error));
                let data = await response;
                this.setState({ ...this.state, employeeList: data.result });
            };
            await fetchSearch();
            //debouncer should be implemented for better performance
            //var deb = this.debounce(() => fetchSearch());

        } else {
            await this.getEmployees();
        }
    }
    toggle(data) {
        var showdialog = this.state.showAddDialog;
        this.setState({ ...this.state, showAddDialog: !showdialog, formData: data })
    }


    async save() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var formData = this.state.formData;
        if (!formData) {
            alert('please fill complete form')
            return;
        }
        formData.departmentId = window.document.getElementById('departmentId').value;
        var raw = JSON.stringify(this.state.formData);

        var requestOptions = {
            method: formData.id ? 'PUT' : 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            var response = await fetch("https://localhost:44441/api/employee", requestOptions)
            if (response.status !== 200) {
                alert('please provide all data ')
                return;
            }
            this.toggle();
            await this.getEmployees();
        } catch (error) {
            console.log('errors')
            alert(error)
        }
    }

    handleChange(event) {
        var target = event.target;
        this.setState({ ...this.state, formData: { ...this.state.formData, [target.name]: target.value } });
    }

    async deleteEmployee(id) {
        var check = window.confirm('are you sure?');
        var requestOptions = {
            method: 'DELETE'
        };
        if (check) {
            const response = fetch('api/employee/' + id, requestOptions).then(response => response.json()).then(data => data).catch(error => alert(error));
            await response;
            await this.getEmployees();
        }
    }

    async getEmployees() {
        const response = await fetch('api/employee');
        const data = await response.json();
        this.setState({ ...this.state, employeeList: data.result });
    }

    async populateData() {
        await this.getEmployees();
        const departmentsResponse = await fetch('api/department');
        const departments = await departmentsResponse.json();
        this.setState({ ...this.state, departments: departments.result, loading: false });
    }

    debounce(fn, delay) {
        let timeoutID;
        return function (...args) {
            if (timeoutID)
                clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    }

}

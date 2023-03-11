import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export class Department extends Component {
    static displayName = Department.name;

    constructor(props) {
        super(props);
        this.state = {
            departmentList: [], departments: [], loading: true, showAddDialog: false, formData: {}
        };
        this.handleChange.bind(this);
        this.toggle.bind(this);
    }

    componentDidMount() {
        this.populateData();
    }



    renderdepartmentListTable(departmentList) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Empoyees</th>
                        <th>Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {departmentList.map(department =>
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departments}</td>
                            <td>{department.createdTime}</td>
                            <td>
                                <Button color="warning"
                                    onClick={() => this.toggle(department)}>Edit</Button>
                                <Button color="danger"
                                    onClick={() => this.deleteDepartment(department.id)}>Delete</Button>
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
            : this.renderdepartmentListTable(this.state.departmentList);

        var formData = this.state.formData || {};
        var departments = this.state.departments;

        return (
            <>
                <div>
                    <h1 id="tabelLabel" >Department List</h1>
                    <Button color="primary"
                        onClick={() => this.toggle()}>Add Department</Button>
                    <Input onChange={(event) => this.searchDepartment(event)} value={this.state.searchTerm} className="mt-2" type="text" placeholder="type here for search..." />
                    {contents}
                </div>
                <div style={{
                    display: 'block', width: 700, padding: 30
                }}>

                    <Modal isOpen={this.state.showAddDialog}
                        toggle={() => this.toggle()}
                        modalTransition={{ timeout: 300 }}>
                        <ModalHeader toggle={this.toggle}>Add Department</ModalHeader>
                        <ModalBody>
                            <div>
                                <Form>
                                    <FormGroup>
                                        <Label for="departmentName">Name</Label>
                                        <Input onChange={(event) => this.handleChange(event)} value={formData.departmentName || ''} type="text" name="departmentName" id="departmentName" placeholder="Name" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="departments">Employees</Label>
                                        <Input onChange={(event) => this.handleChange(event)}
                                            type="select" name="employeeIds" id="departments" multiple>
                                            {(departments || []).map(department => <option key={department.id} value={department.id}>{department.name}</option>)}
                                        </Input>
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
    async searchDepartment(event) {
        console.log('event', event.target.value)
        if (event.target.value) {
            console.log('deb', event.target.value)
            var fetchSearch = async () => {
                const response = fetch('api/department/search/' + event.target.value).then(response => response.json()).then(data => data).catch(error => alert(error));
                let data = await response;
                this.setState({ ...this.state, departmentList: data.result });
            };
            await fetchSearch();
            //debouncer should be implemented for better performance
            //var deb = this.debounce(() => fetchSearch());

        } else {
            await this.getDepartments();
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
        var raw = JSON.stringify(this.state.formData);

        var requestOptions = {
            method: formData.id ? 'PUT' : 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var response = await fetch("https://localhost:44441/api/department", requestOptions)
        console.log(response);
        if (response.status != 200) {
            alert('please provide all data')
            return;
        }
        this.toggle();
        await this.getDepartments();
    }

    handleChange(event) {
        var target = event.target;
        console.log('state data', this.state)
        this.setState({ ...this.state, formData: { ...this.state.formData, [target.name]: target.value } });
    }

    async deleteDepartment(id) {
        var check = window.confirm('are you sure?');
        var requestOptions = {
            method: 'DELETE'
        };
        if (check) {
            const response = fetch('api/department/' + id, requestOptions).then(response => response.json()).then(data => data).catch(error => alert(error));
            let data = await response;
            await this.getDepartments();
        }
    }

    async getDepartments() {
        const response = await fetch('api/department');
        const data = await response.json();
        this.setState({ ...this.state, departmentList: data.result });
    }

    async populateData() {
        await this.getDepartments();
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

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export class Employee extends Component {
    static displayName = Employee.name;

    constructor(props) {
        super(props);
        this.state = {
            employeeList: [], departments: [], loading: true, showAddDialog: false, formData: {}
        };
    }

    componentDidMount() {
        this.populateData();
    }



    static renderemployeeListTable(employeeList) {
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
                    </tr>
                </thead>
                <tbody>
                    {employeeList.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.PhoneNumber}</td>
                            <td>{employee.departments}</td>
                            <td>{employee.CreatedTime}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Employee.renderemployeeListTable(this.state.employeeList);

        var formData = this.state.formData;
        var departments = this.state.departments;

        return (
            <>
                <div>
                    <h1 id="tabelLabel" >Employee List</h1>
                    {contents}
                </div>
                <div style={{
                    display: 'block', width: 700, padding: 30
                }}>
                    <h4>ReactJS Reactstrap Modal Component</h4>
                    <Button color="primary"
                        onClick={() => this.toggle()}>Open Modal</Button>
                    <Modal isOpen={this.state.showAddDialog}
                        toggle={() => this.toggle()}
                        modalTransition={{ timeout: 300 }}>
                        <ModalHeader toggle={this.toggle}>Add Employee</ModalHeader>
                        <ModalBody>
                            <div>
                                <Form>
                                    <FormGroup>
                                        <Label for="firstName">First Name</Label>
                                        <Input type="text" name="firstName" id="firstName" placeholder="with a placeholder" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="lastName">Last Name</Label>
                                        <Input type="text" name="lastName" id="lastName" placeholder="with a placeholder" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" placeholder="with a placeholder" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phoneNumber">Email</Label>
                                        <Input type="email" name="phoneNumber" id="phoneNumber" placeholder="with a placeholder" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="departments">Departments</Label>
                                        <Input type="select" name="departmentids" id="departments" multiple>
                                            {(departments || []).map(department => <option key={department.id} value={department.id}>{department.name}</option>)}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input type="textarea" name="text" id="address" />
                                    </FormGroup>

                                </Form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.Save}>Save</Button>{' '}
                            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div >
            </>
        );
    }
    toggle() {
        var showdialog = this.state.showAddDialog;
        this.setState({ ...this.state, showAddDialog: !showdialog })
    }

    save() {

    }
    async populateData() {
        const response = await fetch('api/employee');
        const departmentsResponse = await fetch('api/department');
        const data = await response.json();
        const departments = await departmentsResponse.json();
        this.setState({ ...this.state, departments: departments.result, employeeList: data.result, loading: false });
    }

}

import React, { Component } from 'react';

export class Department extends Component {
    static displayName = Department.name;

    constructor(props) {
        super(props);
        this.state = { departmentList: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderdepartmentListTable(departmentList) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {departmentList.map(department =>
                        <tr key={department.id}>
                            <td>{department.firstName}</td>
                            <td>{department.lastName}</td>
                            <td>{department.email}</td>
                            <td>{department.PhoneNumber}</td>
                            <td>{department.CreatedTime}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Department.renderdepartmentListTable(this.state.departmentList);

        return (
            <div>
                <h1 id="tabelLabel" >Department List</h1>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('api/department');
        const data = await response.json();
        this.setState({ departmentList: data.result, loading: false });
    }
}

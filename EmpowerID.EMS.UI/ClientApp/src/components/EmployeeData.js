import React, { Component } from 'react';

export class EmployeeData extends Component {
  static displayName = EmployeeData.name;

  constructor(props) {
    super(props);
    this.state = { employeeList: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
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
          </tr>
        </thead>
        <tbody>
          {employeeList.map(employee =>
              <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : EmployeeData.renderemployeeListTable(this.state.employeeList);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

    async populateWeatherData() {
        const response = await fetch('api/employee');
    const data = await response.json();
    this.setState({ employeeList: data, loading: false });
  }
}

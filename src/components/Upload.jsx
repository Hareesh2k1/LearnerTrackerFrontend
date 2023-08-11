import React, { useState } from 'react'
import Papa from "papaparse";
import { Table, Button, Segment, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Upload = () => {
  const navigate = useNavigate();
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  //   const [jsonData, setJsonData] = useState([]);

  const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken"))
  const [userRole, setUserrole] = useState(sessionStorage.getItem("userRole"));

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`, // Include your authentication token here
      'X-User-Role': userRole // Pass the user role here in custom header
    }
  };

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setParsedData(results.data);
        // console.log("Parsed data:", results.data);
        setTableRows(Object.keys(results.data[0]));
        setValues(results.data.map((row) => Object.values(row)));
      },
    });
  };

 //to send data from csv file to database
  const sendDataToAPI = () => {
    if (parsedData.length > 0) {
      axios.post('https://learnertracker.onrender.com/api/learner/upload', parsedData, config)
        .then((response) => {
          console.log(response.data)
          if (response.data.status === 'OK') {
            Swal.fire({
              title: 'Data added successfully..!',
              showDenyButton: false,
              confirmButtonText: 'Return to Dashboard',
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success');
                navigate('/thome');
              }
            });
          }
          else if (response.data.status === 'Forbidden') {
            Swal.fire('Sorry', response.data.message, '');
            ;
          }
        })
        .catch(function (error) {
          console.log(error.toJSON());
        });

    }
    else {
      alert('No data found!');
    }
  };

  //to authenticate users
  if (userRole !== 'Admin' && userRole !== 'Training Head') {
    return (
      <div className="container" align="center" style={{ marginTop: '120px' }}>
        <Segment style={{ border: 'none' }}>
          <p>You are not authorized to access this page.</p>
          <Link to="/thome">
            <Button
              size="mini"
              style={{ backgroundColor: '#FF0000', color: '#ffffff', fontSize: 15, borderColor: '#FFC300' }}
            >
              Go to Home
            </Button>
          </Link>
        </Segment>
      </div>
    );
  }


  return (
    <div>
      <div className="container" align='center' style={{ marginTop: '120px' }}>
        <Segment style={{ border: "none" }}>
          <Form style={{ border: "none", width: "900px", backgroundColor: "lightgray", height: "400px", padding: "40px" }}>
            <Form.Field>
              <label>Upload a CSV File :</label>
              &nbsp;&nbsp;
              <input
                type="file"
                name="file"
                onChange={changeHandler}
                accept=".csv"
              />
            </Form.Field>
            <br></br>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  {tableRows.map((rows, index) => {
                    return (
                      <Table.HeaderCell style={{ backgroundColor: "#581845", color: "#ffffff" }}>{rows}</Table.HeaderCell>)
                  })}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {values.map((value, index) => {
                  return (
                    <Table.Row key={index}>
                      {value.map((val, i) => {
                        return <Table.Cell key={i}>{val}</Table.Cell>
                      })}
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>

            <Button size='mini' color='grey' type='submit' onClick={sendDataToAPI} style={{ backgroundColor: "#FFC300", color: "#ffffff", fontSize: 15, borderColor: "#FF0000" }} >Submit</Button>
            &nbsp;&nbsp;&nbsp;
            <Link to='/thome' >
              <Button size='mini' style={{ backgroundColor: "#FF0000", color: "#ffffff", fontSize: 15, borderColor: "#FFC300" }}>
                Cancel
              </Button>
            </Link>

            <Form.Field>
              <a
                href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQFzyD3UE2ZtUbTt0Kn21zvH1aOPD6tEc7oGGezlGiiJozZxuS1zqX4YOZu1wxQbg_fiGKwEmy4L_N_/pub?gid=0&single=true&output=csv"
                download
                style={{ color: "red" }}
              >
                Click here to download a sample csv file
              </a>
            </Form.Field>
          </Form>
        </Segment>
      </div>
    </div>
  )
}

export default Upload;

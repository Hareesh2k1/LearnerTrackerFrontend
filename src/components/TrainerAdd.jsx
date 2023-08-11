import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const TrainerAdd = (props) => {
    //console.log("props data", props.data);
    const [inputs, setInputs] = useState(props.data);
    const navigate = useNavigate();

    //to display form validation warnings
    const[displayLid,setDisplayLid]=useState(false);
    const[displayNamewarn,setDisplayNamewarn]=useState(false);
    const[displayCwarn,setDisplayCwarn]=useState(false);
    const[displayProwarn,setDisplayProwarn]=useState(false);
    const[displayBwarn,setDisplayBwarn]=useState(false);
    const[displayCswarn,setDisplayCswarn]=useState(false);

    const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken"))
    const [userID, setUserID] = useState(sessionStorage.getItem("userId"))
    const [userRole, setUserrole] = useState(sessionStorage.getItem("userRole"));

    // function to handle inputs from form
    const inputHandler = (e) => {
        setDisplayLid(false);
        setDisplayNamewarn(false);
        setDisplayCwarn(false);
        setDisplayProwarn(false);
        setDisplayBwarn(false);
        setDisplayCswarn(false);

        const { name, value } = e.target;
        setInputs({
            ...inputs, [name]: value
        });
    }

    // function to validate form inputs
    const validateForm=()=>{
        let regexLid=/^[a-zA-Z0-9-]+$/
        let regexName=/^[a-zA-Z\s]+$/
        if(!regexLid.test(inputs.learnerid)){
            setDisplayLid(true);
            return false;
        }
        else if(!regexName.test(inputs.name)){
            setDisplayNamewarn(true);
            return false;
        }
        else if(inputs.course.length===0){
            setDisplayCwarn(true);
            return false;
        }
        else if(inputs.project.length===0){
            setDisplayProwarn(true);
            return false;
        } 
        else if(inputs.batch.length===0){
            setDisplayBwarn(true);
            return false;
        }
        else if(inputs.cstatus.length===0){
            setDisplayCswarn(true);
            return false;
        }
        else{
            return true;
        }
      };

    // function to handle from inputs when submit button is clicked
    const submitHandler = () => {
        if (!validateForm()) {
            return; 
          }

        let data = {
            userId: userID,
            token: userToken,
            role: userRole,
            learnerid: inputs.learnerid,
            name: inputs.name,
            course: inputs.course,
            project: inputs.project,
            batch: inputs.batch,
            cstatus: inputs.cstatus,
            pstatus: inputs.pstatus

        }

        // post function
        if (props.method === "post") {
            axios.post(`https://learnertracker.onrender.com/api/postldata`, data)
                .then((response) => {
                    if (response.data.message === "Posted successfully") {
                        console.log("response post", response);
                        Swal.fire('', response.data.message, 'success');
                        navigate('/thome');
                    }
                    else {
                        Swal.fire('Sorry', response.data.message, '');
                    }
                })
                .catch((err) => { console.log(err) })
        }
        // update function
        if (props.method === "put") {
            axios.put(`https://learnertracker.onrender.com/api/putldata/${inputs._id}`, data)
                .then((response) => {
                    if (response.data.message === "Updated successfully") {
                        Swal.fire('', response.data.message, 'success');
                        window.location.reload(false);
                    }
                    else {
                        Swal.fire('Sorry', response.data.message, '');
                    }
                })
                .catch((err) => { console.log(err) })
        }
    }
    // to authenticate
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
            {/* Learners form */}
            <div className="container w-50 mt-5 pt-5  bg-secondary-subtle rounded">
                <h3>Learner's form</h3>
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-2">
                            {/* LearnerId */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="learnerid" className="form-label">Learner Id :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <input type="text"
                                            id="learnerid"
                                            className="form-control"
                                            name="learnerid"
                                            value={inputs.learnerid}
                                            onChange={inputHandler}
                                        />
                                        {displayLid?<p className="fw-light fst-italic text-start text-danger">Must contain letters,numbers and - only</p>:<p></p>}
                                    </div>
                                </div>
                            </div>
                            {/* Name of learner */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="name" className="form-label">Name :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <input type="text"
                                            id="name"
                                            className="form-control"
                                            name="name"
                                            value={inputs.name}
                                            onChange={inputHandler}
                                        />
                                        {displayNamewarn?<p className="fw-light fst-italic text-start text-danger">Must contain letters only</p>:<p></p>}
                                    </div>
                                </div>
                            </div>
                            {/* Course  */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="course" className="form-label">Course :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <select className="form-select required"
                                            aria-label="Default select example"
                                            name="course"
                                            value={inputs.course}
                                            onChange={inputHandler}>
                                            <option defaultValue></option>
                                            <option value="FSD">FSD</option>
                                            <option value="DSA">DSA</option>
                                            <option value="ML-AI">ML-AI</option>
                                            <option value="RPA">RPA</option>
                                            <option value="ST">ST</option>
                                            <option value="CSA">CSA</option>
                                        </select>
                                        {displayCwarn?<p className="fw-light fst-italic text-start text-danger">Please select a course for the learner</p>:<p></p>}
                                    </div>
                                </div>
                            </div>
                            {/* Project  */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="project" className="form-label">Project :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <select className="form-select required"
                                            aria-label="Default select example"
                                            name="project"
                                            value={inputs.project}
                                            onChange={inputHandler}>
                                            <option defaultValue></option>
                                            <option value="ICTAK">ICTAK</option>
                                            <option value="KKEM">KKEM</option>
                                            <option value="NORKA">NORKA</option>
                                            <option value="ABCD">ABCD</option>
                                            <option value="KDISC">KDISC</option>
                                        </select>
                                        {displayProwarn?<p className="fw-light fst-italic text-start text-danger">Please select a project for the learner</p>:<p></p>}
                                    </div>
                                </div>
                            </div>
                            {/* Batch  */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="batch" className="form-label">Batch :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <select className="form-select required"
                                            aria-label="Default select example"
                                            name="batch"
                                            value={inputs.batch}
                                            onChange={inputHandler}>
                                            <option selected></option>
                                            <option value="May_22">May_22</option>
                                            <option value="Jun_22">Jun_22</option>
                                            <option value="Jul_22">Jul_22</option>
                                            <option value="Aug_22">Aug_22</option>
                                            <option value="Dec_22">Dec_22</option>
                                            <option value="Mar_23">Mar_23</option>
                                        </select>
                                        {displayBwarn?<p className="fw-light fst-italic text-start text-danger">Please select a batch for the learner</p>:<p></p>}
                                    </div>
                                </div>
                            </div>

                            {/* Course  Status*/}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="course" className="form-label">Course Status :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <select className="form-select required"
                                            aria-label="Default select example"
                                            name="cstatus"
                                            value={inputs.cstatus}
                                            onChange={inputHandler}>
                                            <option defaultValue></option>
                                            <option value="Qualified">Qualified</option>
                                            <option value="Incompetent">Incompetent</option>
                                        </select>
                                        {displayCswarn?<p className="fw-light fst-italic text-start text-danger">Please select the course status of the learner</p>:<p></p>}
                                    </div>
                                </div>
                            </div>

                            {/* Button*/}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    {/* offset */}
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                    </div>
                                    {/* Button Submit*/}
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                        <button className="btn btn-success" onClick={submitHandler}>Submit</button>
                                    </div>
                                    {/* Button */}
                                    <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3">
                                        <a href="/thome"><button className="btn btn-warning">Back to Dashboard</button></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainerAdd
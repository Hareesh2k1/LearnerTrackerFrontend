import './App.css';
import { Route, Routes } from 'react-router-dom';
import TrainerHome from './components/TrainerHome';
import TrainerAdd from './components/TrainerAdd';
import PlacementHome from './components/PlacementHome'
import Login from './components/Login';
import Main from './components/Main';
import AdminHome from './components/AdminHome';
import AdminAdd from './components/AdminAdd';
import Sidebar from './components/Sidebar';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/thome" element={<Main child={<TrainerHome />} />} />
        <Route path="/phome" element={<Main child={<PlacementHome />} />} />
        <Route path="/tadd" element={<Main child={<TrainerAdd method="post" data={
          {
            learnerid: "",
            name: "",
            course: "",
            project: "",
            batch: "",
            cstatus: ""
          }
        } />} />} />
        <Route path="/ahome" element={<Main child={<AdminHome />} />} />
        <Route path="/aadd" element={<Main child={<AdminAdd method="post" data={
          {
            name: "",
            email: "",
            username: "",
            password: "",
            roleInputs: ""
          }
        } />} />} />
        <Route path="/upload" element={<Main child={<Upload/>} />} />
        <Route path="/sidebar" element={<Sidebar/>} />
      </Routes>
    </div>
  );
}

export default App;

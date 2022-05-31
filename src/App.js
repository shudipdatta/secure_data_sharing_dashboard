import './App.css';
import Home from './Home';
import ManageMissions from './ManageMissions';
import ManageUsers from './ManageUsers';
import AddUser from './AddUser'
import AddMission from './AddMission'
import UpdateMission from './UpdateMission';
import UpdateUser from './UpdateUser';
import 'react-pro-sidebar/dist/css/styles.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { BsFillHouseFill, BsFillPersonFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
        <ProSidebar>
          <SidebarHeader>
            <div className="logotext">
              <p> Central Authority Demo </p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<BsFillHouseFill />}>
                Home
                <Link to="/home" />
              </MenuItem>
              <SubMenu title="Users" icon={<BsFillPersonFill />}>
                <MenuItem>
                  Manage Users
                  <Link to="/manageUsers" />
                </MenuItem>
                <MenuItem>
                  Add User
                  <Link to="/addUser" />
                </MenuItem>
              </SubMenu>
              <SubMenu title="Missions" icon={<FaClipboardList />}>
                <MenuItem>
                  Manage Missions
                  <Link to="/manageMissions" />
                </MenuItem>
                <MenuItem>
                  Add Mission
                  <Link to="/addMission" />
                </MenuItem>
              </SubMenu>
            </Menu>
          </SidebarContent>
        </ProSidebar>

        <Route path="/home" component={Home} />
        <Route path="/manageMissions" component={ManageMissions} />
        <Route path="/addMission" component={AddMission} />
        <Route path="/manageUsers" component={ManageUsers} />
        <Route path="/addUser" component={AddUser} />
        <Route path="/updateMission" component={UpdateMission} />
        <Route path="/updateUser" component={UpdateUser} />
      </div>
    </Router>
  );
}

export default App;

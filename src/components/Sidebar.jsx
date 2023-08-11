import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom'
import "../App.css"
import ictlogo from "../ictlogo.png";

const Sidebar = () => {
  const [userRole, setUserrole] = useState(sessionStorage.getItem("userRole"));
  let ActiveLink = 'activeLink'
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>

      <CDBSidebar textColor="#fff" backgroundColor="#000">
        {/* Header of the Sidebar */}
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>
            <img src={ictlogo} alt="logo" style={{ height: '3vmin' }} /> ICTAK
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {/* Users Link */}
            <NavLink
              exact
              to="/ahome"
              isActive={({ match }) => match}
              className={userRole === 'Admin' ? ActiveLink : ''}
            >
              {userRole === 'Admin' && (
              <>
                <CDBSidebarMenuItem className={userRole === 'Admin' ? ActiveLink : ''} icon="users">
                  Users
                </CDBSidebarMenuItem>
              </>
              )}
            </NavLink>

            {/* Learners Link */}
            <NavLink
              exact
              to="/thome"
              isActive={({ match }) => match}
              className={userRole !== 'Placement Officer' ? ActiveLink : ''}
            >
              {userRole !== 'Placement Officer' && (
              <>
                  <CDBSidebarMenuItem className={userRole !== 'Placement Officer' ? ActiveLink : ''} icon="book">
                    Learners
                  </CDBSidebarMenuItem>
              </>
              )}
            </NavLink>
            
            {/* Placement Link */}
            <NavLink
              exact
              to="/phome"
              isActive={({ match }) => match}
              className={userRole !== 'Training Head' ? ActiveLink : ''}
            >
            {userRole !== 'Training Head' && (
            <>
              <CDBSidebarMenuItem className={userRole !== 'Training Head' ? ActiveLink : ''} icon="briefcase">
                Placement
              </CDBSidebarMenuItem>
            </>
            )}
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>

      </CDBSidebar>
    </div>
  )
}

export default Sidebar
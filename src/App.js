//CSS
import React from 'react';

// Components
import Header from "./dutch_admin/components/layouts/Header";
import Home from "./dutch_admin/pages/Home";
import Notes from "./dutch_admin/pages/Notes";
import NotesList from "./dutch_admin/pages/Notes/list";
import Users from "./dutch_admin/pages/Users";
import UsersList from "./dutch_admin/pages/Users/list";
import Masters from "./dutch_admin/pages/Masters";
import MastersList from "./dutch_admin/pages/Masters/list";
import Inwards from "./dutch_admin/pages/Inwards/index";
import InwardsList from "./dutch_admin/pages/Inwards/list";
import Inters from "./dutch_admin/pages/Inters/index";
import IntersList from "./dutch_admin/pages/Inters/list";
import Outwards from "./dutch_admin/pages/Outwards/index";
import OutwardsList from "./dutch_admin/pages/Outwards/list";
import LogList from "./dutch_admin/pages/Log/list";

// import Godowns from "./dutch_admin/pages/Godowns";
// import Entries from "./dutch_admin/pages/Entries";
import Preloader from "./dutch_admin/components/layouts/Preloader";
import Sidebar from "./dutch_admin/components/layouts/Sidebar";
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import Authorization from './dutch_admin/auth/Authorization';
import Authentication from './dutch_admin/auth/Authentication';
import Login from './dutch_admin/pages/Login';
import PERMISSIONS from './dutch_admin/permissions/Permissions';
import { useAuth } from './dutch_admin/provider/AuthProvider';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showPreload: true };
  }

  tick() {
    this.setState(state => ({
      showPreload: false
    }));
  }

  componentDidMount() {
    setInterval(() => this.tick(), 500);
    document.body.dataset.typography = 'poppins';
    document.body.dataset.themeVersion = 'dutch';
    document.body.dataset.layout = 'vertical';
    document.body.dataset.navHeaderbg = 'color_1';
    document.body.dataset.headerbg = 'color_1';
    document.body.dataset.sidebarStyle = 'full';
    document.body.dataset.sibebarbg = 'color_1';
    document.body.dataset.sidebarPosition = 'fixed';
    document.body.dataset.headerPosition = 'fixed';
    document.body.dataset.container = 'wide';
    document.body.dataset.direction = 'rtl';
  }

  render() {
    return (
      <div>
        {this.state.showPreload ? <Preloader /> : null}
        {!this.state.showPreload ? <Mainwrapper /> : null}
      </div >
    );
  }
}


// class Mainwrapper extends React.Component {

//   render() {
//     return (
//       <div id="main-wrapper" className="show">
//         <Header hamActive={this.state.hamActive} />
//         <Sidebar />
//         <Routes>
//           <Route path="/" element={ <Authentication><Home /></Authentication>} />
//           <Route path="about" element={ <Authentication><About /></Authentication>} />
//         </Routes>
//       </div>
//     )
//   }
// }


const Mainwrapper = () => {
  const hamActive = useSelector(state => state.hamActive);
  const { user } = useAuth();

  return (
    <div id="main-wrapper" className={classnames("show", hamActive ? 'menu-toggle' : '')}>
      {
        (user && user.token) ?
          <>
            <Header />
            <Sidebar />
          </>
          : ""
      }
      <Routes>
        <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_DASHBOARD]} />}>
          <Route path="/" element={<Authentication><Home /></Authentication>} />
        </Route>;

        <Route path="/notes" element={<Authentication><Notes /></Authentication>} />
        <Route path="notes/list" element={<Authentication><NotesList /></Authentication>} />



        <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_USER]} />}>
          <Route path="users" element={<Authentication><Users /></Authentication>} />
          <Route path="users/list" element={<Authentication><UsersList /></Authentication>} />
          <Route path="users/:id" element={<Authentication><Users /></Authentication>} />
        </Route>;

        <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_INWARD,
        PERMISSIONS.CAN_VIEW_OUTWARD, PERMISSIONS.CAN_VIEW_INTER]} />}>
          <Route path="inwards" element={<Authentication><Inwards /></Authentication>} />
          <Route path="/inwards/list" element={<Authentication><InwardsList /></Authentication>} />
          <Route path="inwards/list/:data" element={<Authentication><InwardsList /></Authentication>} />
          <Route path="inwards/:id" element={<Authentication><Inwards /></Authentication>} />
          <Route path="inwards/:id/view" element={<Authentication><Inwards /></Authentication>} />

          <Route path="inters" element={<Authentication><Inters /></Authentication>} />
          <Route path="/inters/list" element={<Authentication><IntersList /></Authentication>} />
          <Route path="inters/list/:data" element={<Authentication><IntersList /></Authentication>} />
          <Route path="inters/:id" element={<Authentication><Inters /></Authentication>} />
          <Route path="inters/:id/view" element={<Authentication><Inters /></Authentication>} />

          <Route path="outwards" element={<Authentication><Outwards /></Authentication>} />
          <Route path="outwards/list" element={<Authentication><OutwardsList /></Authentication>} />
          <Route path="outwards/list/:data" element={<Authentication><OutwardsList /></Authentication>} />
          <Route path="outwards/:id" element={<Authentication><Outwards /></Authentication>} />
          <Route path="outwards/:id/view" element={<Authentication><Outwards /></Authentication>} />
        </Route>;


        <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_LOCATION]} />}>
          <Route path="location" element={<Authentication><Masters master="location" /></Authentication>} />
          <Route path="location/list" element={<Authentication><MastersList master="location" /></Authentication>} />
          <Route path="location/:id" element={<Authentication><Masters master="location" /></Authentication>} />
        </Route>;

        <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_ITEM]} />}>
          <Route path="item" element={<Authentication><Masters master="item" /></Authentication>} />
          <Route path="item/list" element={<Authentication><MastersList master="item" /></Authentication>} />
          <Route path="item/:id" element={<Authentication><Masters master="item" /></Authentication>} />
        </Route>;

        <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_STORAGELOCATION]} />}>
          <Route path="storage_location" element={<Authentication><Masters master="storage_location" /></Authentication>} />
          <Route path="storage_location/list" element={<Authentication><MastersList master="storage_location" /></Authentication>} />
          <Route path="storage_location/:id" element={<Authentication><Masters master="storage_location" /></Authentication>} />
        </Route>;

        <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_QCNAME]} />}>
          <Route path="qc_name" element={<Authentication><Masters master="qc_name" /></Authentication>} />
          <Route path="qc_name/list" element={<Authentication><MastersList master="qc_name" /></Authentication>} />
          <Route path="qc_name/:id" element={<Authentication><Masters master="qc_name" /></Authentication>} />
        </Route>;

        <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_SUPPLIER]} />}>
          <Route path="supplier" element={<Authentication><Masters master="supplier" /></Authentication>} />
          <Route path="supplier/list" element={<Authentication><MastersList master="supplier" /></Authentication>} />
          <Route path="supplier/:id" element={<Authentication><Masters master="supplier" /></Authentication>} />
        </Route>;


        <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_LOG]} />}>
          <Route path="/logs/list" element={<Authentication><LogList /></Authentication>} />
        </Route>;


        <Route path="login" element={<Login />} />

        {/* <Route path="godowns" element={ <Authentication><Godowns /></Authentication>} />
        <Route path="items" element={ <Authentication><Items /></Authentication>} />
        <Route path="entries" element={ <Authentication><Entries /></Authentication>} /> */}
      </Routes>
    </div>
  )

}

// const mapStateToProps = state => ({
//   ...state
// });


// export default connect(mapStateToProps)(App);
export default App;
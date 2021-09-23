import logo from "./logo.svg";
// import "./App.css";

import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiText,
  EuiPanel,
} from "@elastic/eui";

import { Table } from "./Components/Table";
import { UsersTable } from "./Components/UsersTable";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Sidenav } from "./Components/Sidenav";

function App() {
  return (
    <Router>
      <div className="App" style={{ overflow: "visible", flexShrink: 0 }}>
        <div
          style={{ position: "sticky", maxHeight: "100vh", top: 0, zIndex: 99 }}
        >
          <EuiPanel>
            <EuiText>
              <h1>Super-admin Dashboard</h1>
            </EuiText>
          </EuiPanel>
        </div>

        <EuiPage paddingSize="none">
          <EuiPageSideBar
            paddingSize="s"
            sticky
            style={{ top: 60, bottom: 0, minWidth: 150 }}
          >
            <Sidenav />
          </EuiPageSideBar>

          <EuiPageBody panelled>
            {/* <EuiPageHeader
          restrictWidth={'75%'}
          iconType="logoElastic"
          pageTitle="Page title"
          rightSideItems={[button]}
          description="Restricting the width to 75%."
        /> */}

            <EuiPageContent
              hasBorder={false}
              hasShadow={false}
              paddingSize="none"
              color="transparent"
              borderRadius="none"
            >
              <EuiPageContentBody restrictWidth={"100%"}>
                <Switch>
                  <Route path="/organizations">
                    <Table />
                  </Route>
                  <Route path="/users">
                    <UsersTable />
                  </Route>
                </Switch>
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      </div>
    </Router>
  );
}

export default App;

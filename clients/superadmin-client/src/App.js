import logo from "./logo.svg";
// import "./App.css";

import { EuiText, EuiPanel } from "@elastic/eui";

import { Table } from "./Components/Table";

function App() {
  return (
    <div className="App">
      <EuiPanel>
        {" "}
        <EuiText>
          <h1>Super-admin Dashboard</h1>
        </EuiText>
      </EuiPanel>

      <Table />
    </div>
  );
}

export default App;

import logo from "./logo.svg";
// import "./App.css";

import { EuiText, EuiPanel } from "@elastic/eui";

import { Table2 } from "./Components/Table2";

function App() {
  return (
    <div className="App">
      <EuiPanel>
        {" "}
        <EuiText>
          <h1>Super-admin Dashboard</h1>
        </EuiText>
      </EuiPanel>

      <Table2 />
    </div>
  );
}

export default App;

import React, { useState, useCallback } from "react";

import {
  EuiListGroup,
  EuiListGroupItem,
  EuiSpacer,
  EuiSwitch,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";

import { Link, useHistory } from "react-router-dom";
export const Sidenav = () => {
  const history = useHistory();

  const handleOnClickHome = useCallback(() => history.push("/"), [history]);

  const handleOnClickOrganizations = useCallback(
    () => history.push("/organizations"),
    [history]
  );

  const handleOnClickUsers = useCallback(
    () => history.push("/users"),
    [history]
  );

  return (
    <div>
      <EuiSpacer />
      <EuiListGroup>
        <EuiListGroupItem onClick={handleOnClickHome} label="HOME" />
        <EuiListGroupItem
          onClick={handleOnClickOrganizations}
          label="Organizations"
        />
        <EuiListGroupItem onClick={handleOnClickUsers} label="Users" />
      </EuiListGroup>
    </div>
  );
};

import { formatDate } from "@elastic/eui";
import React, { useState, useEffect, useCallback } from "react";

import {
  EuiText,
  EuiPanel,
  EuiBasicTable,
  EuiLink,
  EuiHealth,
  EuiButton,
} from "@elastic/eui";

const axios = require("axios").create({
  baseURL: "http://localhost:5000/",
  timeout: 1000,
});

const users = [
  {
    id: "1",
    firstName: "john",
    lastName: "doe",
    github: "johndoe",
    dateOfBirth: Date.now(),
    nationality: "NL",
    online: true,
  },
  {
    id: "2",
    firstName: "adam",
    lastName: "smith",
    github: "asmith",
    dateOfBirth: Date.now(),
    nationality: "UK",
    online: true,
  },
];
export const Table = () => {
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [isRefreshBtnLoading, setIsRefreshBtnLoading] = useState(false);

  useEffect(() => {
    setIsRefreshBtnLoading(true);

    axios({
      method: "GET",
      url: "api/organization",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        setAllOrganizations(response.data);
        setIsRefreshBtnLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsRefreshBtnLoading(false);
      });
  }, []);

  const fetchRequest = useCallback(async () => {
    setIsRefreshBtnLoading(true);

    await axios({
      method: "GET",
      url: "api/organization",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          setAllOrganizations(response.data);
          setIsRefreshBtnLoading(false);
        }, 500); // articially slow down the request to show loading spinner
      })
      .catch((error) => {
        console.log(error);
        setIsRefreshBtnLoading(false);
      });
  }, []);

  const columns = [
    {
      field: "id",
      name: "UUID",
      sortable: true,
      "data-test-subj": "organizationUuidCell",
      render: (id) => id,
    },
    {
      field: "name",
      name: "Name",
      sortable: true,
      "data-test-subj": "organizationNameCell",
      render: (name) => name,
    },

    {
      field: "slug",
      name: "Slug",
      sortable: false,
      "data-test-subj": "organizationSlugCell",
      render: (slug) => slug,
    },
  ];

  const items = users;

  const getRowProps = (item) => {
    const { id } = item;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
      onClick: () => {},
    };
  };

  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: "customCellClass",
      "data-test-subj": `cell-${id}-${field}`,
      textOnly: true,
    };
  };

  return (
    <div style={{ margin: "3rem" }}>
      <EuiButton
        iconType="refresh"
        isLoading={isRefreshBtnLoading}
        onClick={fetchRequest}
      >
        Refresh
      </EuiButton>
      <EuiText>
        <h2>Table</h2>
      </EuiText>
      <EuiPanel>
        <EuiBasicTable
          items={allOrganizations}
          rowHeader="firstName"
          columns={columns}
          rowProps={getRowProps}
          cellProps={getCellProps}
        />
      </EuiPanel>
    </div>
  );
};

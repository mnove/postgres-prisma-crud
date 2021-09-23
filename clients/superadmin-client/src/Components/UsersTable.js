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
import { Flyout } from "./Flyout";

const axios = require("axios").create({
  baseURL: "http://localhost:5000/",
});

export const UsersTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isRefreshBtnLoading, setIsRefreshBtnLoading] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [flyoutId, setFlyoutId] = useState("");
  const [flyoutData, setFlyoutData] = useState({});

  useEffect(() => {
    setIsRefreshBtnLoading(true);

    axios({
      method: "GET",
      url: "api/user",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        setAllUsers(response.data);
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
      url: "api/user",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          setAllUsers(response.data);
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
      truncateText: true,
      sortable: true,
      width: "15%",
      "data-test-subj": "organizationUuidCell",
      render: (id) => id,
    },
    {
      field: "first_name",
      name: "First Name",
      sortable: false,
      truncateText: true,
      "data-test-subj": "organizationFirstNameCell",
      render: (first_name) => first_name,
    },

    {
      field: "last_name",
      name: "Last Name",
      sortable: false,
      truncateText: true,
      "data-test-subj": "organizationLastNameCell",
      render: (last_name) => last_name,
    },

    {
      field: "email",
      name: "Email",
      sortable: false,
      truncateText: false,
      "data-test-subj": "organizationEmailCell",
      render: (email) => email,
    },
    {
      field: "phone_number",
      name: "Phone",
      sortable: false,
      truncateText: true,
      "data-test-subj": "organizationPhoneNumberCell",
      render: (phone_number) => phone_number,
    },
    {
      field: "created_at",
      name: "Created At",
      sortable: false,
      "data-test-subj": "organizationCreatedAtCell",
      render: (created_at) => created_at,
    },

    {
      field: "updated_at",
      name: "Updated At",
      sortable: false,
      "data-test-subj": "organizationUpdatedAtCell",
      render: (updated_at) => updated_at,
    },
    {
      name: "Actions",
      actions: [
        {
          name: "Clone",
          description: "Edit this person",
          type: "icon",
          icon: "indexEdit",
          onClick: (item) => {
            setFlyoutId(item.id);
            setFlyoutData(item);
            setIsFlyoutVisible(true);
          },
        },
      ],
    },
  ];

  const getRowProps = (item) => {
    const { id } = item;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
      // onClick: () => console.log(`clicked ${id}`),
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
      {/* <EuiButton onClick={() => setIsFlyoutVisible(true)}>
        Show flyout
      </EuiButton> */}

      <Flyout
        isFlyoutVisible={isFlyoutVisible}
        setIsFlyoutVisible={setIsFlyoutVisible}
        flyoutId={flyoutId}
        flyoutData={flyoutData}
      />

      <EuiButton
        iconType="refresh"
        isLoading={isRefreshBtnLoading}
        onClick={fetchRequest}
      >
        Refresh
      </EuiButton>
      <EuiText>
        <h2>Users</h2>
      </EuiText>
      <EuiPanel>
        <EuiBasicTable
          items={allUsers}
          rowHeader="firstName"
          columns={columns}
          rowProps={getRowProps}
          cellProps={getCellProps}
        />
      </EuiPanel>
    </div>
  );
};

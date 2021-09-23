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

export const Table = () => {
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [isRefreshBtnLoading, setIsRefreshBtnLoading] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [flyoutId, setFlyoutId] = useState("");
  const [flyoutData, setFlyoutData] = useState({});

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
      truncateText: false,
      sortable: true,
      width: "30%",
      "data-test-subj": "organizationUuidCell",
      render: (id) => id,
    },
    {
      field: "name",
      name: "Name",
      sortable: true,
      truncateText: true,
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

    {
      field: "planId",
      name: "Plan ID",
      sortable: false,
      "data-test-subj": "organizationPlanIdCell",
      render: (planId) => planId,
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
        <h2>Organizations</h2>
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

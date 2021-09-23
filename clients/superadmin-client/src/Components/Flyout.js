import React, { useEffect, useState } from "react";

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
  EuiText,
  EuiTitle,
  EuiCodeBlock,
  EuiFlyoutFooter,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
} from "@elastic/eui";

const axios = require("axios").create({
  baseURL: "http://localhost:5000/",
});

export const Flyout = ({
  isFlyoutVisible,
  setIsFlyoutVisible,
  flyoutId,
  flyoutData,
}) => {
  //   const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  let flyout;
  console.log(flyoutData);

  const [organizationName, setOrganizationName] = useState("");
  const [organizationSlug, setOrganizationSlug] = useState("");
  const [organizationPlanId, setOrganizationPlanId] = useState(null);
  const [isSaveBtnLoading, setIsSaveBtnLoading] = useState(false);

  console.log(organizationName);

  //   const handleGetOrganization = async () => {
  //     const data = await axios({
  //       method: "GET",
  //       url: `api/organization/${flyoutId}`,
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then((response) => {
  //         console.log(response);
  //         setOrganization(data); // todo DO!!!
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   useEffect(() => {
  //     handleGetOrganization();
  //   }, []);

  useEffect(() => {
    setOrganizationName(flyoutData.name);
    setOrganizationSlug(flyoutData.slug);
    setOrganizationPlanId(flyoutData.planId);
    console.log(flyoutData.planId);
  }, [flyoutData.name]);

  useEffect(() => {
    console.log("I HAVE BEEN RENDERED");
  }, []);

  const handleNameChange = (e) => {
    setOrganizationName(e.target.value);
  };

  const handleSlugChange = (e) => {
    setOrganizationSlug(e.target.value);
  };

  const handlePlanIdChange = (e) => {
    setOrganizationPlanId(e.target.value);
  };

  const handleSave = async () => {
    let newData = {
      id: flyoutId,
      name: organizationName,
      slug: organizationSlug,
      planId: organizationPlanId,
    };

    console.log(newData);
    setIsSaveBtnLoading(true);
    await axios({
      method: "PUT",
      url: "api/organization",
      data: newData,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          //   setAllOrganizations(response.data);
          setIsSaveBtnLoading(false);
        }, 500); // articially slow down the request to show loading spinner
      })
      .catch((error) => {
        console.log(error);
        setIsSaveBtnLoading(false);
      });
  };

  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby="flyoutTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiText size="m">
            <p style={{ marginBottom: "0.5rem" }}>
              Editing:{" "}
              <span style={{ fontSize: "2rem" }}>{organizationName}</span>
            </p>
            <p>Organization ID: {flyoutId} </p>
          </EuiText>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>Edit Organization</p>
          </EuiText>
          <EuiSpacer />
          <div>
            <EuiForm component="form">
              <EuiFormRow label="Name" helpText="Required!">
                <EuiFieldText
                  name="name"
                  isInvalid={""}
                  value={organizationName}
                  onChange={handleNameChange}
                />
              </EuiFormRow>
              <EuiFormRow label="Slug" helpText="Required!">
                <EuiFieldText
                  name="slug"
                  isInvalid={""}
                  value={organizationSlug}
                  onChange={handleSlugChange}
                />
              </EuiFormRow>
              <EuiFormRow label="Plan ID" helpText="Required!">
                <EuiFieldText
                  name="planId"
                  isInvalid={""}
                  value={organizationPlanId}
                  onChange={handlePlanIdChange}
                />
              </EuiFormRow>
            </EuiForm>
          </div>
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>dd</EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton
                onClick={handleSave}
                iconType="save"
                isLoading={isSaveBtnLoading}
              >
                Save
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }

  return <div>{flyout}</div>;
};

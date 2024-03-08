/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createNote } from "../graphql/mutations";
const client = generateClient();
export default function NoteCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    noteID: "",
    noteTitle: "",
    noteDescription: "",
    noteImage: "",
    tag: "",
  };
  const [noteID, setNoteID] = React.useState(initialValues.noteID);
  const [noteTitle, setNoteTitle] = React.useState(initialValues.noteTitle);
  const [noteDescription, setNoteDescription] = React.useState(
    initialValues.noteDescription
  );
  const [noteImage, setNoteImage] = React.useState(initialValues.noteImage);
  const [tag, setTag] = React.useState(initialValues.tag);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setNoteID(initialValues.noteID);
    setNoteTitle(initialValues.noteTitle);
    setNoteDescription(initialValues.noteDescription);
    setNoteImage(initialValues.noteImage);
    setTag(initialValues.tag);
    setErrors({});
  };
  const validations = {
    noteID: [],
    noteTitle: [],
    noteDescription: [],
    noteImage: [],
    tag: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          noteID,
          noteTitle,
          noteDescription,
          noteImage,
          tag,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createNote.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NoteCreateForm")}
      {...rest}
    >
      <TextField
        label="Note id"
        isRequired={false}
        isReadOnly={false}
        value={noteID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              noteID: value,
              noteTitle,
              noteDescription,
              noteImage,
              tag,
            };
            const result = onChange(modelFields);
            value = result?.noteID ?? value;
          }
          if (errors.noteID?.hasError) {
            runValidationTasks("noteID", value);
          }
          setNoteID(value);
        }}
        onBlur={() => runValidationTasks("noteID", noteID)}
        errorMessage={errors.noteID?.errorMessage}
        hasError={errors.noteID?.hasError}
        {...getOverrideProps(overrides, "noteID")}
      ></TextField>
      <TextField
        label="Note title"
        isRequired={false}
        isReadOnly={false}
        value={noteTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              noteID,
              noteTitle: value,
              noteDescription,
              noteImage,
              tag,
            };
            const result = onChange(modelFields);
            value = result?.noteTitle ?? value;
          }
          if (errors.noteTitle?.hasError) {
            runValidationTasks("noteTitle", value);
          }
          setNoteTitle(value);
        }}
        onBlur={() => runValidationTasks("noteTitle", noteTitle)}
        errorMessage={errors.noteTitle?.errorMessage}
        hasError={errors.noteTitle?.hasError}
        {...getOverrideProps(overrides, "noteTitle")}
      ></TextField>
      <TextField
        label="Note description"
        isRequired={false}
        isReadOnly={false}
        value={noteDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              noteID,
              noteTitle,
              noteDescription: value,
              noteImage,
              tag,
            };
            const result = onChange(modelFields);
            value = result?.noteDescription ?? value;
          }
          if (errors.noteDescription?.hasError) {
            runValidationTasks("noteDescription", value);
          }
          setNoteDescription(value);
        }}
        onBlur={() => runValidationTasks("noteDescription", noteDescription)}
        errorMessage={errors.noteDescription?.errorMessage}
        hasError={errors.noteDescription?.hasError}
        {...getOverrideProps(overrides, "noteDescription")}
      ></TextField>
      <TextField
        label="Note image"
        isRequired={false}
        isReadOnly={false}
        value={noteImage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              noteID,
              noteTitle,
              noteDescription,
              noteImage: value,
              tag,
            };
            const result = onChange(modelFields);
            value = result?.noteImage ?? value;
          }
          if (errors.noteImage?.hasError) {
            runValidationTasks("noteImage", value);
          }
          setNoteImage(value);
        }}
        onBlur={() => runValidationTasks("noteImage", noteImage)}
        errorMessage={errors.noteImage?.errorMessage}
        hasError={errors.noteImage?.hasError}
        {...getOverrideProps(overrides, "noteImage")}
      ></TextField>
      <TextField
        label="Tag"
        isRequired={false}
        isReadOnly={false}
        value={tag}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              noteID,
              noteTitle,
              noteDescription,
              noteImage,
              tag: value,
            };
            const result = onChange(modelFields);
            value = result?.tag ?? value;
          }
          if (errors.tag?.hasError) {
            runValidationTasks("tag", value);
          }
          setTag(value);
        }}
        onBlur={() => runValidationTasks("tag", tag)}
        errorMessage={errors.tag?.errorMessage}
        hasError={errors.tag?.hasError}
        {...getOverrideProps(overrides, "tag")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

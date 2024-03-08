/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserInfoCreateFormInputValues = {
    EmailID?: string;
    FullName?: string;
};
export declare type UserInfoCreateFormValidationValues = {
    EmailID?: ValidationFunction<string>;
    FullName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserInfoCreateFormOverridesProps = {
    UserInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    EmailID?: PrimitiveOverrideProps<TextFieldProps>;
    FullName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: UserInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserInfoCreateFormInputValues) => UserInfoCreateFormInputValues;
    onSuccess?: (fields: UserInfoCreateFormInputValues) => void;
    onError?: (fields: UserInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserInfoCreateFormInputValues) => UserInfoCreateFormInputValues;
    onValidate?: UserInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserInfoCreateForm(props: UserInfoCreateFormProps): React.ReactElement;

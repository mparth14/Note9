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
export declare type UserInfoUpdateFormInputValues = {
    EmailID?: string;
    FullName?: string;
};
export declare type UserInfoUpdateFormValidationValues = {
    EmailID?: ValidationFunction<string>;
    FullName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserInfoUpdateFormOverridesProps = {
    UserInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    EmailID?: PrimitiveOverrideProps<TextFieldProps>;
    FullName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userInfo?: any;
    onSubmit?: (fields: UserInfoUpdateFormInputValues) => UserInfoUpdateFormInputValues;
    onSuccess?: (fields: UserInfoUpdateFormInputValues) => void;
    onError?: (fields: UserInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserInfoUpdateFormInputValues) => UserInfoUpdateFormInputValues;
    onValidate?: UserInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserInfoUpdateForm(props: UserInfoUpdateFormProps): React.ReactElement;

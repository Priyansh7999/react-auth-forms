export type RegistrationDetails = {
  name: string;
  email: string;
  password: string;
};

export type LoginDetails = {
  email: string;
  password: string;
};
export type FormInputFieldProps = {
    label: string,
    type: string,
    name: string
}
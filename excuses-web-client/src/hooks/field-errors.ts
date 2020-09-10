// Field error helper for react-hook-forms

/* Hook usage:
    Pass the following into setFieldErrors():

    * validationErrors (object): from react-hook-form
    * fieldName (string): name of field being validated
    * validationRules (Array<object>): [{
      type: matches the validation that was registered with react-hook-form
      message: the validation message for that type of validation
    }]

// Example code

  const setFieldErrors = useSetFieldErrors();
  const { register, handleSubmit, watch, errors: validationErrors } = useForm<IFormValues>();

  const passwordFieldErrors = setFieldErrors({
    validationErrors,
    fieldName: 'password',
    validationRules: [
      { type: "required", message: "password is required" },
      { type: "minLength", message: "password 6 characters long" },
    ],
  });

  // render

  <LoginInputField
    inputRef={register({ required: true,  minLength: 6 })}
    type="password"
    name="password"
    placeholder="Password"
    label="password"
    validationText={ passwordFieldErrors.text }
    state={ passwordFieldErrors.state }
  />
*/

export const useSetFieldErrors = () => {
  return (payload: ISetFieldErrors): IFieldError => {
    const { validationErrors, fieldName, validationRules } = payload;
    const fieldErrors = validationErrors[fieldName];

    if(fieldErrors) {
      const errorMessage = validationRules
        .filter(validate => validate.type === fieldErrors.type)
        .map(validate => { return validate.message })[0];
  
      if(errorMessage) {
        return {
          text: errorMessage,
          state: "danger",
        }
      }
    }
  
    return {
      text: "",
      state: undefined
    }
  }
};

interface IFieldError {
  text: string
  state: "success" | "warning" | "danger" | undefined
}

// These keys are what react-hook-form make available to us
// https://react-hook-form.com/get-started/#Applyvalidation
type IReactHooksValidationRules = "required" | "min" | "max" | "minLength" | "maxLength" | "pattern" | "validate";

interface IValidationRules {
  type: IReactHooksValidationRules,
  message: string,
}

interface validationErrorKeys {
  [key: string]: any; // Idk :/ must be a better way to do this
}

interface ISetFieldErrors {
  validationErrors: validationErrorKeys;
  fieldName: string;
  validationRules: Array<IValidationRules>;
}

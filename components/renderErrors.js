import errorLabel from "../main";
import { inputField } from "../main";
const renderError = (
  errorMessage = "Please Enter a correct IPV4 or IPV6 address",
  className = "error-input"
) => {
  errorLabel.textContent = `${errorMessage}`;
  inputField.classList.add(`${className}`);
  return;
};

export default renderError;

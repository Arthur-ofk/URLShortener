import React from "react";
import RegistrationForm from "../Components/RegistrationForm";
import "../Styles/RegisterPage.css"
export const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <h1>Register</h1>
      <RegistrationForm />
    </div>
  );
};



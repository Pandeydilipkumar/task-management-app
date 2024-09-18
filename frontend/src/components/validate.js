export const validate = (data, type) => {
    const errors = {};
  
    if (!data.email) {
      errors.email = "Email is Required!";
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(data.email).toLowerCase())) {
      errors.email = "Email address is invalid!";
    } else {
      delete errors.email;
    }
  
    if (!data.phone) {
      errors.password = "Phone no is Required";
    } else if (!(data.phone.length >= 6)) {
      errors.password = "Phone no should be 10 digit";
    } else {
      delete errors.phone;
    }
  
    if (type === "signUp") {
      if (!data.name.trim()) {
        errors.name = "Username is Required!";
      } else {
        delete errors.name;
      }
      if (data.IsAccepted) {
        delete errors.IsAccepted;
      } else {
        errors.IsAccepted = "Accept terms!";
      }
    }
  
    return errors;
  };
export const validateName = (name) => {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: "Name cannot be empty or just spaces." };
    }
    return { valid: true , error: ""};
  };
  export const validateDescription = (name) => {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: "Description cannot be empty or just spaces." };
    }
    return { valid: true, error: "" };
  };
  export const validateAddress = (name) => {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: "Address cannot be empty or just spaces." };
    }
    return { valid: true, error: "" };
  };
  export const validateAccountTitle = (name) => {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: "Account Title cannot be empty or just spaces." };
    }
    return { valid: true, error: "" };
  };

  export const validateBankName = (name) => {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: "Bank Name cannot be empty or just spaces." };
    }
    return { valid: true, error: "" };
  };

  export const validatePakistaniPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      return { valid: false, error: "Phone number cannot be empty." };
    }
  
    const pakistanPhoneRegex = /^03[0-9]{9}$/; // Matches numbers starting with '03' and followed by 9 digits
    if (!pakistanPhoneRegex.test(phoneNumber)) {
      return { 
        valid: false, 
        error: "Phone number must start with '03' and contain 11 digits." 
      };
    }
  
    return { valid: true };
  };

  export const validateAccountNumber = (accountNumber) => {
    if (!accountNumber || accountNumber.trim().length === 0) {
      return { valid: false, error: "Account number cannot be empty." };
    }
  
    const accountNumberRegex = /^[0-9]{10,16}$/; // Matches numbers with 10 to 16 digits
    if (!accountNumberRegex.test(accountNumber)) {
      return { 
        valid: false, 
        error: "Account number must be numeric and contain 10 to 16 digits." 
      };
    }
  
    return { valid: true };
  };

  export function validateAmountNeeded(amount) {
    // Check if the input is empty or null
    if (!amount || amount.trim() === '') {
      console.log('dfffffff')
      return { valid: false, error: 'Amount cannot be empty' };
    }
  
    // Check if the input contains only numbers
    const numericPattern = /^[0-9]+$/; // Allows only digits (0-9)
    if (!numericPattern.test(amount)) {
      return { valid: false, error: 'Amount should only contain numbers' };
    }
  
    // If all checks pass
    return { valid: true, error: 'Valid amount' };
  }
  
  
  export const validateDonationPurpose = (name) => {
    const items=['family','myself','masjid','ngo','madarsa']
   if(!items.includes(name)) return { valid: false, error: "Purpose cannot be empty." };
    
    else return { valid: true, error: "" };
  }
  export const validateDonationType = (name) => {
    const items=['zakat','donation','help']
   if(!items.includes(name)) return { valid: false, error: "Need Type cannot be empty." };
    
    else return { valid: true, error: "" };
  };
export function createControl(config, validation) {
 return {
  ...config, 
  validation,
  valid: !validation,
  touched: false
 }
}

export function validate(value, validation = null) {
 if (!validation) {
  return true
 }

 let isValid = true

 if (validation.required) {
  isValid = value.trim() !== '' && isValid
 }

 if (validation.isInt) {
  isValid = isNaN(value) && isValid
 }

 return isValid
}
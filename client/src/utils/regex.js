//USERNAME
// [A-Za-z0-9_] = lowercase, uppercase alphanumeric letters 
// {4,20} =  lenght min 4, max 20
const REGX_USERNAME = new RegExp("^[A-Za-z0-9]{4,20}$")

//PASSWORD
// (?=.*?[A-Z]) = At least one uppercase letter 
// (?=.*?[a-z]) = At least one uppercase letter 
//(?=.*?[0-9]) = At least one number 
// (?=.*?[#?!@$%^&*-]) = At least one Symbol (#?!@$%^&*-)
// {8,} = min 8 char length
const REGX_PSW = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%$^&*-]).{8,}$')

//EMAIL
const REGX_EMAIL = new RegExp('^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')

// DATE 
// 2016-05-18T16:00:00Z
// (\d{4})- = $1 four digits followed by dash (2016)- 
// (\d{2})- = $2 two digits followed by dash (05)-
// (\d{2})  = $3 two digits (18)
// (T.*$)   = $4 char T and every charater followed (T16:00:00Z)
const REGX_DATE = /(\d{4})-(\d{2})-(\d{2})(T.*$)/g


export {REGX_USERNAME, REGX_PSW, REGX_EMAIL, REGX_DATE}
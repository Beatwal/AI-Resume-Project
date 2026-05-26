import {body,validationResult} from "express-validator"
async function validateresult (req,res,next){
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.
        status(422)
        .json({error:error.array})
    }
    next()
}

const registerValidationRule=[
    body("username")
    .notEmpty()
    .isString()
    .withMessage("Usernmae is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid Email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
    validateresult
]
export {registerValidationRule}
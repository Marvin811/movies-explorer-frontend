import {useEffect, useState} from "react";

import {validators} from "../utils/validators";

export const useValidation = (value, inputName) => {
    const [inputInvalid, setInputInvalid] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(
        function validateInputs() {
            const validationResult = Object.keys(validators[inputName])
                .map((errorKey) => {
                    const errorResult = validators[inputName][errorKey](value);

                    return {[errorKey]: errorResult}
                })
                .reduce((acc, el) => ({...acc, ...el}), {});
            setErrors(validationResult);
        }, [value, inputName]);

    useEffect(() => {
        for (const key in errors) {
            const keyErrors = errors[key];
            if (keyErrors) {
                return setInputInvalid(true);
            }
        }
        setInputInvalid(false);
    }, [errors, setInputInvalid])

    return {
        inputInvalid, errors
    }
}

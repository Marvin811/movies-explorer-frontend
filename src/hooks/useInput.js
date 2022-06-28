import {useValidation} from './useValidation';
import  {useEffect, useState} from "react";


export const useInput = (initialValue, inputName) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const [currentError, setCurrentError] = useState('');

    const valid = useValidation(value, inputName);

    useEffect(() => {
        const errors = valid.errors ? Object.values(valid.errors) : [];
        for (const err of errors) {
            if (err !== null) {
                return setCurrentError(err);
            }
            if (errors.every((err) => err === null)) {
                return setCurrentError('');
            }
        }
    }, [value, valid.errors]);

    const updateValue = (value) => setValue(value || '');

    const onChange = (evt) => setValue(evt.target.value);
    const onBlur = (evt) => setIsDirty(true);

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        updateValue,
        currentError,
        ...valid
    }
}

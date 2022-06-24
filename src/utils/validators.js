
export const validators = {
    name: {
        isEmpty: (value) => {
            return value === '' ? 'Имя не должно быть пустым' : null;
        },
        minLength: (value) => {
            return value.length < 2 ? 'Минимальная длина 2 символа' : null;
        },
        maxLength: (value) => {
            return value.length > 20 ? 'Максимальная длина 20 символов' : null;
        },
        containLetters: (value) => {
            return !/[A-zА-яЁё]/.test(value) ? 'Имя должно содержать хотя бы одну букву' : null;
        }
    },
    email: {
        isEmpty: (value) => {
            return value === '' ? 'E-mail не должен быть пустым' : null;
        },
        isEmail: (value) => {
            return !/[A-z0-9]+@[A-z]+\.[A-z]{2,3}/.test(value) ? 'Неправильный формат e-mail' : null;
        }
    },
    password: {
        isEmpty: (value) => {
            return value === '' ? 'Пароль не должен быть пустам' : null;
        },
        minLength: (value) => {
            return value.length < 8 ? 'Минимальная длина 8 символа' : null;
        },
        containLetters: (value) => {
            return !/[0-9]/.test(value) ? 'Пароль должен содержать хотя бы одну цифру' : null;
        }
    }
};

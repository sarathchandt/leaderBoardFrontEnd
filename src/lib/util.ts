export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=\S)(?=.{6,})\S+$/;
    return passwordRegex.test(password);
};

export function validateAdmin(input) {
    const regex = /^(?!.*[!@#$%^&*(),.?":{}|<>])(?=\S).+$/;
    return regex.test(input);
}
export const getUserInfo = {
    getValue: function (obj, field) {
        for (const prop in obj) {
            if (typeof obj[prop] === "object") {
                const value = this.getValue(obj[prop], field);
                if (value) {
                    return value;
                }
            } else {
                if (prop === field) {
                    return obj[prop];
                }
            }
        }
    },
    getDob: (user) => new Date(user.dob.date).toDateString(),
};

const preparePhoneNumber = (phones) => {
    if (phones.toString().length === 6) {
        phones = '0000' + phones
    } else if (phones.toString().length === 7) {
        phones = '000' + phones
    } else if (phones.toString().length === 8) {
        phones = '00' + phones
    } else if (phones.toString().length === 9) {
        phones = '0' + phones
    } else if (phones.toString().length === 11 || phones.toString().length === 12 || phones.toString().length === 13) {
        phones = phones.toString().replace(phones.toString(), phones.toString().slice(-10))
    }

    return phones.toString().replace(/^(.{3})(.{3})(.{2})(.*)$/, "($1) $2-$3-$4");
};

export default preparePhoneNumber;


function templateStr(tpl, attributes) {
    for (var i in attributes) {
        if (attributes.hasOwnProperty(i)) {

            tpl = tpl.replaceAll('{{' + i + '}}', attributes[i]);

        }
    }
    return tpl;
};

async function request(URL, func) {
    const response = await fetch(URL);
    const users = await response.json().results;

    console.log(users)
    return func(users);

}

export { templateStr, request };
const ABC_Ascending = 'abcAscending',
    ABC_Descending = 'abcDescending',
    AGE_Ascending = 'ageAscending',
    AGE_Descending = 'ageDescending',
    BOTH = 'both',
    PAGE_LENGTH = 10;



function templateStr(tpl, attributes) {
    for (var i in attributes) {
        if (attributes.hasOwnProperty(i)) {

            tpl = tpl.replaceAll('{{' + i + '}}', attributes[i]);

        }
    }
    return tpl;
};

function sortStr(firstStr, secondStr) {
    var nameA = firstStr.toLowerCase(), nameB = secondStr.toLowerCase()
    if (nameA < nameB)
        return -1
    if (nameA > nameB)
        return 1
    return 0
}


export {
    templateStr,
    sortStr,
    ABC_Ascending,
    ABC_Descending,
    AGE_Ascending,
    AGE_Descending,
    BOTH,
    PAGE_LENGTH
};


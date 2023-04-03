import { getUserInfo } from "./getUserInfo.js";

export function filterAndSortUsers(usersData, filterAndSortSettings) {
    const {
        filtersFormData,
        filtersFields,
        sortTypeDecrypter,
        fieldsForSearchText,
        textForSearch,
    } = filterAndSortSettings;

    const filteredUsers = filterUsers(
        usersData,
        filtersFields,
        filtersFormData
    );

    let filteredAndSortedUsers = sortUsers(
        filteredUsers,
        sortTypeDecrypter,
        filtersFormData
    );

    filteredAndSortedUsers = filterUsersBySearchText(
        filteredAndSortedUsers,
        fieldsForSearchText,
        textForSearch
    );
    return filteredAndSortedUsers;
}

function filterUsers(usersData, filtersFields, filtersFormData) {
    let filteredUsers = usersData;
    filtersFields.map((fieldName) => {
        const fieldValues = filtersFormData.getAll(fieldName);
        if (fieldValues != 0) {
            filteredUsers = filteredUsers.filter((user) =>
                filterFunction(fieldValues, fieldName, user)
            );
        }
    });
    return filteredUsers;

    function filterFunction(fieldValues, fieldName, user) {
        const isRelatedUser = fieldValues
            .map((fieldValue) => checkUser(user, fieldName, fieldValue))
            .find((isRelated) => isRelated == true);
        return isRelatedUser ? true : false;
    }

    function checkUser(user, fieldName, fieldValue) {
        const [value, valueMax] = fieldValue.split("-");
        if (valueMax === undefined) {
            return getUserInfo.getValue(user, fieldName) === value
                ? true
                : false;
        } else {
            return getUserInfo.getValue(user, fieldName) >= value &&
                getUserInfo.getValue(user, fieldName) <= valueMax
                ? true
                : false;
        }
    }
}

function sortUsers(usersData, sortTypeDecrypter, filtersFormData) {
    const sortBy = filtersFormData.get("sorting"),
        sortFunction =
            sortBy != undefined
                ? createSortFunction(sortBy, sortTypeDecrypter)
                : () => true;
    return usersData
        .map((user) => user)
        .sort((userA, userB) => sortFunction(userA, userB));

    function createSortFunction(sortBy, sortTypeDecrypter) {
        const [sortField, directionCoeff] = sortTypeDecrypter[sortBy];
        return (userA, userB) => {
            const a = getUserInfo.getValue(userA, sortField),
                b = getUserInfo.getValue(userB, sortField);
            return directionCoeff * ((b < a) - (a < b));
        };
    }
}

function filterUsersBySearchText(
    usersData,
    fieldsForSearchText,
    textForSearch
) {
    const searchTextRegExp = new RegExp(textForSearch.toLowerCase(), "g");
    return usersData.filter((user) => {
        const isRelated = fieldsForSearchText
            .map((field) => {
                if (
                    getUserInfo
                        .getValue(user, field)
                        .toLowerCase()
                        .match(searchTextRegExp) != null
                ) {
                    return true;
                }
            })
            .indexOf(true);
        return isRelated != -1 ? true : false;
    });
}

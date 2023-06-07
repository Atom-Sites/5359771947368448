export default function extractValues(obj) {
    const newObj = {};
    for (const key in obj) {
        newObj[key] = obj[key].value;
    }
    return newObj;
};


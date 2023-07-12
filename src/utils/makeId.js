export default function makeId(string) {
    return string.replaceAll(' ', '-').toLowerCase();
}

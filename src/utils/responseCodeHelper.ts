export function positiveResponseCode(code: number) {
    if (code === 200 || code === 201 || code === 204) return true;

    return false;
}

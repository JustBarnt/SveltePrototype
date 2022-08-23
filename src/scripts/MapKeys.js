const LicenseKey = Symbol("licenses");
const FormsKey = Symbol("Forms");

//Object of Symbols for a unique identifier, to make sure the correct context is always aquired.
export const Keys = { License: LicenseKey, Form: FormsKey };
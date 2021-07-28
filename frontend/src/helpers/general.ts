
export const getKeyValue = <T extends Record<number, string>, U extends keyof T>(obj: T) => (key: U) => obj[key];

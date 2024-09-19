export const isValidJson = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return false;
  }
};

export const encryptUrl = (data: string) => {
  return btoa(encodeURIComponent(data)); // Base64 encode
};

export const decryptUrl = (encryptedData: string) => {
  return decodeURIComponent(atob(encryptedData)); // Base64 decode
};
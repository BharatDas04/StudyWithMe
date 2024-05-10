import * as SecureStore from "expo-secure-store";

export const storeData = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log("Data Stored");
  } catch (error) {
    console.error(error);
  }
};

export const getData = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const clearData = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

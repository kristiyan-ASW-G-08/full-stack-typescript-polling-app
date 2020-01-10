const getLocation = (onSuccess: () => Promise<void>): void => {
  navigator.geolocation.getCurrentPosition(onSuccess);
};

export default getLocation;

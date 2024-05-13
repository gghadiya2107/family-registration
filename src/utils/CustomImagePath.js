export const getImagePath = (path) => {
    const prefix = "/urbanregister"; // For staging
    // const prefix = "/"; // For local
    return `${prefix}${path}`;
  };
  
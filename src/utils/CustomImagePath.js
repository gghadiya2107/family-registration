export const getImagePath = (path) => {
    const prefix = "/eParivar"; // For staging
    // const prefix = "/"; // For local
    return `${prefix}${path}`;
  };
  
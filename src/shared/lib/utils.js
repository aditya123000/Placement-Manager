export const STORAGE_KEYS = {
  registeredStudent: "placement-manager-registered-student",
  loggedInUser: "placement-manager-logged-in-user",
  loginFlag: "placement-manager-is-logged-in",
};

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const packageByCategory = {
  Dream: "12-20 LPA",
  Core: "6-12 LPA",
  Mass: "3-5 LPA",
};

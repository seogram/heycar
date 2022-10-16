export const getChoiceId = (url: string = "") => {
    var n = url.lastIndexOf("/");
    return url.substring(n + 1);
  };
import request from "@/utils/request";

export const getMenu = () => {
  return request({
    url: "/menu",
    method: "get"
  });
};


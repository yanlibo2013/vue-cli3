import request from "@/utils/request";

export const getAllUserList = () => {
  return request({
    url: "/userlist",
    // url: "/get/user/list",
    method: "get"
  });
};

export const getUserList = val => {
  return request({
    url: "/userlist?_page=" + val.currentPage + "&_limit=" + val.pageSize,
    // url: "/get/user/list?_page=" + val.currentPage + "&_limit=" + val.pageSize, ///get/userlist
    method: "get"
  });
};

export const addUser = data => {
  return request({
    // url: "/userlist",
    url: "/add/user",
    method: "post",
    data
  });
};

export const delUser = data => {
  return request({
    // url: "/userlist/" + data,
    url: "/del/user/" + data,
    method: "DELETE"
  });
};

export const modifyUser = data => {
  return request({
    // url: "/userlist/" + data.id,
    url: "/modify/user/" + data.id,
    method: "PUT",
    data
  });
};
//axios.post(url,product,{headers: headers});

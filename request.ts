import { Method, ResponseType } from "axios";
import axios from './axios'
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// import { loading } from "/Users/xuyifei/Documents/study/npm/ant_vue3_ui_ts/lib/index"; // 这种引入不能打包之后不能使用s
import loading from "@/components/Loading/index";
import { cloneDeep } from "lodash";

interface OptionsProp {
  method?: Method | "postfile" | "postExport" ;
  url: string;
  headers?: any;
  data?: any;
  showLoading?: boolean;
  responseType?: ResponseType;
  timeout?: number;
}
// responseType:'stream'
const fetch = async (options: OptionsProp) => {
  const { method = "get", data, url, headers = {}, showLoading, responseType, timeout = 5000 } = options;

  const cloneData = cloneDeep(data);

  if (showLoading) {
    loading.show();
  }

  switch (method.toLowerCase()) {
    case "get":
      return axios.request({
        url,
        params: cloneData,
        method: 'GET',
        headers,
        responseType,
        timeout
      });
    case "post":
      return axios.request({
        url: url,
        data,
        method: 'POST',
        headers,
        responseType,
        timeout
      });
    case "put":
      return axios.request({
        url: url,
        data,
        method: 'PUT',
        headers,
        responseType,
        timeout
      });
      case "delete":
      return axios.request({
        url: url,
        data,
        method: 'DELETE',
        headers,
        responseType,
        timeout
      });
    /**
     * {
     *  'name':'file'
     *  'file':File //文件
     * }
     */
    case "postfile":
      // eslint-disable-next-line no-case-declarations
      const params = new FormData();
      for (let k in cloneData) {
        params.append(k, cloneData[k])
      }
      // params.append(cloneData.name || "file", cloneData.file);
      return axios.request({
        method: "POST",
        url,
        data: params,
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
        responseType,
        timeout
      });
    default:
      return axios.request(options);
  }
};

export function request(options: OptionsProp) {
  return fetch(options)
    .then((response) => {
      if (options.showLoading) {
        loading.hidden();
      }
      return Promise.resolve(response);
    })
    .catch((error) => {
      loading.hidden();
      return Promise.reject(error);
    });
}

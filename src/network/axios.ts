import { message } from 'antd';
import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { getToken, saveToken, to2 } from '@/utils/util';

const apiBaseUrl: string = import.meta.env.VITE_APP_BASE_URL;
const apiBaseUrlAuthor: string = import.meta.env.VITE_APP_BASE_URL_AUTHOR;
const curEnv: string = import.meta.env.VITE_APP_ENV;

class HttpRequest {
  constructor(
    public baseUrl: string = apiBaseUrl,
    public baseUrlAuthor: string = apiBaseUrlAuthor
  ) {
    this.baseUrl = baseUrl;
    this.baseUrlAuthor = apiBaseUrlAuthor;
  }
  public request(options: AxiosRequestConfig): AxiosPromise {
    const instance: AxiosInstance = axios.create();
    options = this.mergeConfig(options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
  private interceptors(instance: AxiosInstance, url?: string) {
    // console.log('Request URL: ' + url);
    // 定义这个函数用于添加全局请求和响应拦截逻辑
    // 在这里添加请求和响应拦截
    instance.interceptors.request.use(
      (config: any) => {
        // 接口请求的所有配置，都在这个config对象中，他的类型是AxiosRequestConfig，你可以看到他有哪些字段
        // 如果你要修改接口请求配置，需要修改 axios.defaults 上的字段值
        const { authorization }: any = getToken();
        if (config.headers?.noHeaders) {
          config.headers = { 'Content-Type': config.headers['Content-Type'] };
        } else {
          config.headers = {
            ...config.headers,
            authorization,
          };
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log(res);
        const { data, headers } = res;
        console.log('data:', data);
        if (!data.data && data.status === 200 && data.message) return data;
        if (!data.msg && data.message) data.msg = data.message;
        if (data instanceof Blob) return res;
        const { status = 1, success = false, msg } = data;
        if (status !== 200 && !success) {
          message.error(msg);
          return Promise.reject(msg);
        }
        if (data.data?.authenticated) saveToken(headers);

        return data.data;
      },
      (error: any) => {
        console.log(error);
        if (!error.response || !error.response.status) {
          message.error(error.message);
          return Promise.reject({
            status: 1,
            msg: error.message || '网络异常，请查网络再试试～',
          });
        }
        let err: Record<string, unknown> = {};
        switch (error.response.status) {
          case 401:
            err = {
              msg:
                error.response.data.message || '登录信息已过期，请您重新登录～',
              status: 401,
            };
            break;
          case 403:
            err = {
              msg:
                error.response.data.message || '登录信息已过期，请您重新登录～',
              status: 403,
            };
            break;
          case 500:
            err = {
              msg: error.response.data.message || '服务器出错了～',
              status: 500,
            };
            break;
          case 502:
            err = {
              msg: error.response.data.message || '服务器出错了～',
              status: 502,
            };
            break;
          case 503:
            err = {
              msg: error.response.data.message || '服务器出错了～',
              status: 503,
            };
            break;
          default:
            err = {
              msg: error.response.data.message || '服务器出错了～',
              status: 1,
            };
            break;
        }
        if (err.status === 403 || err.status === 401) {
          to2();
        }
        console.log('err:', err);
        message.error(err.msg as any);
        return Promise.reject(err);
      }
    );
  }

  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
    const curUrl = options.url || '';
    if (curEnv === 'test' && /^\/auth-center\//.test(curUrl)) {
      // 这个方法用于合并基础路径配置和接口单独配置
      return Object.assign(
        {
          baseURL: this.baseUrlAuthor,
          timeout: 5000,
          timeoutErrorMessage: '网络异常，检查网络再试试～',
        },
        options
      );
    }
    // if ((curEnv === 'test' || curEnv === 'production') && /^\/manage\//.test(curUrl)) {
    //   // 这个方法用于合并基础路径配置和接口单独配置
    //   options.url = options.url?.replace(/^\/manage\//, '/')
    //   return Object.assign(
    //     {
    //       baseURL: this.baseUrl,
    //       timeout: 5000,
    //       timeoutErrorMessage: '网络异常，检查网络再试试～'
    //     },
    //     options
    //   );
    // }
    // 这个方法用于合并基础路径配置和接口单独配置
    return Object.assign(
      {
        baseURL: this.baseUrl,
        timeout: 5000,
        timeoutErrorMessage: '网络异常，检查网络再试试～',
      },
      options
    );
  }
}
export default new HttpRequest();

export interface ResponseData {
  code: number;
  data?: any;
  msg: string;
}

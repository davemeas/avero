// @ts-nocheck
import ACCESS_TOKEN from '../util/accessToken'
import API_BASE from '../types/constants'

/*
request: RequestInfo { 
  method: enum('GET' | 'POST' | 'PUT' | 'DELTE',
  headers: new Headers({Authorization: ACCESS_TOKEN}),
  mode: 'cors' as RequestMode,
  cache: 'default' as RequestCache,
}
*/

const addApiBase = (path: string) => `${API_BASE}/${path}`

const http = <T>(request: RequestInfo): Promise<T> => {
  return new Promise((resolve, reject) => {
    let response: Response
    fetch(request)
      .then(res => {
        response = res
        return res.json()
      })
      .then(body => {
        if (response.ok) {
          resolve(body)
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const get = async <T>(
  path: string,
  args: RequestInit = {
    method: 'get',
    headers: {Authorization: ACCESS_TOKEN},
  }
): Promise<T> => await http(new Request(addApiBase(path), {...args}))

export const post = async <T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'post',
    body: JSON.stringify(body),
    headers: {Authorization: ACCESS_TOKEN},
  }
): Promise<T> => await http(new Request(addApiBase(path), args))

export const put = async (
  path: string,
  body: {}
): Promise<Response> => await http(new Request(addApiBase(path), {
  method: 'put',
  body: JSON.stringify(body),
  headers: {Authorization: ACCESS_TOKEN},
}))

export const del = async (
  path: string,
  args: RequestInit = {
    method: 'delete',
    headers: {Authorization: ACCESS_TOKEN},
  }
): Promise<Response> => await http(new Request(addApiBase(path), args))


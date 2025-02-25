import request from '@/utils/request';
import qs from 'qs';
const baseURL = '/cluster-apollo/apollo/im'

// 获取计算机对应的账号列表
export function getAccountList(data: IGetAccountListParamsByComputerIdParams): Promise<IAccountListItem[]> {
  return request({
    url: `${baseURL}/getComputerAccountList`,
    method: 'post',
    data
  })
}
// 获取好友列表
export function getFriendList(data: IFriendListParams): Promise<IFriendItem[]> {
  return request({
    url: `${baseURL}/getAccountObjectList`,
    method: 'post',
    data
  })
}
// 获取统计对象
export function getStatisticsObject(data: IStatisticsObjectParams): Promise<IStatisticsObject> {
  return request({
    url: `${baseURL}/getObjectChatStatistics`,
    method: 'post',
    data
  })
}
// 获取消息列表
export function getMessageList(data: IChatDataParams): Promise<IChatDataResponse> {
  return request({
    url: `${baseURL}/getObjectChatList`,
    method: 'post',
    data
  })
}
/**
 * 获取对象聊天搜索数据（右侧）
 */
export const getChatSearchApi = async (data: IGetObjectChatSearchDataParams):Promise<IGetObjectChatSearchData[]> => {
  return request({
    url: `${baseURL}/getObjectChatSearchData`,
    method: 'post',
    data 
  }) 
}

/**
 * 下载消息对应附件
 */
export const downloadMessageFileApi = async (data: {id:number,computerId:string}):Promise<IRecord> => {
  return request({
    url: `${baseURL}/op/downloadChatFile`,
    method: 'post',
    data,
  })
}

/**
 * 获取消息对应附件数据
 */
export const getMessageFileApi = async (params: {id:number,computerId:string}):Promise<any> => {
  return request({
    url: `${baseURL}/getChatAttachment?${qs.stringify(params)}`,
    method: 'get',
    // data:qs.stringify(params),
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }) 
}
/**
 * 获取对象单条聊天记录
 */
export const getChatRecordApi = async (data:IGetObjectChatDetailParams ):Promise<IRecord> => {
  return request({
    url: `${baseURL}/getObjectChatDetail`,
    method: 'post',
    data 
  })
}

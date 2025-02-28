import request from '@/utils/request';
const baseURL = '/cluster-apollo/apollo/monitor'


/**
 * 获取即时通讯解析数量
 */
export const getChatCounts = async (data: {id:number}):Promise<any> => {
  return request({
    url: `${baseURL}/getLlmParseCount`,
    method: 'post',
    data, 
  })
}
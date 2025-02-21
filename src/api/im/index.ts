import request from '@/utils/request';

const baseURL = '/cluster-apollo/apollo/im'

// 获取计算机对应的账号列表
export function getAccountList(data: IGetAccountListParamsByComputerIdParams): Promise<IAccountListItem[]> {
  return request({
    url: `${baseURL}/getComputerAccountList`,
    method: 'post',
    data
  })
}

import request from '@/utils/request';
import type { IAddGroupParams, IComputerParams, IComputerResponse, IComputerSortParams, IComputerTreeParams, IComputerTreeResponse, IDeleteComputerParams, IDeleteGroupParams, IGetComputerPolicyParams, IUpdateComputerParams, IUpdateGroupParams } from '@/types/computer'

const baseURL = '/cluster-apollo/apollo/computer'

/**
 * 获取计算机树结构
 * @param info 
 * @returns 
 */
export const getTree = async (info: IComputerTreeParams): Promise<IComputerTreeResponse> => {
  return request({
    url: `${baseURL}/getTree`,
    method: 'post',
    data: info
  });
};
/**
 * 新增计算机分组
 * @param info 
 * @returns 
 */
export const saveTreeInfoApi = async (info:IAddGroupParams) => {
  return request({
    url: `${baseURL}/group/op/add`,
    method: 'post',
    data: info
  });
};
/**
 * 删除计算机分组
 * @param info 
 * @returns 
 */
export const removeTreeInfoByIdApi = async (info:IDeleteGroupParams) => {
  return request({
    url: `${baseURL}/group/delete`,
    method: 'post',
    data: info
  });
};
/**
 * 更新计算机分组
 * @param info 
 * @returns 
 */
export const editGroupNameApi = async (info:IUpdateGroupParams) => {
  return request({
    url: `${baseURL}/group/op/update`,
    method: 'post',
    data: info
  });
};
/**
 * 获取计算机信息
 * @param info 
 * @returns 
 */
export const getComputerInfoApi = async (info:IComputerParams):Promise<IComputerResponse> => {
  return request({
    url: `${baseURL}/get`,
    method: 'post',
    data: info
  });
};
/**
 * 更新计算机信息
 * @param info 
 * @returns 
 */
export const editComputerInfoApi = async (info:IUpdateComputerParams) => {
  return request({
    url: `${baseURL}/op/update`,
    method: 'post',
    data: info
  });
};

export const editPolicyFlagApi = async (info:IGetComputerPolicyParams) => {
  return request({
    url: `${baseURL}/op/policyFlag`,
    method: 'post',
    data: info
  });
};

export const uninstallComputerInfoApi = async (info:IDeleteComputerParams) => {
  return request({
    url: `${baseURL}/op/uninstall`,
    method: 'post',
    data: info
  });
};

/**
 * 计算机排序
 */
export const sortComputerApi = async (data:IComputerSortParams) => {
  return request({
    url: `${baseURL}/op/sort`,
    method: 'post',
    data: data
  });
}
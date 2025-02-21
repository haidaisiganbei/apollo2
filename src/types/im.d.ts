// 在文件顶部添加全局声明
// import type { IBase } from "./base";
declare global {
  /** 
   * 获取计算机对应的账号列表 
   */
  interface IGetAccountListParamsByComputerIdParams {
    /* 计算机ID */
    computerId: number;
    /* 即时通讯类型 */
    imType: number;
  }
  
  interface IGetAccountListParamsByComputerIdResponse extends IBase<IAccountListItem[]> { }
  /**
   * 账号列表项
   */
  interface IAccountListItem {
    /* 账号ID */
    id: number;
    /* 外部ID */
    externalId: string;
    /* 唯一名称 */
    uniqueName: string;
    /* 名称 */
    name: string;
    /* 扩展信息 */
    extend: string;
  }
}

export {}
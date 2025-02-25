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
  /**
   * 根据账号ID获取对象列表
   */
  interface IFriendListParams {
    accountId: number;
    name?: string;
    content?: string;
    beginTime?: string;
    endTime?: string;
    computerId: string;
  }

  /* 好友对象 */
  interface IFriendItem {
    /* 对象ID */
    id: number;
    /* 外部ID */
    externalId: string;
    /* 唯一名称 */
    uniqueName: string;
    /* 名称 */
    name: string;
    /* 好友类型 */
    type: number;
    /* 扩展信息 */
    extend: string;
    /* 内容 */
    content: string;
    /* 消息类型 */
    msgType: number;
    /* 创建时间 */
    createTime: string;
  }

  /* 统计对象入参 */
  interface IStatisticsObjectParams {
    /* 对象id */
    objectId: number;
    /* 开始时间（天） */
    beginTime?: string;
    /* 结束时间（天） */
    endTime?: string;
  }
  /* 统计对象响应 */
  interface IStatisticsObject {
    /* 全部数量 */
    allCount: number;
    /* 资金数量 */
    fundCount: number;
    /* 位置数量 */
    positionCount: number;
    /* 文件数量 */
    fileCount: number;
  }
  /* 聊天数据入参 */
  interface IChatDataParams {
    size: number;
    current: number;
    objectId: number;
    computerId: string;
  }
  /* 聊天数据响应 */
  interface IChatDataResponse {
    records: IRecord[];
    total: number;
    size: number;
    current: number;
    orders: Order[];
    optimizeCountSql: OptimizeCountSql;
    searchCount: OptimizeCountSql;
    optimizeJoinOfCountSql: boolean;
    maxLimit: number;
    countId: string;
    pages: number;
  }

  interface OptimizeCountSql {
  }

  interface Order {
    column: string;
    asc: boolean;
  }

  interface IRecord {
    id: number;
    senderUniqueName: string;
    senderName: string;
    selfFlag: boolean;
    content: string;
    msgType: number;
    createTime: string;
    computerId: string;
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

  interface IGetObjectChatSearchDataParams {
    /* 每页数量 */
    size: number;
    /* 对象id */
    objectId: number;
    /* 搜索内容 */
    content?: string;
    /* 开始时间 */
    beginTime?: string;
    /* 结束时间 */
    endTime?: string;
  }

  interface IGetObjectChatSearchData {
    content: string;
    createTime: string;
    current: number;
    pagePosition: number;
  }
  /* 获取对象单条聊天数据请求参数 */
  interface IGetObjectChatDetailParams {
    size: number;
    current: number;
    computerId: number;
    objectId: number;
    beginTime?: string;
    endTime?: string;
    msgTypeList?: number[];
  }
}

export { }
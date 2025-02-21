// import type { IBase } from "./base";

declare global {

  /**
   * 获取计算机树
   */
  interface IComputerTreeParams {
    /* 计算机名 */
    computerName: string;
    /* ip地址 */
    ipAddress: string;
    /* mac地址 */
    macAddress: string;
  }

  interface IComputerTreeResponse extends IBase<IComputerTreeItem[]> { }

  /**
   * 计算机树响应
   */
  interface IComputerTreeItem {
    id: number;
    parentId: number;
    name: string;
    /* 分组标识 */
    groupFlag: boolean;
    children: IComputerTreeItem[];
  }

  /**
   * 获取计算机
   */
  interface IComputerParams {
    id: number;
  }
  interface IComputerResponse extends IBase<IComputerInfo> { }
  interface IComputerInfo {
    /* 计算机ID */
    id: number;
    /* IP地址 */
    ipAddress: string;
    /* MAC地址 */
    macAddress: string;
    /* 计算机名 */
    computerName: string;
    /* 备注名 */
    remarkName: string;
    /* 策略标识 */
    policyFlag: boolean;
    /* 状态 */
    status: number;
    /* CPU使用率 */
    cpuUsage: number;
    /* 内存使用率 */
    memoryUsage: number;
    /* 磁盘使用率 */
    diskUsage: number;
  }
  /**
   * 更新计算机
   */
  interface IUpdateComputerParams {
    id: number;
    /* 备注名 */
    remarkName: string;
    /* 分组id */
    groupId: number;
  }

  /**
   * 删除计算机
   */
  interface IDeleteComputerParams {
    id: number;
  }

  /**
   * 获取计算机桌面
   */
  interface IComputerDesktopParams {
    id: number;
    /* 0: 无，1: 完整数据，2：差分数据），现在先只传1,示例值(1) */
    quality: 0 | 1 | 2;
  }

  /**
   * 获取操作计算机策略标识
   */
  interface IGetComputerPolicyParams {
    id: number;
    /* 是否启用 */
    enabled: boolean;
  }

  /**
   * 新增分组参数
   */
  interface IAddGroupParams {
    name: string;
    parentId: number;
  }

  /**
   * 更新分组参数
   */
  interface IUpdateGroupParams {
    id: number;
    name: string;
    parentId: number;
  }

  /**
   * 删除分组参数
   */
  interface IDeleteGroupParams {
    id: number;
  }

  /**
   * 排序参数
   */
  interface IComputerSortParams {
    parentId: number;
    id: number;
    sort: number;
    groupFlag: boolean;
  }
}
export {}
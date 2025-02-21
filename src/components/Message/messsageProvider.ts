import messageTypes from "./messageTypes";

export default {
  /**
   * @description: 获取消息类型名称
   */
  getMessageTypeName(type: keyof typeof messageTypes): string {
    return messageTypes[type]?.name || "未知消息类型";
  },
  
  /**
   * @description: 获取消息类型组件
   */
  getMessageTypeComponent(type: keyof typeof messageTypes): any {
    return messageTypes[type]?.component || messageTypes["99"].component;
  }
}
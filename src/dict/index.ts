import messageTypes from "./messageTypes";

export default {
  /**
   * @description: 获取消息类型
   */
  getMessageType(type: keyof typeof messageTypes):string | undefined {
    return messageTypes[type];
  },
}
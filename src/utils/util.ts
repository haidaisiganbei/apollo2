import qs from 'qs'
/**
 * 格式化文件大小
 * @param size 文件大小（字节）
 * @param digit 保留小数位数
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(size: number,digit:number=1): string {
  // 定义文件大小单位数组
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;

  // 循环将文件大小转换为合适的单位
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // 返回格式化后的文件大小字符串，保留指定小数位数
  return `${size.toFixed(digit)} ${units[unitIndex]}`;
}
// `${import.meta.env.VITE_APP_BASE_API}/cluster-apollo/apollo/im/getChatAttachment?${qs.stringify(params)}`
/**
 * 获取url
 */
export function getUrl(params:any):string{
  return `${import.meta.env.VITE_APP_BASE_API}/cluster-apollo/apollo/im/getChatAttachment?${qs.stringify(params)}` 
}
/**
 * 休眠函数
 */
export function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms)); 
}
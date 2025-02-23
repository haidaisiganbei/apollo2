// 在文件顶部添加全局声明
declare global {
  interface IBase<T> {
    code: number;
    msg: string;
    data: T;
  }
  interface IPage {
    current: number;
    size: number;
  }
}
export { }
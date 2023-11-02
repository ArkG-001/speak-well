export type Result<T> = {
  /** 列表数据 */
  results?: Array<T>;
  /** 总条目数 */
  count?: number;
  /** null */
  next?: any;
  /** null */
  previous?: any;
};

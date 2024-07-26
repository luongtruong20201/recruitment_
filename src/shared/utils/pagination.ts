import { IPagination } from 'src/constants/pagination';

export const toPagination = <T>(
  data: T[],
  count: number,
  options: IPagination,
) => {
  const result = {
    data: data,
    metadata: {
      total: count,
      currentPage: options.page,
      totalPage: Math.ceil(count / options.limit),
    },
  };
  return result;
};

export class ServiceResult {
  success: boolean;
  message: string;
}

export class GenericServiceResult<TData> extends ServiceResult {
  data: TData;
}

import ModelNames from "./ModelNames";

export interface DBSetOptions {
  data?: any;
  ttl?: number; // In seconds
}

export interface DBUpdateOptions {
  data?: any;
  upsert?: boolean;
}

export default interface DataBaseClientInterface {
  get(modelName: ModelNames, entryId: string): Promise<any>;
  set(modelName: ModelNames, entryId: string, options: DBSetOptions): Promise<boolean>;
  update(modelName: ModelNames, entryId: string, options: DBUpdateOptions): Promise<boolean>;
  delete(modelName: ModelNames, entryId: string): Promise<boolean>;
}

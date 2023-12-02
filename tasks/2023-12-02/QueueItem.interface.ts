import { PriorityEnum } from "./PriorityEnum";

export interface IQueueItem<T> {
  item: T;
  priority: PriorityEnum;
}

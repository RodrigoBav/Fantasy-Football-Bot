import EventStatusTypeName from "./EventStatusTypeName";

export default interface EventStatusTypeResponse {
  id?: string;
  name?: EventStatusTypeName;
  state?: string;
  completed?: boolean;
  description?: string;
  detail?: string;
  shortDetail?: string;
}

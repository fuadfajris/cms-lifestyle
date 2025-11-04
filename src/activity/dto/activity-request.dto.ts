export class ActivityRequest {
  content_key: string;
  content_name: string;
  prevValue?: Record<string, any> | null;
  newValue: Record<string, any>;
  maker: Record<string, any>;
}

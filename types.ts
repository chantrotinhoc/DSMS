
import { LucideIcon } from 'lucide-react';

export enum ComponentCategory {
  NETWORK = 'Hạ tầng mạng',
  SERVER_STORAGE = 'Máy chủ & Hệ thống lưu trữ',
  ENDPOINT = 'Thiết bị đầu cuối',
  USER = 'Thông tin người dùng',
}

export enum ComponentType {
  FIREWALL = 'FIREWALL',
  ROUTER = 'ROUTER',
  LOAD_BALANCER = 'LOAD_BALANCER',
  INTERNET = 'INTERNET',
  SWITCH = 'SWITCH',
  VPN = 'VPN',
  WIFI_AP = 'WIFI_AP',
  IP_PBX = 'IP_PBX',
  PHYSICAL_SERVER = 'PHYSICAL_SERVER',
  VIRTUAL_SERVER = 'VIRTUAL_SERVER',
  CLOUD_SERVER = 'CLOUD_SERVER',
  NVR = 'NVR',
  UPS = 'UPS',
  NAS = 'NAS',
  DESKTOP = 'DESKTOP',
  LAPTOP = 'LAPTOP',
  PRINTER = 'PRINTER',
  SCANNER = 'SCANNER',
  USER_INFO = 'USER_INFO',
}

export interface PropertyDefinition {
  key: string;
  name: string;
  type: 'text' | 'textarea' | 'number';
}

export interface ITComponent {
  name: string;
  type: ComponentType;
  category: ComponentCategory;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  properties: PropertyDefinition[];
}

export enum PanelType {
  PROPERTIES = 'PROPERTIES',
  AI = 'AI',
  CLOSED = 'CLOSED',
}

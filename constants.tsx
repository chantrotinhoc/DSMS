
import { ComponentCategory, ComponentType, ITComponent } from './types';
import {
  FirewallIcon, RouterIcon, LoadBalancerIcon, InternetIcon, SwitchIcon, VpnIcon, WifiIcon, IpPbxIcon,
  ServerPhysicalIcon, ServerVirtualIcon, ServerCloudIcon, NvrIcon, UpsIcon, NasIcon,
  DesktopIcon, LaptopIcon, PrinterIcon, ScannerIcon, UserIcon
} from './components/icons';

export const COMPONENT_DEFINITIONS: Record<ComponentType, ITComponent> = {
  [ComponentType.FIREWALL]: {
    name: 'Firewall', type: ComponentType.FIREWALL, category: ComponentCategory.NETWORK, icon: FirewallIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'model', name: 'Model', type: 'text' },
      { key: 'license', name: 'License', type: 'text' }, { key: 'licenseExpiry', name: 'Thời hạn sử dụng license', type: 'text' },
      { key: 'warranty', name: 'Thời gian bảo hành', type: 'text' }, { key: 'ipWan', name: 'IP Wan', type: 'text' },
      { key: 'ipLan', name: 'IP Lan', type: 'text' }, { key: 'speed', name: 'Tốc độ', type: 'text' },
      { key: 'ports', name: 'Số cổng', type: 'number' }, { key: 'firmware', name: 'Version Firmware', type: 'text' },
      { key: 'location', name: 'Vị trí đặt thiết bị', type: 'text' },
    ],
  },
  [ComponentType.ROUTER]: {
    name: 'Router', type: ComponentType.ROUTER, category: ComponentCategory.NETWORK, icon: RouterIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'model', name: 'Model', type: 'text' },
      { key: 'provider', name: 'Nhà cung cấp', type: 'text' }, { key: 'warranty', name: 'Thời gian bảo hành', type: 'text' },
      { key: 'ipWan', name: 'IP Wan', type: 'text' }, { key: 'ipLan', name: 'IP Lan', type: 'text' },
      { key: 'speed', name: 'Tốc độ', type: 'text' }, { key: 'ports', name: 'Số cổng', type: 'number' },
      { key: 'firmware', name: 'Version Firmware', type: 'text' }, { key: 'location', name: 'Vị trí đặt thiết bị', type: 'text' },
    ],
  },
  [ComponentType.LOAD_BALANCER]: {
    name: 'Load Balancer', type: ComponentType.LOAD_BALANCER, category: ComponentCategory.NETWORK, icon: LoadBalancerIcon,
    properties: [
      { key: 'model', name: 'Model', type: 'text' }, { key: 'provider', name: 'Nhà cung cấp', type: 'text' },
      { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' }, { key: 'ipWan1', name: 'IP Wan 1', type: 'text' },
      { key: 'ipWan2', name: 'IP Wan 2', type: 'text' }, { key: 'ipLan', name: 'IP Lan', type: 'text' },
      { key: 'method', name: 'Phương thức', type: 'text' }, { key: 'speed', name: 'Tốc độ', type: 'text' },
      { key: 'ports', name: 'Số cổng', type: 'number' }, { key: 'firmware', name: 'Version Firmware', type: 'text' },
      { key: 'location', name: 'Vị trí đặt thiết bị', type: 'text' },
    ],
  },
  [ComponentType.INTERNET]: {
    name: 'Internet', type: ComponentType.INTERNET, category: ComponentCategory.NETWORK, icon: InternetIcon,
    properties: [
      { key: 'provider', name: 'Nhà cung cấp', type: 'text' }, { key: 'circuitId', name: 'Mã đường dây', type: 'text' },
      { key: 'contactInfo', name: 'Thông tin liên hệ', type: 'text' }, { key: 'ipWan', name: 'IP Wan', type: 'text' },
      { key: 'credentials', name: 'Username/Pass', type: 'text' },
    ],
  },
  [ComponentType.SWITCH]: {
    name: 'Switch', type: ComponentType.SWITCH, category: ComponentCategory.NETWORK, icon: SwitchIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'model', name: 'Model', type: 'text' },
      { key: 'provider', name: 'Nhà cung cấp', type: 'text' }, { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' },
      { key: 'ip', name: 'IP', type: 'text' }, { key: 'speed', name: 'Tốc độ', type: 'text' },
      { key: 'ports', name: 'Số cổng', type: 'number' }, { key: 'firmware', name: 'Version Firmware', type: 'text' },
      { key: 'location', name: 'Vị trí đặt thiết bị', type: 'text' },
    ],
  },
  [ComponentType.VPN]: {
    name: 'VPN', type: ComponentType.VPN, category: ComponentCategory.NETWORK, icon: VpnIcon,
    properties: [
      { key: 'systemName', name: 'Tên hệ thống', type: 'text' }, { key: 'configDevice', name: 'Thiết bị cấu hình', type: 'text' },
      { key: 'ipLan', name: 'IP Lan', type: 'text' }, { key: 'ipWanDialIn', name: 'IP Wan dial in', type: 'text' },
      { key: 'ipWanDialOut', name: 'IP Wan dial out', type: 'text' }, { key: 'presharedKey', name: 'Presharekey', type: 'text' },
      { key: 'protocol', name: 'Protocol', type: 'text' }, { key: 'localNetwork', name: 'Local Network', type: 'text' },
      { key: 'remoteNetwork', name: 'Remote network', type: 'text' }, { key: 'encryption', name: 'Encryption method', type: 'text' },
      { key: 'connectedSite', name: 'Site kết nối', type: 'text' },
    ],
  },
  [ComponentType.WIFI_AP]: {
    name: 'Wifi AP', type: ComponentType.WIFI_AP, category: ComponentCategory.NETWORK, icon: WifiIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'model', name: 'Model', type: 'text' },
      { key: 'provider', name: 'Nhà cung cấp', type: 'text' }, { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' },
      { key: 'ipLink', name: 'IP/Link truy cập', type: 'text' }, { key: 'credentials', name: 'Username/Password', type: 'text' },
      { key: 'ssid', name: 'SSID', type: 'text' }, { key: 'channel', name: 'Channel', type: 'text' },
      { key: 'frequency', name: 'Băng tần: 2.4Ghz/5.0Ghz', type: 'text' }, { key: 'location', name: 'Vị trí lắp đặt', type: 'text' },
    ],
  },
  [ComponentType.IP_PBX]: {
    name: 'Tổng đài IP', type: ComponentType.IP_PBX, category: ComponentCategory.NETWORK, icon: IpPbxIcon,
    properties: [
      { key: 'systemName', name: 'Tên hệ thống', type: 'text' }, { key: 'provider', name: 'Nhà cung cấp', type: 'text' },
      { key: 'ipWan', name: 'IP Wan', type: 'text' }, { key: 'servicePackage', name: 'Gói dịch vụ', type: 'text' },
      { key: 'registeredPhones', name: 'Số điện thoại đăng ký', type: 'text' }, { key: 'usagePeriod', name: 'Thời gian sử dụng', type: 'text' },
    ],
  },
  [ComponentType.PHYSICAL_SERVER]: {
    name: 'Server Vật lý', type: ComponentType.PHYSICAL_SERVER, category: ComponentCategory.SERVER_STORAGE, icon: ServerPhysicalIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'provider', name: 'Nhà cung cấp', type: 'text' },
      { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' }, { key: 'model', name: 'Model', type: 'text' },
      { key: 'config', name: 'Cấu hình: CPU/RAM/DISK-RAID', type: 'textarea' }, { key: 'ip', name: 'IP', type: 'text' },
      { key: 'os', name: 'Hệ điều hành', type: 'text' }, { key: 'role', name: 'Vai trò/Chức năng', type: 'text' },
      { key: 'location', name: 'Vị trí lắp đặt', type: 'text' },
    ],
  },
  [ComponentType.VIRTUAL_SERVER]: {
    name: 'Server ảo', type: ComponentType.VIRTUAL_SERVER, category: ComponentCategory.SERVER_STORAGE, icon: ServerVirtualIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'hostMachine', name: 'Máy chủ Host', type: 'text' },
      { key: 'platform', name: 'Nền tảng ảo hóa', type: 'text' }, { key: 'ip', name: 'IP', type: 'text' },
      { key: 'config', name: 'Cấu hình: CPU/RAM/DISK-RAID', type: 'textarea' }, { key: 'os', name: 'Hệ điều hành', type: 'text' },
      { key: 'role', name: 'Vai trò/Chức năng', type: 'text' },
    ],
  },
  [ComponentType.CLOUD_SERVER]: {
    name: 'Server Cloud', type: ComponentType.CLOUD_SERVER, category: ComponentCategory.SERVER_STORAGE, icon: ServerCloudIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'provider', name: 'Nhà cung cấp/Nền tảng Cloud', type: 'text' },
      { key: 'servicePackage', name: 'Gói dịch vụ', type: 'text' }, { key: 'usagePeriod', name: 'Thời hạn sử dụng', type: 'text' },
      { key: 'signupEmail', name: 'Email đăng ký', type: 'text' }, { key: 'ipWan', name: 'IP Wan', type: 'text' },
      { key: 'ipLan', name: 'IP Lan', type: 'text' }, { key: 'config', name: 'Cấu hình: CPU/RAM/DISK-RAID', type: 'textarea' },
      { key: 'os', name: 'Hệ điều hành', type: 'text' }, { key: 'role', name: 'Vai trò/Chức năng', type: 'text' },
    ],
  },
  [ComponentType.NVR]: {
    name: 'Đầu ghi hình', type: ComponentType.NVR, category: ComponentCategory.SERVER_STORAGE, icon: NvrIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'model', name: 'Model', type: 'text' },
      { key: 'provider', name: 'Nhà cung cấp', type: 'text' }, { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' },
      { key: 'ip', name: 'IP', type: 'text' }, { key: 'ports', name: 'Port sử dụng', type: 'text' },
      { key: 'accessLink', name: 'Link truy cập', type: 'text' }, { key: 'credentials', name: 'Username/Password', type: 'text' },
      { key: 'location', name: 'Vị trí lắp đặt', type: 'text' },
    ],
  },
  [ComponentType.UPS]: {
    name: 'UPS', type: ComponentType.UPS, category: ComponentCategory.SERVER_STORAGE, icon: UpsIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'model', name: 'Model', type: 'text' },
      { key: 'provider', name: 'Nhà cung cấp', type: 'text' }, { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' },
      { key: 'capacity', name: 'Công suất', type: 'text' }, { key: 'ip', name: 'IP', type: 'text' },
      { key: 'accessLink', name: 'Link truy cập', type: 'text' }, { key: 'connectedDevices', name: 'Thiết bị đang kết nối', type: 'textarea' },
      { key: 'alertEmail', name: 'Email gửi cảnh báo', type: 'text' }, { key: 'location', name: 'Vị trí lắp đặt', type: 'text' },
    ],
  },
  [ComponentType.NAS]: {
    name: 'NAS', type: ComponentType.NAS, category: ComponentCategory.SERVER_STORAGE, icon: NasIcon,
    properties: [
      { key: 'deviceName', name: 'Tên thiết bị', type: 'text' }, { key: 'model', name: 'Model', type: 'text' },
      { key: 'provider', name: 'Nhà cung cấp', type: 'text' }, { key: 'warranty', name: 'Thời gian bảo hành', type: 'text' },
      { key: 'ipPort', name: 'IP/Port', type: 'text' }, { key: 'config', name: 'Cấu hình: CPU/RAM/DISK-RAID', type: 'textarea' },
      { key: 'os', name: 'Hệ điều hành', type: 'text' }, { key: 'location', name: 'Vị trí lắp đặt', type: 'text' },
    ],
  },
  [ComponentType.DESKTOP]: {
    name: 'Desktop', type: ComponentType.DESKTOP, category: ComponentCategory.ENDPOINT, icon: DesktopIcon,
    properties: [
      { key: 'model', name: 'Model', type: 'text' }, { key: 'provider', name: 'Nhà cung cấp', type: 'text' },
      { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' }, { key: 'config', name: 'Cấu hình: CPU/RAM/DISK-RAID', type: 'textarea' },
      { key: 'ip', name: 'IP', type: 'text' }, { key: 'os', name: 'Hệ điều hành', type: 'text' },
      { key: 'userAccount', name: 'Người dùng/tài khoản', type: 'text' }, { key: 'location', name: 'Vị trí lắp đặt', type: 'text' },
    ],
  },
  [ComponentType.LAPTOP]: {
    name: 'Laptop', type: ComponentType.LAPTOP, category: ComponentCategory.ENDPOINT, icon: LaptopIcon,
    properties: [
        { key: 'model', name: 'Model', type: 'text' }, { key: 'provider', name: 'Nhà cung cấp', type: 'text' },
        { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' }, { key: 'config', name: 'Cấu hình: CPU/RAM/DISK-RAID', type: 'textarea' },
        { key: 'ip', name: 'IP', type: 'text' }, { key: 'os', name: 'Hệ điều hành', type: 'text' },
        { key: 'userAccount', name: 'Người dùng/tài khoản', type: 'text' }, { key: 'location', name: 'Vị trí lắp đặt', type: 'text' },
    ],
  },
  [ComponentType.PRINTER]: {
    name: 'Printer', type: ComponentType.PRINTER, category: ComponentCategory.ENDPOINT, icon: PrinterIcon,
    properties: [
      { key: 'model', name: 'Model', type: 'text' }, { key: 'provider', name: 'Nhà cung cấp', type: 'text' },
      { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' }, { key: 'ip', name: 'IP', type: 'text' },
      { key: 'connection', name: 'Cổng kết nối: USB/Lan', type: 'text' }, { key: 'location', name: 'Vị trí lắp đặt', type: 'text' },
    ],
  },
  [ComponentType.SCANNER]: {
    name: 'Scanner', type: ComponentType.SCANNER, category: ComponentCategory.ENDPOINT, icon: ScannerIcon,
    properties: [
        { key: 'model', name: 'Model', type: 'text' }, { key: 'provider', name: 'Nhà cung cấp', type: 'text' },
        { key: 'usagePeriod', name: 'Thời gian sử dụng/bảo hành', type: 'text' }, { key: 'ip', name: 'IP', type: 'text' },
        { key: 'connection', name: 'Cổng kết nối: USB/Lan', type: 'text' }, { key: 'location', name: 'Vị trí lắp đặt', type: 'text' },
    ],
  },
  [ComponentType.USER_INFO]: {
    name: 'User Info', type: ComponentType.USER_INFO, category: ComponentCategory.USER, icon: UserIcon,
    properties: [
      { key: 'fullName', name: 'Họ & Tên', type: 'text' }, { key: 'department', name: 'Phòng ban', type: 'text' },
      { key: 'title', name: 'Chức vụ', type: 'text' }, { key: 'manager', name: 'Cấp quản lý trực tiếp', type: 'text' },
      { key: 'phone', name: 'Số điện thoại', type: 'text' }, { key: 'pcName', name: 'Tên máy tính sử dụng', type: 'text' },
      { key: 'account', name: 'Tài khoản hệ thống', type: 'text' }, { key: 'email', name: 'Địa chỉ Email/Email Group', type: 'text' },
      { key: 'permissions', name: 'Phân quyền dữ liệu', type: 'textarea' }, { key: 'software', name: 'Phần mềm sử dụng: tài khoản/license', type: 'textarea' },
    ],
  },
};

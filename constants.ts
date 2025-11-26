import { KpiData, ActivityLog, ChartDataPoint, CompanyConfig, Branch } from './types';

export const COMPANIES: CompanyConfig[] = [
  { id: 'c1', name: 'Công ty TNHH Hoàng Phúc', logoText: 'ERP', themeColor: '#2563eb' },
  { id: 'c2', name: 'Tập đoàn Lê Vương', logoText: 'LV-CORP', themeColor: '#059669' },
];

export const BRANCHES: Branch[] = [
  { id: 'all', name: 'Tất cả chi nhánh' },
  { id: 'hn01', name: 'Chi nhánh Hà Nội' },
  { id: 'hcm01', name: 'Chi nhánh TP.HCM' },
  { id: 'dn01', name: 'Chi nhánh Đà Nẵng' },
  { id: 'ct01', name: 'Chi nhánh Cần Thơ' },
];

export const MOCK_KPI_DATA: KpiData[] = [
  {
    id: 'revenue',
    label: 'Doanh thu',
    value: 208364300,
    currency: 'đ',
    iconName: 'DollarSign',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-100',
  },
  {
    id: 'net_profit',
    label: 'Lợi nhuận ròng',
    value: 24354500,
    currency: 'đ',
    iconName: 'TrendingUp',
    colorClass: 'text-green-600',
    bgClass: 'bg-green-100',
    tooltip: 'Đã trừ chi phí vận hành',
  },
  {
    id: 'overdue',
    label: 'Hóa đơn quá hạn',
    value: 175009800,
    currency: 'đ',
    iconName: 'FileWarning',
    colorClass: 'text-yellow-600',
    bgClass: 'bg-yellow-100',
  },
  {
    id: 'returns_out',
    label: 'Tổng trả hàng',
    value: 0,
    currency: 'đ',
    iconName: 'ArrowLeftRight',
    colorClass: 'text-red-500',
    bgClass: 'bg-red-100',
    tooltip: 'Hàng khách trả lại',
  },
  {
    id: 'purchases',
    label: 'Tổng mua hàng',
    value: 68873142,
    currency: 'đ',
    iconName: 'ShoppingCart',
    colorClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
  },
  {
    id: 'debt_supplier',
    label: 'Nợ nhà cung cấp',
    value: 68873142,
    currency: 'đ',
    iconName: 'AlertTriangle',
    colorClass: 'text-orange-500',
    bgClass: 'bg-orange-100',
  },
  {
    id: 'returns_in',
    label: 'Tổng trả hàng mua',
    value: 0,
    currency: 'đ',
    iconName: 'RefreshCcw',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-100',
    tooltip: 'Trả lại nhà cung cấp',
  },
  {
    id: 'expenses',
    label: 'Chi phí hóa đơn',
    value: 9000000,
    currency: 'đ',
    iconName: 'Receipt',
    colorClass: 'text-pink-600',
    bgClass: 'bg-pink-100',
  },
];

export const MOCK_ACTIVITY: ActivityLog[] = [
  { id: '1', user: 'Hoàng Phúc', action: 'Đăng nhập', time: '06:52', date: '28-10-2025', avatarColor: 'bg-blue-500' },
  { id: '2', user: 'Hoàng Phúc', action: 'Đăng nhập', time: '10:22', date: '28-10-2025', avatarColor: 'bg-blue-500' },
  { id: '3', user: 'Lê Vương', action: 'Đăng nhập', time: '20:14', date: '28-10-2025', avatarColor: 'bg-green-500' },
  { id: '4', user: 'Hoàng Phúc', action: 'Đăng nhập', time: '10:07', date: '29-10-2025', avatarColor: 'bg-blue-500' },
  { id: '5', user: 'Lê Vương', action: 'Đăng nhập', time: '14:30', date: '29-10-2025', avatarColor: 'bg-green-500' },
  { id: '6', user: 'Admin', action: 'Cập nhật hệ thống', time: '02:00', date: '30-10-2025', avatarColor: 'bg-gray-600' },
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { name: '01', revenue: 50, branch: 'HN' },
  { name: '05', revenue: 65, branch: 'HN' },
  { name: '10', revenue: 55, branch: 'HN' },
  { name: '15', revenue: 150, branch: 'HN' },
  { name: '20', revenue: 40, branch: 'HN' },
  { name: '25', revenue: 80, branch: 'HN' },
  { name: '30', revenue: 70, branch: 'HN' },
];
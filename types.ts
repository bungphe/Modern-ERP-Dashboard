import { LucideIcon } from "lucide-react";

export interface KpiData {
  id: string;
  label: string;
  value: number;
  currency: string;
  iconName: 'DollarSign' | 'TrendingUp' | 'FileWarning' | 'RefreshCcw' | 'ShoppingCart' | 'AlertTriangle' | 'Receipt' | 'ArrowLeftRight';
  colorClass: string; // Tailwind text color class for icon
  bgClass: string; // Tailwind bg color class for icon container
  tooltip?: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  time: string;
  date: string;
  avatarColor: string;
}

export interface ChartDataPoint {
  name: string;
  revenue: number;
  branch: string;
}

export interface CompanyConfig {
  id: string;
  name: string;
  logoText: string;
  themeColor: string; // Hex code for primary color
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface Branch {
  id: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// --- ACCOUNTING TYPES ---
export interface Account {
  code: string;
  name: string;
  category: 'Tài sản' | 'Nợ phải trả' | 'Vốn chủ sở hữu' | 'Doanh thu' | 'Chi phí';
  balance: number;
  type: 'Dư Nợ' | 'Dư Có';
}

export interface JournalEntry {
  id: string;
  date: string;
  voucherNo: string; // Số chứng từ
  description: string;
  debitAccount: string; // TK Nợ
  creditAccount: string; // TK Có
  amount: number;
}
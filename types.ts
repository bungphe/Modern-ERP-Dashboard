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
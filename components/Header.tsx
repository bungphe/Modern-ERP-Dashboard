import React from 'react';
import { 
  Search, Bell, Settings, LayoutGrid, 
  Home, Users, Briefcase, Package, Download, 
  Upload, Archive, CreditCard, FileText, HelpCircle,
  LogOut
} from 'lucide-react';
import { CompanyConfig, UserProfile } from '../types';

interface HeaderProps {
  currentCompany: CompanyConfig;
  companies: CompanyConfig[];
  onCompanyChange: (id: string) => void;
  user: UserProfile;
}

const NAV_ITEMS = [
  { label: 'Tổng quan', icon: Home, active: true },
  { label: 'Nhân viên', icon: Users },
  { label: 'Đối tác', icon: Briefcase },
  { label: 'Sản phẩm', icon: Package },
  { label: 'Nhập hàng', icon: Download },
  { label: 'Bán hàng', icon: Upload },
  { label: 'Điều phối kho', icon: Archive },
  { label: 'Chi phí', icon: CreditCard },
  { label: 'Báo cáo', icon: FileText },
  { label: 'Cài đặt', icon: Settings },
];

const Header: React.FC<HeaderProps> = ({ currentCompany, companies, onCompanyChange, user }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Top Bar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                {/* Logo Area */}
                <div className="w-8 h-8 bg-red-600 rounded text-white font-bold flex items-center justify-center text-xs shadow-sm">
                    Hi
                </div>
                <span className="text-xs font-bold text-gray-600">CodeOn</span>
            </div>
            
            <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>
            
            {/* Company Switcher */}
            <div className="relative group">
                <button className="flex items-center gap-2 text-green-600 font-bold text-lg hover:opacity-80">
                    {currentCompany.logoText}
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-md border border-gray-100 hidden group-hover:block z-50 p-1">
                    {companies.map(c => (
                        <button 
                            key={c.id}
                            onClick={() => onCompanyChange(c.id)}
                            className={`w-full text-left px-4 py-2 text-sm rounded hover:bg-gray-50 ${c.id === currentCompany.id ? 'font-bold text-blue-600' : 'text-gray-700'}`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
            <button className="p-2 hover:bg-gray-100 rounded-full text-blue-600">
                <LayoutGrid size={20} />
            </button>
            <div className="hidden md:flex items-center bg-blue-50 rounded-full px-3 py-1.5 border border-blue-100">
                 <span className="text-sm font-medium text-blue-600 mr-2">22-11-2025</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full text-blue-600 relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200 cursor-pointer hover:opacity-80">
                <div className="text-right hidden md:block">
                    <div className="text-sm font-bold text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                </div>
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                </div>
            </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#007bff] text-white overflow-x-auto no-scrollbar">
        <div className="flex items-center px-4 min-w-max">
            {NAV_ITEMS.map((item, index) => (
                <button 
                    key={index}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-4 ${item.active ? 'border-white bg-blue-700' : 'border-transparent hover:bg-blue-600'}`}
                >
                    <item.icon size={16} />
                    {item.label}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
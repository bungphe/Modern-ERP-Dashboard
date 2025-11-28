import React, { useState } from 'react';
import { Account, JournalEntry } from '../types';
import { Search, Filter, Plus, Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface AccountingViewProps {
  accounts: Account[];
  entries: JournalEntry[];
}

const AccountingView: React.FC<AccountingViewProps> = ({ accounts, entries }) => {
  const [activeTab, setActiveTab] = useState<'accounts' | 'journal'>('accounts');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate quick stats
  const totalAssets = accounts.filter(a => a.category === 'Tài sản').reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = accounts.filter(a => a.category === 'Nợ phải trả').reduce((sum, a) => sum + a.balance, 0);
  const totalRevenue = accounts.filter(a => a.category === 'Doanh thu').reduce((sum, a) => sum + a.balance, 0);

  const filteredAccounts = accounts.filter(a => 
    a.code.includes(searchTerm) || a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEntries = entries.filter(e => 
    e.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Tổng Tài sản</p>
                <h3 className="text-2xl font-bold text-blue-700">{totalAssets.toLocaleString()} đ</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Wallet size={20} />
            </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Nợ phải trả</p>
                <h3 className="text-2xl font-bold text-red-600">{totalLiabilities.toLocaleString()} đ</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <ArrowDownLeft size={20} />
            </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Doanh thu tạm tính</p>
                <h3 className="text-2xl font-bold text-green-600">{totalRevenue.toLocaleString()} đ</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <ArrowUpRight size={20} />
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[500px] flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex gap-4">
                <button 
                    onClick={() => setActiveTab('accounts')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'accounts' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    Hệ thống tài khoản
                </button>
                <button 
                    onClick={() => setActiveTab('journal')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'journal' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    Sổ nhật ký chung
                </button>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </div>
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600">
                    <Filter size={18} />
                </button>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                    <Plus size={16} />
                    {activeTab === 'accounts' ? 'Thêm TK' : 'Bút toán mới'}
                </button>
            </div>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-x-auto">
            {activeTab === 'accounts' ? (
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                            <th className="px-6 py-3 font-semibold">Số hiệu TK</th>
                            <th className="px-6 py-3 font-semibold">Tên tài khoản</th>
                            <th className="px-6 py-3 font-semibold">Phân loại</th>
                            <th className="px-6 py-3 font-semibold">Tính chất</th>
                            <th className="px-6 py-3 font-semibold text-right">Số dư hiện tại</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredAccounts.map((account) => (
                            <tr key={account.code} className="hover:bg-blue-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-gray-700">{account.code}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{account.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                        account.category === 'Tài sản' ? 'bg-green-100 text-green-700' :
                                        account.category === 'Nợ phải trả' ? 'bg-red-100 text-red-700' :
                                        account.category === 'Doanh thu' ? 'bg-blue-100 text-blue-700' :
                                        account.category === 'Chi phí' ? 'bg-orange-100 text-orange-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {account.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{account.type}</td>
                                <td className="px-6 py-4 text-sm font-medium text-right text-gray-900">{account.balance.toLocaleString()} đ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                            <th className="px-6 py-3 font-semibold">Ngày CT</th>
                            <th className="px-6 py-3 font-semibold">Số CT</th>
                            <th className="px-6 py-3 font-semibold">Diễn giải</th>
                            <th className="px-6 py-3 font-semibold text-center">TK Nợ</th>
                            <th className="px-6 py-3 font-semibold text-center">TK Có</th>
                            <th className="px-6 py-3 font-semibold text-right">Số tiền</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredEntries.map((entry) => (
                            <tr key={entry.id} className="hover:bg-blue-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-500">{entry.date}</td>
                                <td className="px-6 py-4 text-sm font-medium text-blue-600">{entry.voucherNo}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate" title={entry.description}>{entry.description}</td>
                                <td className="px-6 py-4 text-sm text-center font-medium bg-green-50/50 text-green-700 rounded">{entry.debitAccount}</td>
                                <td className="px-6 py-4 text-sm text-center font-medium bg-red-50/50 text-red-700 rounded">{entry.creditAccount}</td>
                                <td className="px-6 py-4 text-sm font-bold text-right text-gray-900">{entry.amount.toLocaleString()} đ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
             <span>Hiển thị {activeTab === 'accounts' ? filteredAccounts.length : filteredEntries.length} kết quả</span>
             <div className="flex gap-1">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Trước</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Sau</button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingView;
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import RevenueChart from './components/RevenueChart';
import RecentActivity from './components/RecentActivity';
import UserProfileModal from './components/UserProfileModal';
import ChatWidget from './components/ChatWidget';
import LandingPage from './components/LandingPage';
import AccountingView from './components/AccountingView';
import { COMPANIES, MOCK_KPI_DATA, MOCK_ACTIVITY, MOCK_CHART_DATA, BRANCHES, MOCK_ACCOUNTS, MOCK_JOURNAL_ENTRIES } from './constants';
import { KpiData, UserProfile } from './types';
import { Calendar, ChevronDown, Sparkles, RefreshCw } from 'lucide-react';
import { analyzeDashboardData } from './services/geminiService';

const App: React.FC = () => {
  // --- Navigation State ---
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  // --- Local Storage Initialization ---

  const [currentCompanyId, setCurrentCompanyId] = useState<string>(() => {
    const saved = localStorage.getItem('currentCompanyId');
    const validId = COMPANIES.find(c => c.id === saved)?.id;
    return validId || COMPANIES[0].id;
  });

  const [dateRange, setDateRange] = useState(() => {
    return localStorage.getItem('dateRange') || '01-11-2025 ~ 30-11-2025';
  });

  const [selectedBranchId, setSelectedBranchId] = useState(() => {
    const saved = localStorage.getItem('selectedBranchId');
    return saved || BRANCHES[0].id;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : { name: 'Hoàng Phúc', role: 'Quản trị viên', avatarUrl: '' };
  });
  
  // --- UI State ---
  
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // --- AI State ---
  
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- Effects for Persistence ---

  useEffect(() => {
    localStorage.setItem('currentCompanyId', currentCompanyId);
  }, [currentCompanyId]);

  useEffect(() => {
    localStorage.setItem('dateRange', dateRange);
  }, [dateRange]);

  useEffect(() => {
    localStorage.setItem('selectedBranchId', selectedBranchId);
  }, [selectedBranchId]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // --- Derived State ---

  const currentCompany = COMPANIES.find(c => c.id === currentCompanyId) || COMPANIES[0];
  const selectedBranch = BRANCHES.find(b => b.id === selectedBranchId) || BRANCHES[0];

  // Simulate data variation based on company selection
  const dashboardData: KpiData[] = useMemo(() => {
    if (currentCompanyId === 'c1') return MOCK_KPI_DATA;
    // Alter values slightly for company 2 to show interactivity
    return MOCK_KPI_DATA.map(item => ({
      ...item,
      value: Math.floor(item.value * 0.85)
    }));
  }, [currentCompanyId]);

  // --- Handlers ---

  const handleCompanyChange = (id: string) => {
    setCurrentCompanyId(id);
    setAiAnalysis(null); // Reset AI analysis on company switch
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const result = await analyzeDashboardData(dashboardData, MOCK_ACTIVITY);
      setAiAnalysis(result);
    } catch (e) {
      setAiAnalysis("Không thể lấy dữ liệu phân tích.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  // --- Render Landing Page ---
  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  // --- Render Main App ---
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col font-sans relative">
      <Header 
        currentCompany={currentCompany} 
        companies={COMPANIES} 
        onCompanyChange={handleCompanyChange}
        user={userProfile}
        onProfileClick={() => setIsProfileModalOpen(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <UserProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={userProfile}
        onSave={handleUpdateProfile}
      />

      <main className="flex-1 px-4 md:px-6 py-6 max-w-[1600px] mx-auto w-full">
        
        {/* Top Filters Row - Shared across views */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            {currentView === 'accounting' ? 'Phân hệ Kế toán' : `Chào ${userProfile.name},`}
            {currentView === 'dashboard' && <span className="text-gray-500 font-normal text-lg hidden lg:inline-block">chúc bạn một ngày làm việc hiệu quả!</span>}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
             {/* AI Button - Only on Dashboard for now */}
             {currentView === 'dashboard' && (
               <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-md shadow hover:shadow-lg transition-all disabled:opacity-50"
               >
                  {isAnalyzing ? <RefreshCw className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  {isAnalyzing ? 'Đang phân tích...' : 'Trợ lý AI'}
               </button>
             )}

             {/* Branch Selector */}
             <div className="relative">
                <button 
                  onClick={() => setIsBranchOpen(!isBranchOpen)}
                  className="flex items-center justify-between min-w-[180px] w-auto px-4 py-2 text-sm text-gray-700 bg-white rounded-md shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium truncate">{selectedBranch.name}</span>
                  <ChevronDown size={16} className="text-gray-400 ml-2" />
                </button>

                {isBranchOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsBranchOpen(false)}></div>
                    <div className="absolute top-full left-0 mt-1 w-full min-w-[180px] bg-white shadow-lg rounded-md border border-gray-100 py-1 z-20">
                      {BRANCHES.map(branch => (
                        <button
                          key={branch.id}
                          onClick={() => {
                            setSelectedBranchId(branch.id);
                            setIsBranchOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${branch.id === selectedBranchId ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700'}`}
                        >
                          {branch.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
             </div>

             {/* Date Picker */}
             <div className="relative bg-white rounded-md shadow-sm border border-gray-300 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 w-auto px-4 py-2 text-sm text-gray-700">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="font-medium">{dateRange}</span>
                  <ChevronDown size={16} className="text-gray-400 ml-2" />
                </div>
             </div>
          </div>
        </div>

        {/* View Content Switching */}
        {currentView === 'accounting' ? (
          <AccountingView accounts={MOCK_ACCOUNTS} entries={MOCK_JOURNAL_ENTRIES} />
        ) : (
          /* DASHBOARD VIEW */
          <>
            {/* AI Result Panel */}
            {aiAnalysis && (
                <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-4 shadow-sm relative overflow-hidden animate-in fade-in duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <h3 className="text-indigo-800 font-bold text-sm flex items-center gap-2 mb-2">
                        <Sparkles size={14} />
                        Phân tích từ Trợ lý AI
                    </h3>
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {aiAnalysis}
                    </div>
                </div>
            )}

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {dashboardData.map((item) => (
                <StatCard key={item.id} data={item} />
              ))}
            </div>

            {/* Charts & Activity Section */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-auto xl:h-[400px]">
              <div className="xl:col-span-3 h-[400px] xl:h-auto">
                 <RevenueChart data={MOCK_CHART_DATA} />
              </div>
              <div className="xl:col-span-1 h-[400px] xl:h-auto">
                 <RecentActivity activities={MOCK_ACTIVITY} />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Chat Widget - Available in all views */}
      <ChatWidget 
        kpiData={dashboardData} 
        recentActivity={MOCK_ACTIVITY}
        user={userProfile}
      />
    </div>
  );
};

export default App;
import React from 'react';
import { 
  ArrowRight, BarChart2, Brain, Building2, 
  ShieldCheck, Zap, MessageSquare, PieChart 
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded text-white font-bold flex items-center justify-center text-xs shadow-sm">
                Hi
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">CodeOn ERP</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <button onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-blue-600 transition-colors">Tính năng</button>
            <button onClick={() => document.getElementById('ai')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-blue-600 transition-colors">Công nghệ AI</button>
            <button onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-blue-600 transition-colors">Demo</button>
        </div>
        <button 
            onClick={onStart}
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
            Truy cập Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap size={14} className="fill-blue-700" />
            Phiên bản mới 2025
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-slate-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Quản trị Doanh nghiệp <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Thông minh & Hiệu quả
            </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Hệ thống ERP hiện đại tích hợp trí tuệ nhân tạo Gemini 2.5 Flash. 
            Tự động phân tích tài chính, báo cáo đa chi nhánh và hỗ trợ ra quyết định tức thì.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <button 
                onClick={onStart}
                className="group px-8 py-4 bg-blue-600 text-white text-base font-bold rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2"
            >
                Trải nghiệm Demo ngay
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 text-base font-bold rounded-full hover:bg-gray-50 transition-all flex items-center gap-2">
                Xem tài liệu
            </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-slate-900">Tính năng vượt trội</h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                    Được thiết kế để tối ưu hóa mọi quy trình quản lý, từ tài chính đến nhân sự.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                        <PieChart size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Dashboard Trực quan</h3>
                    <p className="text-gray-500 leading-relaxed">
                        Theo dõi Doanh thu, Lợi nhuận ròng, và Công nợ theo thời gian thực. Biểu đồ tương tác giúp nhận diện xu hướng nhanh chóng.
                    </p>
                </div>

                {/* Card 2 */}
                <div id="ai" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Brain size={100} />
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                        <Brain size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Trợ lý ảo AI Gemini</h3>
                    <p className="text-gray-500 leading-relaxed">
                        Tích hợp Google Gemini 2.5 Flash để phân tích số liệu tự động và trả lời câu hỏi nghiệp vụ qua Chat Interface thông minh.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                        <Building2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Quản lý Đa chi nhánh</h3>
                    <p className="text-gray-500 leading-relaxed">
                        Dễ dàng lọc dữ liệu theo từng chi nhánh (Hà Nội, TP.HCM, Đà Nẵng...) để so sánh hiệu quả hoạt động.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                        <MessageSquare size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Hội thoại Ngữ cảnh</h3>
                    <p className="text-gray-500 leading-relaxed">
                        Chat với dữ liệu của bạn. Hỏi "Doanh thu hôm nay thế nào?" và nhận câu trả lời chính xác dựa trên dữ liệu ERP.
                    </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Cá nhân hóa & Bảo mật</h3>
                    <p className="text-gray-500 leading-relaxed">
                        Quản lý hồ sơ người dùng, cập nhật Avatar và lưu trữ tùy chọn cá nhân ngay trên trình duyệt.
                    </p>
                </div>

                {/* Card 6 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                        <BarChart2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Báo cáo Hoạt động</h3>
                    <p className="text-gray-500 leading-relaxed">
                        Nhật ký hoạt động chi tiết giúp quản lý giám sát mọi thao tác đăng nhập và cập nhật hệ thống.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
             {/* Decorative circles */}
             <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
             
             <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Sẵn sàng tối ưu hóa doanh nghiệp của bạn?</h2>
             <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                Trải nghiệm sức mạnh của CodeOn ERP với dashboard tương tác và trợ lý AI ngay hôm nay.
             </p>
             <button 
                onClick={onStart}
                className="px-10 py-4 bg-white text-blue-700 text-lg font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg relative z-10"
             >
                Truy cập Dashboard Demo
             </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-700 rounded text-white font-bold flex items-center justify-center text-[10px]">Hi</div>
                <span className="font-bold text-gray-700">CodeOn ERP</span>
            </div>
            <div className="text-sm text-gray-500">
                © 2025 CodeOn Technology. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
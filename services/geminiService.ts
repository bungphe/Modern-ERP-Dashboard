import { GoogleGenAI } from "@google/genai";
import { KpiData, ActivityLog, UserProfile } from "../types";

// Initialize Gemini client
// Note: In a real production app, we would likely proxy this through a backend to protect the API key,
// or ensure the environment variable is strictly controlled.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const analyzeDashboardData = async (kpiData: KpiData[], recentActivity: ActivityLog[]) => {
  if (!apiKey) {
    return "Vui lòng cấu hình API Key để sử dụng tính năng phân tích AI.";
  }

  try {
    const kpiSummary = kpiData.map(k => `${k.label}: ${k.value.toLocaleString()} ${k.currency}`).join('\n');
    const activitySummary = recentActivity.slice(0, 5).map(a => `${a.user} - ${a.action} lúc ${a.time} ngày ${a.date}`).join('\n');

    const prompt = `
      Bạn là một trợ lý AI chuyên gia về tài chính và quản trị doanh nghiệp (ERP).
      Dưới đây là dữ liệu hiện tại của dashboard công ty:

      KPI TÀI CHÍNH:
      ${kpiSummary}

      HOẠT ĐỘNG GẦN ĐÂY:
      ${activitySummary}

      Hãy đưa ra một bản phân tích ngắn gọn (dưới 100 từ) bằng tiếng Việt.
      Tập trung vào:
      1. Tình hình sức khỏe tài chính dựa trên Doanh thu và Lợi nhuận.
      2. Cảnh báo nếu có nợ xấu hoặc tồn kho bất thường (ví dụ: Nợ nhà cung cấp cao, Hóa đơn quá hạn).
      3. Đưa ra 1 lời khuyên hành động cụ thể.
      
      Giọng điệu chuyên nghiệp, hữu ích.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Không thể tạo phân tích vào lúc này.";
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    return "Đã xảy ra lỗi khi kết nối với trợ lý AI. Vui lòng thử lại sau.";
  }
};

export const sendChatMessage = async (
  message: string, 
  context: { kpiData: KpiData[], recentActivity: ActivityLog[], user: UserProfile }
) => {
  if (!apiKey) {
    return "Vui lòng cấu hình API Key để sử dụng tính năng chat AI.";
  }

  try {
    const { kpiData, recentActivity, user } = context;
    const kpiSummary = kpiData.map(k => `${k.label}: ${k.value.toLocaleString()} ${k.currency}`).join('\n');
    const activitySummary = recentActivity.slice(0, 5).map(a => `${a.user} - ${a.action} lúc ${a.time} ngày ${a.date}`).join('\n');

    const systemInstruction = `
      Bạn là Trợ lý ERP thông minh cho phần mềm quản lý doanh nghiệp.
      Tên người dùng hiện tại: ${user.name} (${user.role}).
      
      Dữ liệu hệ thống hiện tại:
      
      [KPI TÀI CHÍNH]
      ${kpiSummary}
      
      [HOẠT ĐỘNG GẦN ĐÂY]
      ${activitySummary}
      
      Nhiệm vụ của bạn là trả lời các câu hỏi của người dùng liên quan đến số liệu kinh doanh, tình hình hoạt động, hoặc tư vấn quản trị.
      Trả lời ngắn gọn, súc tích, chuyên nghiệp bằng tiếng Việt.
      Nếu câu hỏi không liên quan đến công việc hoặc dữ liệu, hãy khéo léo từ chối hoặc lái về chủ đề kinh doanh.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Xin lỗi, tôi không thể trả lời ngay lúc này.";

  } catch (error) {
    console.error("Lỗi khi gọi Gemini Chat API:", error);
    return "Đã xảy ra lỗi kết nối. Vui lòng thử lại.";
  }
};
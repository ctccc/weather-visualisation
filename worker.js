// Cloudflare Worker - 和风天气 API 代理
// 部署后，前端调用这个 Worker 而不是直接调用和风天气 API

export default {
  async fetch(request, env) {
    // 允许跨域
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    const url = new URL(request.url);
    const location = url.searchParams.get('location');
    
    if (!location) {
      return new Response(JSON.stringify({ code: '400', msg: '缺少 location 参数' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 调用和风天气 API
    const apiUrl = `https://devapi.qweather.com/v7/weather/3d?location=${location}&key=${env.QWEATHER_API_KEY}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ code: '500', msg: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

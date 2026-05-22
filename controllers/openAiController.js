const axios = require('axios');


exports.getOpenAiResponse = async (req, res) => {
  try {
    const { message } = req.body;
    
    // 直接调用智谱 API
    const response = await axios.post(
      'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      {
        model: 'glm-5.1',
        messages: [
          { role: 'system', content: '你是一个有用的AI助手。' },
          { role: 'user', content: message },
        ],
        temperature: 1.0,
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`, // 手动添加认证头
        },
      }
    );

    res.json({ 
      success: true, 
      reply: response.data.choices[0].message.content 
    });

  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    res.status(500).json({ success: false, message: 'error: ' + error.message });
  }
}
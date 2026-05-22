const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getOpenAiResponse = async (req, res) => {
  try {
    const { message } = req.body; // 从请求体中获取用户消息

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, 
        { role: 'user', content: message },
      ],
      model: 'gpt-3.5-turbo',
    });

    const aiReply = completion.choices[0].message.content;

    res.json({ success: true, reply: aiReply });

  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get reply from AI' });
  }
}
import { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';

export default function PersonalHomepage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '哈，新来的？我是 +7 的数字分身，可以帮你了解这位毒舌的 I 人。有什么想问的吗？'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    
    // 添加用户消息
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type: 'user',
      content: userText
    }]);
    
    setIsLoading(true);

    // 模拟分身回复
    setTimeout(() => {
      const botResponse = generateBotResponse(userText);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        content: botResponse
      }]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickQuestion = (question) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type: 'user',
      content: question
    }]);
    
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(question);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        content: botResponse
      }]);
      setIsLoading(false);
    }, 800);
  };

  const generateBotResponse = (userInput) => {
    const responses = {
      '你在做什么': '最近在忙两件事：一是撰写材料，二是学习 AI。说白了就是想找到那个既能偷懒又能出活的方法。目前还在研究中……',
      '忙吗': '忙啊，那叫一个忙。但我发现忙不一定是坏事，关键是要忙出效率来。我现在主要精力就在「如何高效地偷懒」这个课题上。',
      '有意义吗': '有意义吗？这个问题问得好。我觉得做的事情能让自己和身边的人活得轻松一点，那就有意义。至于其他的嘛……(阴阳怪气脸)',
      '关于工作': '我现在的状态就是努力上班赚钱养家，不过内心的小火苗还是在思考怎么用最少的力气做最多的事。这不叫懒，这叫效率。',
      '你是谁': '我是 +7，一个毒舌但是社恐的 I 人。说话有点阴阳怪气，经常会让人不知道我是认真还是在开玩笑。最喜欢的活动是……躺着。',
      '爱好': '爱好？就是躺着。躺着思考人生，躺着刷手机，躺着工作（远程的时候）。简直是生活的终极解决方案。',
      '怎样高效工作': '这是我的必修课！我的方法就是：找到工作中真正重要的 20%，把 80% 的精力放在上面，剩下的交给自动化或者……创意偷懒。'
    };

    for (const [keyword, response] of Object.entries(responses)) {
      if (userInput.includes(keyword)) {
        return response;
      }
    }

    // 默认回复
    const defaultResponses = [
      '你这个问题有点意思，让我用我的阴阳怪气人设来回答：可能不是你想听的答案呢。',
      '嗯，你这是在测试我的智商吗？（认真脸）',
      '这个话题我可以聊，但得看我今天的社交电量还有多少…',
      '不错的问题。不过我更想知道，你为什么对这个感兴趣？',
      '你说的很对。不，我是说你说的话确实说了一遍。'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafaf8' }}>
      {/* 主容器 */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* 响应式布局：小屏幕竖排，大屏幕横排 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* 左侧：个人信息区 */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-6">
              {/* 头像区 */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center">
                  <div className="text-6xl">🐱</div>
                </div>
              </div>

              {/* 名字和介绍 */}
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-light text-gray-900">
                  +7
                </h1>
                <p className="text-base text-gray-600" style={{ color: '#9CAF88' }}>
                  一个毒舌但是社恐的 I 人
                </p>
              </div>

              {/* 信息展示区 */}
              <div className="space-y-4 pt-6">
                <div>
                  <p className="text-xs text-gray-500 font-semibold tracking-wider mb-2">
                    现在在做
                  </p>
                  <p className="text-sm text-gray-700">
                    撰写材料和学习 AI
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-semibold tracking-wider mb-2">
                    最喜欢的事
                  </p>
                  <p className="text-sm text-gray-700">
                    躺着
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-semibold tracking-wider mb-2">
                    记忆点
                  </p>
                  <p className="text-sm text-gray-700">
                    说话阴阳怪气
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-semibold tracking-wider mb-2">
                    一句话职业描述
                  </p>
                  <p className="text-sm text-gray-700">
                    努力上班，赚钱养家
                  </p>
                </div>
              </div>


            </div>
          </div>

          {/* 右侧：聊天区 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[500px] lg:h-[400px] overflow-hidden flex flex-col">
              
              {/* 聊天头部 */}
              <div className="border-b border-gray-200 px-6 py-4" style={{ backgroundColor: '#fafaf8' }}>
                <h2 className="text-base font-semibold text-gray-900">
                  与 +7 的数字分身聊天
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  问问关于工作、效率或其他的任何事
                </p>
              </div>

              {/* 消息区 */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'rounded-br-none text-white'
                          : 'rounded-bl-none text-gray-900 bg-gray-100'
                      }`}
                      style={message.type === 'user' ? { backgroundColor: '#9CAF88' } : {}}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                      <Loader className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 常见问题快捷按钮 */}
              <div className="border-t border-gray-200 px-6 py-3" style={{ backgroundColor: '#fafaf8' }}>
                <p className="text-xs text-gray-500 font-semibold mb-2">快速提问</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickQuestion('你在做什么')}
                    className="text-xs bg-white border border-gray-300 text-gray-700 rounded-full px-3 py-1 hover:border-gray-400 transition-colors cursor-pointer"
                  >
                    你在做什么
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickQuestion('你做的事有意义吗')}
                    className="text-xs bg-white border border-gray-300 text-gray-700 rounded-full px-3 py-1 hover:border-gray-400 transition-colors cursor-pointer"
                  >
                    有意义吗
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickQuestion('最近忙吗')}
                    className="text-xs bg-white border border-gray-300 text-gray-700 rounded-full px-3 py-1 hover:border-gray-400 transition-colors cursor-pointer"
                  >
                    最近忙吗
                  </button>
                </div>
              </div>

              {/* 输入区 */}
              <div className="border-t border-gray-200 bg-white px-6 py-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !isLoading && inputValue.trim()) {
                        handleSendMessage({ preventDefault: () => {} });
                      }
                    }}
                    placeholder="输入你的问题..."
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent cursor-text"
                    style={{ '--tw-ring-color': '#9CAF88' }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage({ preventDefault: () => {} })}
                    disabled={isLoading || !inputValue.trim()}
                    className="text-white rounded-lg px-4 py-2 transition-colors flex items-center gap-2 cursor-pointer disabled:bg-gray-300"
                    style={{ backgroundColor: isLoading || !inputValue.trim() ? '#ccc' : '#9CAF88' }}
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">发送</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

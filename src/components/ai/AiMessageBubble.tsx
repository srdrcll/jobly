import React, { useState } from 'react';
import { Bot, User, Copy, Check, RotateCw } from 'lucide-react';
import { AiMessage } from '@/types/ai';
import { useToast } from '@/hooks/useToast';

interface AiMessageBubbleProps {
  message: AiMessage;
  onRegenerate?: () => void;
}

export const AiMessageBubble: React.FC<AiMessageBubbleProps> = ({ message, onRegenerate }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Kopyalandı', 'Mesaj panoya kopyalandı.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start group animate-fadeIn`}>
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md ${
          isUser
            ? 'bg-gradient-to-tr from-blue-600 to-cyan-500'
            : 'bg-gradient-to-tr from-cyan-600 to-blue-600 border border-cyan-400/30'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Message Bubble Content */}
      <div className={`space-y-1.5 max-w-[85%] sm:max-w-[75%]`}>
        <div
          className={`p-4 rounded-2xl text-xs leading-relaxed transition-all shadow-sm ${
            isUser
              ? 'bg-blue-600 text-white font-medium rounded-tr-none'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
          }`}
        >
          {/* Simple Markdown & Formatting display */}
          <div className="whitespace-pre-wrap font-sans space-y-1">
            {message.content}
          </div>
        </div>

        {/* Message Actions Footer */}
        <div className={`flex items-center gap-2 text-[10px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span>{new Date(message.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>

          <button
            type="button"
            onClick={handleCopy}
            className="p-1 hover:text-foreground transition-colors rounded"
            title="Mesajı Kopyala"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>

          {!isUser && onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              className="p-1 hover:text-blue-500 transition-colors rounded"
              title="Yeniden Yanıt Üret"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

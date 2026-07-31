import React from 'react';
import { 
  FileText, 
  Mail, 
  Target, 
  Compass, 
  Zap, 
  DollarSign, 
  Linkedin,
  ArrowRight
} from 'lucide-react';
import { SUGGESTED_PROMPTS } from '@/constants/aiPrompts';
import { SuggestedPrompt } from '@/types/ai';

interface AiSuggestedPromptsProps {
  onSelectPrompt: (prompt: SuggestedPrompt) => void;
}

export const AiSuggestedPrompts: React.FC<AiSuggestedPromptsProps> = ({ onSelectPrompt }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'Mail':
        return <Mail className="w-5 h-5 text-cyan-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-amber-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'DollarSign':
        return <DollarSign className="w-5 h-5 text-teal-400" />;
      case 'Linkedin':
      default:
        return <Linkedin className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto py-6 animate-fadeIn">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-black text-foreground">Önerilen Kariyer & Mülakat Komutları</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Başlamak istediğiniz kariyer kategorisini seçin veya kendi sorunuzu aşağıya yazın.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SUGGESTED_PROMPTS.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectPrompt(item)}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer space-y-2 group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                {getIcon(item.iconName)}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {item.tag}
              </span>
            </div>

            <h4 className="text-xs font-bold text-foreground group-hover:text-blue-500 transition-colors">
              {item.title}
            </h4>

            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
              {item.prompt}
            </p>

            <div className="pt-1 flex items-center text-[10px] font-bold text-blue-500 group-hover:translate-x-1 transition-transform">
              <span>Sohbet Başlat</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

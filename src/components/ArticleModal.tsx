import React from 'react';
import { BlogPost } from '../data/companyData';
import { X, Calendar, Clock, User, CheckCircle2, BookmarkCheck } from 'lucide-react';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-pink-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-950 text-white p-6 sm:p-8 relative text-left border-b border-pink-900/40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-pink-400 font-semibold mb-3">
            <span>{post.category}</span>
            <span aria-hidden="true" className="text-pink-600">·</span>
            <span>{post.readTime}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-4">
            {post.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-pink-400" />
              <span>{post.author.name} ({post.author.role})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-pink-400" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-left">
          {/* Key Takeaways Box in Pink */}
          <div className="bg-pink-50/70 rounded-xl p-5 border border-pink-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-700 mb-3">
              <BookmarkCheck className="w-4 h-4 text-pink-600" />
              <span>Punts Clau d&apos;Estil &amp; Qualitat</span>
            </div>
            <div className="space-y-2">
              {post.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Article paragraphs */}
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-pink-50/50 px-6 py-4 border-t border-pink-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-pink-200 hover:bg-pink-100/60 rounded-lg transition-colors"
          >
            Tancar lectura
          </button>
        </div>
      </div>
    </div>
  );
};

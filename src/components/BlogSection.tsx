import React from 'react';
import { BlogPost } from '../data/companyData';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onOpenArticle: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onOpenArticle }) => {
  return (
    <section id="blog" className="py-20 bg-pink-50/30 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-2">
              <span>Actualitat & Regulació</span>
              <span aria-hidden="true" className="text-pink-300">/</span>
              <span>Blog de Comerç Exterior</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Últimes novetats i Blog
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Claus, tendències i bones pràctiques per a una gestió eficient de les rutes de distribució i transport portuari.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-pink-800 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-200">
            <BookOpen className="w-4 h-4 text-pink-600" />
            <span>Actualitzat mensualment segons normativa europea</span>
          </div>
        </div>

        {/* Blog Posts Grid with Pink Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => onOpenArticle(post)}
              className="bg-white rounded-2xl border border-pink-100 p-6 sm:p-7 shadow-xs hover:border-pink-300 hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left"
            >
              <div>
                {/* Clean unboxed metadata with separators in pink */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-pink-600">{post.category}</span>
                  <span aria-hidden="true" className="text-pink-300">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-pink-600 transition-colors leading-snug mb-3">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-5 border-t border-pink-100/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    {post.author.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {post.date}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

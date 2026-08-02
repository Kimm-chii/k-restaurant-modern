import React from 'react';
import { Star, Award, ExternalLink } from 'lucide-react';
import { restaurantContent } from '../data/restaurantContent';

export const TestimonialsFAQ: React.FC = () => {
  const { reviews, general } = restaurantContent;

  return (
    <section id="reviews" className="py-12 sm:py-16 bg-zinc-950 relative border-t border-zinc-900 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Reviews & Accolades</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Guest Experiences
          </h2>
          <p className="mt-3 text-zinc-400 font-light text-base sm:text-lg">
            Read feedback from culinary critics and food lovers. Want to leave a review? Click below to visit our official Google Business page.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={general.socials.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-xl hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Star className="w-4 h-4 fill-zinc-950" />
              <span>Write or View Reviews on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={general.socials.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>TripAdvisor Page</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-zinc-800/80 flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      {rev.badge}
                    </span>
                  )}
                </div>

                <blockquote className="text-zinc-200 font-light text-base leading-relaxed mb-6">
                  "{rev.comment}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-zinc-100">{rev.author}</h4>
                  <p className="text-zinc-500 font-medium">{rev.source}</p>
                </div>
                <span className="text-zinc-600 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

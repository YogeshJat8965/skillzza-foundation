import { stories } from '../../data/content';
import { useTicker } from '../../hooks/useTicker';
import Photo from '../ui/Photo';
import { ArrowLink, ArrowText, Eyebrow, SplitWords } from '../ui/primitives';
import './stories.css';

const WORD_ACCENTS = ['blue', 'orange', 'red'];
// Three stories are too few to fill a wide screen, so each group carries them twice.
const ROUND = [...stories.items, ...stories.items];

function StoryCard({ story, copy }) {
  return (
    <article className={`story-card group accent-${story.accent}`}>
      <Photo id={story.image} className="story-photo" sizes="(min-width: 1200px) 560px, 320px" alt={copy ? '' : undefined} />
      <span className="story-shade" aria-hidden="true" />
      <div className="story-body">
        <span className="tag story-tag">{story.tag}</span>
        <h3 className="story-title">{story.title}</h3>
        <a href="#" className="link-arrow story-link" tabIndex={copy ? -1 : undefined}>
          <ArrowText>{stories.readStory}</ArrowText>
        </a>
      </div>
    </article>
  );
}

export default function Stories() {
  const ticker = useTicker({ speed: 38 });

  return (
    <section id="stories" className="section-y stories" aria-labelledby="stories-title">
      <div className="container-x stories-head">
        <div>
          <Eyebrow accent="red">{stories.eyebrow}</Eyebrow>
          <h2 id="stories-title" className="stories-title" data-reveal="words">
            {stories.title.map((word, i) => (
              <span key={word}>
                <span className={`story-word accent-${WORD_ACCENTS[i]}`}>
                  <SplitWords text={word} start={i} />
                  <svg className="story-underline" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M3 9 C 50 3 120 2 197 7" style={{ '--n': i }} />
                  </svg>
                </span>
                {i < stories.title.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
        </div>
        <div className="stories-actions">
          <ArrowLink href="#" className="text-lg">
            {stories.viewAll}
          </ArrowLink>
        </div>
      </div>

      <div ref={ticker.viewportRef} className="ticker stories-ticker" data-reveal="fade">
        <div ref={ticker.trackRef} className="ticker-track">
          {[false, true].map((copy) => (
            <ul key={String(copy)} className="ticker-group" aria-hidden={copy || undefined}>
              {ROUND.map((story, i) => (
                <li key={i} className="ticker-item" aria-hidden={(!copy && i >= stories.items.length) || undefined}>
                  <StoryCard story={story} copy={copy || i >= stories.items.length} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

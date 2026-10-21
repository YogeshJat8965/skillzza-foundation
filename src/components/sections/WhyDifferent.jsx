import { whyDifferent } from '../../data/content';
import Petals from '../brand/Petals';
import { Eyebrow, SplitWords } from '../ui/primitives';
import './different.css';

export default function WhyDifferent() {
  const [first, second] = whyDifferent.title;
  return (
    <section id="why-different" className="section-y diff" aria-labelledby="diff-title">
      <div className="container-x diff-grid">
        <div className="diff-head">
          <Eyebrow accent="violet">{whyDifferent.eyebrow}</Eyebrow>
          <h2 id="diff-title" className="diff-title" data-reveal="words">
            <span className="block">
              <SplitWords text={first} />
            </span>{' '}
            <span className="diff-rule" aria-hidden="true" />
            <span className="block diff-title-muted">
              <SplitWords text={second} start={first.split(' ').length} />
            </span>
          </h2>
          <Petals className="diff-petals" />
        </div>

        <ol className="diff-list">
          {whyDifferent.items.map((item) => (
            <li key={item.n} className="diff-item" data-reveal>
              <span className="diff-n" aria-hidden="true">
                {item.n}
              </span>
              <div>
                <h3 className="diff-item-title">{item.title}</h3>
                <p className="diff-item-text">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

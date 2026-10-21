import { getInvolved } from '../../data/content';
import { useSectionFocus } from '../../hooks/useSectionFocus';
import Petals from '../brand/Petals';
import { ArrowText, Eyebrow } from '../ui/primitives';
import './involved.css';

const PETAL_TURN = { csr: -116, government: -40, employers: 176, 'young-people': 108 };

export default function GetInvolved() {
  const spotlight = useSectionFocus('get-involved');
  const { title } = getInvolved;
  return (
    <section id="get-involved" className="section-y involve" aria-labelledby="involve-title">
      <div className="container-x">
        <Eyebrow accent="red">{getInvolved.eyebrow}</Eyebrow>
        <h2 id="involve-title" className="involve-title" data-reveal>
          {title.before}
          <span className="involve-em">
            <svg className="involve-swoosh" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
              <path d="M4 16 C 80 4 200 2 296 12" />
            </svg>
            <span className="text-gradient">{title.emphasis}</span>
          </span>
          {title.end}
        </h2>

        <ul className="involve-grid">
          {getInvolved.items.map((item, i) => (
            <li
              key={item.id}
              className={`involve-card group accent-${item.accent}`}
              data-spotlight={spotlight === item.id || undefined}
              data-reveal
              style={{ '--i': i, '--turn': `${PETAL_TURN[item.id]}deg` }}
            >
              <span className="involve-fill" aria-hidden="true" />
              <span className="involve-petal" aria-hidden="true">
                <Petals />
              </span>
              <p className="involve-audience">{item.audience}</p>
              <h3 className="involve-card-title">{item.title}</h3>
              <p className="involve-text">{item.body}</p>
              <a href="#" className="link-arrow involve-link">
                <ArrowText>{item.cta}</ArrowText>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

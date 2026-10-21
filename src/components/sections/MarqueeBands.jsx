import { hero } from '../../data/content';
import Sparkle from '../brand/Sparkle';
import Marquee from '../ui/Marquee';

// Two crossed tapes under the hero: the six programmes, and the Learn. Earn. Lead. promise.
export default function MarqueeBands() {
  return (
    <div className="bands">
      <div className="band band-a">
        <Marquee duration={42}>
          {hero.programmes.map((name) => (
            <span key={name} className="band-item">
              {name}
              <Sparkle className="band-sep" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="band band-b">
        <Marquee duration={34} reverse repeat={4}>
          <span className="band-item">
            {hero.headline.map((word, i) => (
              <span key={word}>
                {word.slice(0, -1)}
                <span className={`hero-stop stop-${i}`}>.</span>
                {i < hero.headline.length - 1 ? ' ' : ''}
              </span>
            ))}
            <Sparkle className="band-sep" />
          </span>
        </Marquee>
      </div>
    </div>
  );
}

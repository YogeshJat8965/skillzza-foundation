import { Fragment } from 'react';
import { PiSealCheckDuotone } from 'react-icons/pi';
import { donate } from '../../data/content';
import Petals from '../brand/Petals';
import Sparkle from '../brand/Sparkle';
import Star from '../brand/Star';
import { Button, Odometer } from '../ui/primitives';
import './donate.css';

export default function DonateBand() {
  return (
    <section id="donate" className="donate-wrap" aria-labelledby="donate-title">
      <div className="container-x">
        <div className="donate on-dark" data-reveal>
          <span className="donate-glow" aria-hidden="true" />
          <Petals className="donate-petals" />
          <Star className="donate-star" />

          <h2 id="donate-title" className="donate-title">
            <Sparkle className="donate-sparkle" />
            {donate.title}
          </h2>

          <div className="donate-tiers">
            {donate.tiers.map((tier, i) => (
              <Fragment key={tier.amount}>
                {i > 0 && (
                  <span className="donate-sep" aria-hidden="true">
                    ·
                  </span>
                )}
                <div className={`donate-tier accent-${tier.accent}`} data-reveal style={{ '--i': i + 1 }}>
                  <Odometer value={tier.amount} className="donate-amount" />
                  <span className="donate-text">{tier.text}</span>
                </div>
              </Fragment>
            ))}
          </div>

          <p className="donate-note">
            <PiSealCheckDuotone aria-hidden="true" />
            {donate.note}
          </p>
          <div className="donate-ctas">
            <Button type="button" burst magnetic>
              {donate.primaryCta}
            </Button>
            <Button type="button" variant="ghost-light" burst>
              {donate.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

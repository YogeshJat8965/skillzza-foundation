import { PiClockDuotone, PiEnvelopeSimpleDuotone, PiMapPinDuotone } from 'react-icons/pi';
import { logoFullDark } from '../brand/logos';
import { footer, newsletter } from '../../data/content';
import { ArrowText } from '../ui/primitives';
import './footer.css';

const WORD_ACCENTS = ['blue', 'orange', 'red'];

export default function Footer() {
  const words = footer.tagline.split(' ');
  return (
    <footer className="footer on-dark">
      <div className="container-x">
        <div className="footer-news">
          <div>
            <h2 className="footer-news-title">{newsletter.title}</h2>
            <p className="footer-news-text">{newsletter.body}</p>
          </div>
          <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="footer-label">
              {newsletter.label}
            </label>
            <div className="footer-field">
              <input id="newsletter-email" type="email" name="email" placeholder={newsletter.placeholder} autoComplete="email" required />
              <button type="submit" className="btn btn-primary btn-sm" data-burst>
                {newsletter.cta}
              </button>
            </div>
          </form>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <img {...logoFullDark} sizes="260px" alt="" loading="lazy" className="footer-logo" />
            <p className="footer-name">{footer.name}</p>
            <p className="footer-tagline">{footer.tagline}</p>
          </div>

          <address id="contact" className="footer-contact" tabIndex={-1}>
            <p>
              <PiMapPinDuotone aria-hidden="true" />
              <span>
                {footer.address}
                <br />
                {footer.registered}
              </span>
            </p>
            <p>
              <PiEnvelopeSimpleDuotone aria-hidden="true" />
              <span>
                <span className="footer-nowrap">{footer.email}</span> · <span className="footer-nowrap">{footer.phone}</span>
              </span>
            </p>
            <p>
              <PiClockDuotone aria-hidden="true" />
              <span>{footer.hours}</span>
            </p>
          </address>

          {footer.columns.map((column) => (
            <nav key={column.title} className="footer-col" aria-labelledby={`footer-${column.title}`}>
              <p id={`footer-${column.title}`} className="footer-col-title">
                {column.title}
              </p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} data-focus={link.focus} className="footer-link">
                      <ArrowText>{link.label}</ArrowText>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="footer-wordmark" aria-hidden="true">
          {words.map((word, i) => (
            <span key={word} className={`accent-${WORD_ACCENTS[i]}`}>
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}

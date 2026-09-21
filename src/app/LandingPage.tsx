import { Link } from "react-router-dom";
import { StoryStage } from "../components/story/StoryStage";
import { landing } from "../content/landing";
import "../styles/lp.css";

export function LandingPage() {
  const {
    brand,
    backToDemo,
    nav,
    hero,
    now,
    changed,
    grow,
    faq,
    takeaways,
    end,
  } = landing;

  return (
    <div className="lp-page">
      <header className="lp-hd">
        <div className="lp-hd-in">
          <Link className="lp-brand" to="/board">
            {brand}
          </Link>
          <nav className="lp-nav" aria-label="説明の目次">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <Link className="lp-nav-demo" to="/board">
              {backToDemo}
            </Link>
          </nav>
        </div>
      </header>

      <main className="lp-main">
        <section className="lp-hero" aria-labelledby="lp-hero-title">
          <p className="lp-kicker">{hero.kicker}</p>
          <h1 id="lp-hero-title">{hero.title}</h1>
          {hero.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="lp-actions">
            <Link className="lp-btn" to="/board">
              {hero.primary}
            </Link>
            <a className="lp-btn ghost" href={`#${now.id}`}>
              {hero.secondary}
            </a>
          </div>
        </section>

        <section className="lp-band is-white" id={now.id} aria-labelledby="lp-now-title">
          <p className="lp-kicker">{now.kicker}</p>
          <div className="lp-grid">
            <div className="lp-copy">
              <h2 id="lp-now-title">{now.title}</h2>
              {now.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="lp-note">{now.note}</p>
            </div>
            <div className="lp-figure">
              <StoryStage mode="part1" />
            </div>
          </div>
        </section>

        <section
          className="lp-band is-soft"
          id={changed.id}
          aria-labelledby="lp-changed-title"
        >
          <p className="lp-kicker">{changed.kicker}</p>
          <div className="lp-grid">
            <div className="lp-copy">
              <h2 id="lp-changed-title">{changed.title}</h2>
              {changed.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="lp-hint">{changed.bridge}</p>
              <div className="lp-compare">
                <div>
                  <h3>{changed.keepTitle}</h3>
                  <ul>
                    {changed.keep.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{changed.changeTitle}</h3>
                  <ul>
                    {changed.change.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="lp-note is-white">{changed.note}</p>
            </div>
            <div className="lp-figure">
              <StoryStage mode="part3" />
            </div>
          </div>
        </section>

        <section className="lp-band is-white" id={grow.id} aria-labelledby="lp-grow-title">
          <p className="lp-kicker">{grow.kicker}</p>
          <div className="lp-grid">
            <div className="lp-copy">
              <h2 id="lp-grow-title">{grow.title}</h2>
              {grow.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="lp-note">{grow.note}</p>
            </div>
            <div className="lp-figure">
              <StoryStage mode="part4" />
            </div>
          </div>
        </section>

        <section className="lp-band is-soft" id={faq.id} aria-labelledby="lp-faq-title">
          <p className="lp-kicker">{faq.kicker}</p>
          <h2 id="lp-faq-title">{faq.title}</h2>
          <div className="lp-faq">
            {faq.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="lp-band is-white"
          id={takeaways.id}
          aria-labelledby="lp-take-title"
        >
          <p className="lp-kicker">{takeaways.kicker}</p>
          <h2 id="lp-take-title">{takeaways.title}</h2>
          <ul className="lp-cards">
            {takeaways.items.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="lp-end" aria-labelledby="lp-end-title">
          <h2 id="lp-end-title">{end.title}</h2>
          <p>{end.body}</p>
          <Link className="lp-btn" to="/board">
            {end.cta}
          </Link>
          <p className="lp-hint">{end.note}</p>
        </section>
      </main>
    </div>
  );
}

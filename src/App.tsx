import { useEffect, useRef, useState } from "react";
import OrbScene from "./components/OrbScene";
import ParticlesScene from "./components/ParticlesScene";

type GalleryItem = {
  title: string;
  meta: string;
  image: string;
};

type TimelineItem = {
  title: string;
  text: string;
  icon: "film" | "sparkle" | "pen";
};

const services = [
  {
    title: "Fotografia",
    text:
      "Trabalho com fotografia desde 2017 e estou sempre atenta a novas tendências de criação de imagens. Confira todos meus trabalhos fotográficos clicando aqui.",
    image: "/images/service-foto.svg",
  },
  {
    title: "Produção e Gestão de Projetos",
    text:
      "Atualmente, sou Gestora de Projetos na Weach Group, um veículo de mídia responsável pela estratégia de performance digital de grandes marcas.",
    image: "/images/service-projetos.svg",
  },
  {
    title: "Roteiro e redação publicitária",
    text:
      "Experiência na criação de roteiros para mídias digitais, curtas-metragens, textos persuasivos e storytelling para redes sociais.",
    image: "/images/service-roteiro.svg",
  },
];

const gallery: GalleryItem[] = [
  {
    title: "Insular (2020)",
    meta: "Curta-Metragem | Festival Curta à Crise | Mostra Audiovisual em Curtas",
    image: "/images/insular.svg",
  },
  {
    title: "Ebony (2021)",
    meta: "Festival Rap contra a Fome | Cobertura Fotográfica",
    image: "/images/ebony.svg",
  },
  {
    title: "Luzes de Copacabana (2021)",
    meta: "Videoclipe | Produção Audiovisual | Fotografia Still",
    image: "/images/copacabana.svg",
  },
  {
    title: "Fotografia de produto (2021 - 2024)",
    meta: "Campanhas | Produção de imagem",
    image: "/images/produtos.svg",
  },
];

const timelineItems: TimelineItem[] = [
  {
    title: "2020",
    text: "Produzi e roteirizei meu primeiro curta-metragem, que rodou festivais e amostras online durante a pandemia.",
    icon: "film",
  },
  {
    title: "2021",
    text: "Participei de uma campanha de financiamento coletivo para um curta e iniciei a carreira no marketing digital.",
    icon: "sparkle",
  },
  {
    title: "Agora",
    text: "Desenvolvi habilidades em redação publicitária, copywriting, escrita de roteiro, produção audiovisual e gestão de projetos.",
    icon: "pen",
  },
];

const sections = [
  { id: "top", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "historico", label: "Histórico" },
  { id: "servicos", label: "Serviços" },
  { id: "galeria", label: "Galeria" },
  { id: "contato", label: "Contato" },
];

const revealStyle = (delay: number) =>
  ({ "--delay": `${delay}s` } as React.CSSProperties);

function TimelineIcon({ type }: { type: TimelineItem["icon"] }) {
  if (type === "film") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="4" fill="currentColor" />
        <circle cx="9" cy="12" r="2.3" fill="#f5eeeb" />
        <circle cx="15" cy="12" r="1.4" fill="#f5eeeb" />
      </svg>
    );
  }
  if (type === "sparkle") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4.5l1.9 4.2 4.6 1.1-4 2.9.9 4.6-3.4-2.4-3.4 2.4.9-4.6-4-2.9 4.6-1.1L12 4.5z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 19l6.5-2.2 7-7a2.2 2.2 0 0 0-3.1-3.1l-7 7L5 19z"
        fill="currentColor"
      />
      <path d="M14.6 6.6l2.8 2.8" stroke="#f5eeeb" strokeWidth="1.6" />
    </svg>
  );
}

export default function App() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isLightboxClosing, setIsLightboxClosing] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [showTop, setShowTop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const scrollContainer = document.querySelector<HTMLElement>(".page");
    if (!hero) return undefined;

    const updateScroll = () => {
      const scrollTop = scrollContainer?.scrollTop ?? window.scrollY;
      hero.style.setProperty(
        "--scroll-shift",
        `${Math.min(scrollTop * -0.05, 0)}px`
      );
      setShowTop(scrollTop > 120);
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--parallax-x", x.toFixed(3));
      hero.style.setProperty("--parallax-y", y.toFixed(3));
    };

    const resetPointer = () => {
      hero.style.setProperty("--parallax-x", "0");
      hero.style.setProperty("--parallax-y", "0");
    };

    updateScroll();
    scrollContainer?.addEventListener("scroll", updateScroll, { passive: true });
    hero.addEventListener("pointermove", handlePointer);
    hero.addEventListener("pointerleave", resetPointer);

    return () => {
      scrollContainer?.removeEventListener("scroll", updateScroll);
      hero.removeEventListener("pointermove", handlePointer);
      hero.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(".page");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: scrollContainer ?? null,
        threshold: 0.6,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeItem) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  const handleOpenLightbox = (item: GalleryItem) => {
    setActiveItem(item);
    setIsLightboxClosing(false);
  };

  const handleCloseLightbox = () => {
    setIsLightboxClosing(true);
    window.setTimeout(() => {
      setActiveItem(null);
      setIsLightboxClosing(false);
    }, 260);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollTop = () => {
    const scrollContainer = document.querySelector<HTMLElement>(".page");
    scrollContainer?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page">
      <header className="hero section" id="top" ref={heroRef}>
        <div className="hero-media" data-reveal style={revealStyle(0.1)}>
          <img
            src="/images/hero.svg"
            alt="Marianna Quintanilha"
            className="hero-image"
          />
        </div>
        <div className="hero-text" data-reveal style={revealStyle(0.2)}>
          <p className="eyebrow">PORTFOLIO</p>
          <h1>
            Marianna
            <br />
            Quintanilha
          </h1>
          <p className="hero-subtitle">COMUNICAÇÃO | MARKETING | AUDIOVISUAL</p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => handleScrollTo("galeria")}
            >
              Ver trabalhos
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => handleScrollTo("contato")}
            >
              Entrar em contato
            </button>
          </div>
        </div>
      </header>

      <section className="about section" id="sobre" data-reveal style={revealStyle(0.1)}>
        <div className="about-photo">
          <div className="burst" aria-hidden />
          <img src="/images/about.svg" alt="Retrato" />
        </div>
        <div className="about-text">
          <h2>Sobre mim</h2>
          <p>
            Fotógrafa, Bacharel em Artes com habilitação em Cinema e Audiovisual
            pela Universidade Federal da Bahia (UFBA), com experiência em
            marketing digital, produção de conteúdo para redes sociais, gestão de
            campanhas publicitárias e produção audiovisual para diferentes
            plataformas de mídia.
          </p>
          <p>
            Tenho ampla experiência em ambientes de agência, veículos de mídia e
            produtoras. Com forte domínio da linguagem digital, excelente
            comunicação escrita e capacidade de resolver problemas de forma
            estratégica.
          </p>
          <p className="highlight">
            Possuo um perfil interdisciplinar <strong>pautado pela organização</strong>,
            <strong> criatividade</strong> e <strong>adaptabilidade</strong>.
          </p>
        </div>
      </section>

      <section className="timeline section" id="historico" data-reveal style={revealStyle(0.1)}>
        <div className="timeline-title">
          <span>Um breve histórico profissional</span>
        </div>
        <div className="timeline-track">
          {timelineItems.map((item, index) => (
            <article
              key={item.title}
              className="timeline-item"
              data-reveal
              style={revealStyle(0.15 + index * 0.1)}
            >
              <div className="timeline-icon" aria-hidden="true">
                <TimelineIcon type={item.icon} />
              </div>
              <div className="timeline-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services section" id="servicos" data-reveal style={revealStyle(0.1)}>
        <h2>Posso somar na sua equipe com...</h2>
        <div className="service-grid">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-card"
              data-reveal
              style={revealStyle(0.15 + index * 0.08)}
            >
              <img src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <button className="text-link" type="button">
                Saiba mais
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery section" id="galeria">
        <ParticlesScene className="particles-canvas" />
        <div className="gallery-header" data-reveal style={revealStyle(0.1)}>
          <h2>Audiovisual</h2>
          <p>Projetos autorais, direção criativa e cobertura fotográfica.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className="gallery-card"
              onClick={() => handleOpenLightbox(item)}
              data-reveal
              style={revealStyle(0.15 + index * 0.08)}
            >
              <img src={item.image} alt={item.title} />
              <div className="gallery-caption">
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="gallery-orbs">
          <OrbScene className="orb-canvas" />
        </div>
      </section>

      <section className="contact section" id="contato" data-reveal style={revealStyle(0.1)}>
        <div className="contact-inner">
          <div>
            <h2>Vamos bater um papo?</h2>
            <div className="contact-group">
              <p className="label">MINHAS REDES</p>
              <div className="contact-icons">
                <a href="#" aria-label="Instagram" className="icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                    />
                    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="9" width="3.5" height="11" fill="currentColor" />
                    <rect x="4" y="4" width="3.5" height="3.5" fill="currentColor" />
                    <path
                      d="M10.5 9H14a4 4 0 0 1 4 4v7h-3.5v-6a2 2 0 0 0-2-2h-2v8h-3.5V9z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="contact-group">
              <p className="label">TELEFONE</p>
              <p>(21) 99629-5466</p>
            </div>
            <div className="contact-group">
              <p className="label">EMAIL</p>
              <p>mariannaquintanilha@gmail.com</p>
            </div>
          </div>
        </div>
        <OrbScene className="contact-orbs" />
      </section>

      <nav className="section-indicator" aria-label="Seções">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={
              activeSection === section.id
                ? "section-dot is-active"
                : "section-dot"
            }
            onClick={() => handleScrollTo(section.id)}
            aria-label={section.label}
            aria-current={activeSection === section.id}
          />
        ))}
      </nav>

      <button
        type="button"
        className={showTop ? "back-to-top is-visible" : "back-to-top"}
        onClick={handleScrollTop}
        aria-label="Voltar ao topo"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 5l6.5 6.5-1.8 1.8L12 8.6l-4.7 4.7-1.8-1.8L12 5z"
            fill="currentColor"
          />
          <rect x="6.5" y="15.5" width="11" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>

      {activeItem && (
        <div
          className={
            isLightboxClosing ? "lightbox is-closing" : "lightbox is-open"
          }
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-backdrop" onClick={handleCloseLightbox} />
          <div
            className="lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={handleCloseLightbox}
            >
              Fechar
            </button>
            <img src={activeItem.image} alt={activeItem.title} />
            <div className="lightbox-text">
              <h3>{activeItem.title}</h3>
              <p>{activeItem.meta}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

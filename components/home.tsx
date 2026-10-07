import { VkLink } from "@/components/vk-link";
import { Faq } from "@/components/faq";
import { Icon, type IconName } from "@/components/icon";
import { features, reviews, steps, tariffs } from "@/lib/site";

export function Home() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-bg" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-art" aria-hidden="true">
            <HeroArt />
          </div>
          <div className="hero-card">
            <h1>Анонимный чат для знакомств и общения</h1>
            <p className="lede">
              Общайся анонимно в Телеграме и ВКонтакте.
            </p>
            <p className="hero-stat">Более 10 000 пользователей</p>
            <div className="icon-row" aria-hidden="true">
              <span className="tile tile-purple">
                <Icon name="heart" />
              </span>
              <span className="tile tile-green">
                <Icon name="people" />
              </span>
              <span className="tile tile-orange">
                <Icon name="chat" />
              </span>
              <span className="tile tile-yellow">
                <Icon name="star" />
              </span>
              <span className="tile tile-blue">
                <Icon name="moon" />
              </span>
            </div>
            <VkLink className="btn btn-lime btn-lg">Начать чат</VkLink>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="wrap">
          <div className="section-head">
            <svg className="spark" viewBox="0 0 80 80" aria-hidden="true">
              <path fill="#ffe14a" d="M40 4l6 22 22 6-22 6-6 22-6-22-22-6 22-6z" />
            </svg>
            <h2>Ваши возможности</h2>
            <p className="section-lead">Всё, что уже есть в диалоге с ботом</p>
          </div>
          <div className="cards">
            {features.map((feature) => (
              <article className="card" key={feature.title}>
                <span className={`card-icon icon-${feature.tone}`}>
                  <Icon name={feature.icon as IconName} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight" id="how">
        <div className="wrap">
          <div className="section-head">
            <h2>Как это работает</h2>
            <p className="section-lead">Четыре шага до первого сообщения</p>
          </div>
          <ol className="steps">
            {steps.map((step) => (
              <li key={step.title}>
                <span className={`step-icon step-${step.tone}`}>
                  <Icon name={step.icon as IconName} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="center">
            <VkLink className="btn btn-lime btn-lg">Начать знакомство</VkLink>
          </div>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="wrap">
          <div className="section-head">
            <h2>Отзывы</h2>
            <p className="section-lead">Более 10 000 пользователей уже знакомятся и общаются</p>
          </div>
          <div className="reviews">
            {reviews.map((review) => (
              <figure className="review" key={review.name}>
                <blockquote>{review.text}</blockquote>
                <figcaption>{review.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="tariffs" id="premium">
        <div className="wrap">
          <div className="section-head">
            <Crown />
            <h2>Премиум</h2>
            <p className="section-lead">
              Раскрой весь потенциал и найди идеальных собеседников быстрее
            </p>
          </div>
          <div className="tariff-scroller">
            {tariffs.map((tariff) => (
              <article className={`tariff-card tariff-${tariff.tone}`} key={tariff.id}>
                {"badge" in tariff && tariff.badge ? (
                  <p className={`tariff-badge badge-${tariff.badgeTone}`}>{tariff.badge}</p>
                ) : null}
                <h3>{tariff.name}</h3>
                <p className="tariff-term">{tariff.term}</p>
                <p className="tariff-price">
                  {tariff.price} <span>₽</span>
                </p>
                <p className="tariff-old">{"oldPrice" in tariff ? tariff.oldPrice : ""}</p>
                <p className="tariff-day">{"perDay" in tariff ? tariff.perDay : ""}</p>
                <VkLink className="btn tariff-btn">Начать чат</VkLink>
              </article>
            ))}
          </div>
          <p className="tariff-note">
            Совершая покупку, вы соглашаетесь с{" "}
            <a href="#privacy">Политикой конфиденциальности</a>,{" "}
            <a href="#terms">Условиями сервиса</a> и <a href="#premium">Тарифами</a>.
          </p>
        </div>
      </section>

      <section className="section" id="about">
        <div className="wrap">
          <div className="about">
            <div className="about-copy">
              <h2>О сервисе</h2>
              <p>
                Искра — анонимный чат во ВКонтакте для знакомств и общения. Не нужно заполнять
                анкету: пишешь в диалог, выбираешь, кого искать, и получаешь первое сообщение.
              </p>
            </div>
            <dl className="facts">
              <div>
                <dt>Где</dt>
                <dd>Вконтакте и Телеграмм</dd>
              </div>
              <div>
                <dt>С кем</dt>
                <dd>Мужчина, Женщина, случайно</dd>
              </div>
              <div>
                <dt>Кому</dt>
                <dd>Тематические комнаты, Флирт, Общение и т.д.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Faq />

      <section className="cta-band">
        <div className="wrap cta-inner">
          <h2>Готов начать диалог?</h2>
          <p>Открой бота во ВКонтакте и нажми «Поиск».</p>
          <VkLink className="btn btn-lime btn-lg">Начать чат</VkLink>
        </div>
      </section>

      <section className="section legal" id="privacy">
        <div className="wrap legal-grid">
          <article>
            <h2>Конфиденциальность</h2>
            <p>
              Переписка идёт в диалоге сообщества ВКонтакте. Сообщения видит ВКонтакте по своим
              правилам. Бот хранит состояние текущего диалога, чтобы отвечать в той же
              переписке: этап поиска, выбранный пол и текст реплик.
            </p>
            <p>
              Не присылайте пароли, коды из смс и данные карт. Чтобы остановить диалог, нажмите
              «Закончить диалог».
            </p>
          </article>
          <article id="terms">
            <h2>Условия</h2>
            <p>
              В переписке нельзя рекламировать услуги и рассылать спам.
            </p>
            <p>
              Бот может завершить диалог, если собеседник просит остановиться. Искра не обещает
              знакомство с конкретным человеком.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

function Crown() {
  return (
    <svg className="crown" viewBox="0 0 140 78" aria-hidden="true">
      <path fill="#f6c445" d="M12 62 24 24l26 18L70 8l20 34 26-18 12 38z" />
      <path fill="#e2a428" d="M16 62h108v8a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4z" />
      <circle cx="24" cy="22" r="7" fill="#3aa0ff" />
      <circle cx="70" cy="10" r="8" fill="#3aa0ff" />
      <circle cx="116" cy="22" r="7" fill="#3aa0ff" />
      <circle cx="24" cy="22" r="3" fill="#dff2ff" />
      <circle cx="70" cy="10" r="3.2" fill="#dff2ff" />
      <circle cx="116" cy="22" r="3" fill="#dff2ff" />
      <path fill="#ffe56a" d="M108 6l2.2 5.2 5.4.4-4.2 3.4 1.4 5.2-4.8-3-4.8 3 1.4-5.2-4.2-3.4 5.4-.4z" />
    </svg>
  );
}

function HeroArt() {
  return (
    <svg className="hero-svg" viewBox="0 0 280 420">
      <ellipse cx="150" cy="400" rx="78" ry="12" fill="#e85d00" opacity=".35" />
      <rect x="108" y="196" width="108" height="150" rx="46" fill="#ff8a2a" />
      <rect x="128" y="230" width="68" height="10" rx="5" fill="#ffb15a" opacity=".7" />
      <ellipse cx="214" cy="268" rx="18" ry="34" fill="#ffb703" transform="rotate(18 214 268)" />
      <circle cx="156" cy="132" r="58" fill="#ffd3ad" />
      <path
        d="M104 128c2-46 28-78 62-78 22 0 40 12 50 32-22 10-36 4-50-6-12-8-28-10-42 0-10 8-16 24-20 52z"
        fill="#2b211c"
      />
      <ellipse cx="138" cy="134" rx="6.5" ry="7.5" fill="#2b211c" />
      <ellipse cx="178" cy="134" rx="6.5" ry="7.5" fill="#2b211c" />
      <circle cx="140" cy="132" r="2" fill="#fff" />
      <circle cx="180" cy="132" r="2" fill="#fff" />
      <path
        d="M146 156c6 7 16 7 22 0"
        fill="none"
        stroke="#e07a62"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="122" cy="150" rx="8" ry="4" fill="#ffb09a" />
      <ellipse cx="192" cy="150" rx="8" ry="4" fill="#ffb09a" />
      <g transform="rotate(12 196 300)">
        <rect x="168" y="248" width="70" height="112" rx="12" fill="#1b1b1b" />
        <rect x="175" y="258" width="56" height="90" rx="7" fill="#f6f3ee" />
        <rect x="184" y="272" width="32" height="6" rx="3" fill="#ff7420" />
        <rect x="184" y="284" width="22" height="6" rx="3" fill="#ff7420" opacity=".45" />
        <rect x="196" y="300" width="28" height="6" rx="3" fill="#7aa2ff" />
      </g>
      <g>
        <rect x="18" y="48" width="72" height="56" rx="20" fill="#d8ff57" />
        <path d="M46 104 l12-16 8 4" fill="#d8ff57" />
        <path
          d="M54 64c-6 0-10 4-10 9 0 8 10 14 10 14s10-6 10-14c0-5-4-9-10-9z"
          fill="#ff4d6d"
        />
      </g>
      <g>
        <rect x="8" y="132" width="52" height="42" rx="16" fill="#fff" />
        <path d="M28 174 l8-12 6 3" fill="#fff" />
        <path d="M34 146c-5 0-8 3-8 7 0 6 8 11 8 11s8-5 8-11c0-4-3-7-8-7z" fill="#ff4d6d" />
      </g>
    </svg>
  );
}

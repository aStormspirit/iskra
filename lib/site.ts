export const siteName = "Искра";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
).replace(/\/$/, "");

export const siteTitle = "Искра — анонимный чат для знакомств и общения";

export const siteDescription =
  "Искра — анонимный чат во ВКонтакте для знакомств и общения. Выбери собеседника и начни диалог за пару секунд.";

export const vkUrl = "https://vk.com/im?sel=-242042389";

export const features = [
  {
    icon: "search",
    tone: "orange",
    title: "Мгновенный поиск",
    text: "Кнопка «Поиск» запускает подбор. Собеседник появляется через пару секунд.",
  },
  {
    icon: "list",
    tone: "blue",
    title: "Кого ищем",
    text: "Девушка, парень или любой. Выбор действует на следующий поиск.",
  },
  {
    icon: "lock",
    tone: "green",
    title: "Анонимность",
    text: "Без анкеты. Переписка идёт в диалоге сообщества, пока вы сами не расскажете о себе.",
  },
  {
    icon: "swap",
    tone: "purple",
    title: "Следующий собеседник",
    text: "Один тап заканчивает текущий диалог и сразу ищет нового.",
  },
  {
    icon: "shield",
    tone: "yellow",
    title: "Стоп и жалоба",
    text: "«Закончить диалог» возвращает в меню. Жалоба на спам сразу открывает новый поиск.",
  },
  {
    icon: "spark",
    tone: "pink",
    title: "Премиум в меню",
    text: "Кнопка «Премиум доступ» лежит в главном меню рядом с поиском.",
  },
] as const;

export const steps = [
  {
    icon: "chat",
    tone: "orange",
    title: "Напиши боту",
    text: "Открой диалог сообщества во ВКонтакте или нажми «Начать».",
  },
  {
    icon: "people",
    tone: "blue",
    title: "Выбери, кого ищешь",
    text: "Девушка, парень или случайный собеседник.",
  },
  {
    icon: "search",
    tone: "purple",
    title: "Нажми «Поиск»",
    text: "Бот напишет, что ищет, и через секунду откроет диалог.",
  },
  {
    icon: "heart",
    tone: "green",
    title: "Общайся",
    text: "Собеседник пишет первым. Диалог можно закончить в любой момент.",
  },
] as const;

export const reviews = [
  {
    name: "Аня",
    text: "Зашла без анкеты и сразу нашла, с кем поговорить. Всё прямо в диалоге ВКонтакте.",
  },
  {
    name: "Максим",
    text: "Удобно выбирать, кого искать. Если разговор не идёт, можно перейти к следующему.",
  },
  {
    name: "Лера",
    text: "Нравится, что можно остаться анонимной, пока сама не расскажешь о себе.",
  },
  {
    name: "Игорь",
    text: "Пишу вечером, когда хочется живого общения. Отвечают быстро.",
  },
  {
    name: "Катя",
    text: "Простой чат: нажала поиск и уже через секунду был диалог.",
  },
  {
    name: "Денис",
    text: "Закончить разговор можно в любой момент. Из-за этого общаться спокойнее.",
  },
] as const;

export const tariffs = [
  {
    id: "trial",
    name: "Пробный",
    term: "3 дня",
    price: "1",
    badge: "Попробуй",
    badgeTone: "green",
    tone: "slate",
  },
  {
    id: "start-until",
    name: "Старт",
    term: "3 дня",
    price: "399",
    perDay: "133 ₽ / день",
    badge: "до 01.10.2026",
    badgeTone: "dark",
    tone: "blue",
  },
  {
    id: "start-from",
    name: "Старт",
    term: "3 дня",
    price: "499",
    perDay: "166 ₽ / день",
    badge: "с 01.10.2026",
    badgeTone: "green",
    tone: "violet",
  },
  {
    id: "optimal",
    name: "Оптимальный",
    term: "30 дней",
    price: "990",
    oldPrice: "1490₽",
    perDay: "30 ₽ / день",
    badge: "популярный",
    badgeTone: "green",
    tone: "orange",
  },
  {
    id: "max",
    name: "Максимум",
    term: "365 дней",
    price: "2026",
    oldPrice: "4990₽",
    perDay: "6 ₽ / день",
    tone: "purple",
  },
] as const;

export const faq = [
  {
    question: "Что такое Искра?",
    answer:
      "Это анонимный чат во ВКонтакте для знакомств и общения. Нажимаешь поиск — и попадаешь в диалог.",
  },
  {
    question: "Нужно ли регистрироваться?",
    answer:
      "Нет. Достаточно открыть диалог сообщества. Отдельный аккаунт на сайте не создаётся.",
  },
  {
    question: "Можно ли выбрать пол собеседника?",
    answer: "Да. В меню есть «Выбрать пол партнера»: девушка, парень или любой.",
  },
  {
    question: "Как закончить разговор?",
    answer:
      "В диалоге есть «Закончить диалог» и «Следующий собеседник». Напиши «Начать», чтобы вернуться в меню.",
  },
  {
    question: "Что делает жалоба?",
    answer:
      "Кнопка «Пожаловаться на спам» завершает текущий диалог и сразу ищет другого собеседника.",
  },
] as const;

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        inLanguage: "ru",
        description: siteDescription,
      },
      {
        "@type": "WebApplication",
        name: siteName,
        url: siteUrl,
        applicationCategory: "SocialNetworkingApplication",
        operatingSystem: "Web",
        inLanguage: "ru",
        description: siteDescription,
        offers: tariffs.map((tariff) => ({
          "@type": "Offer",
          name: `${tariff.name}, ${tariff.term}`,
          price: tariff.price,
          priceCurrency: "RUB",
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

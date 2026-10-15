import { supportEmail } from "@/lib/site";

const supportMail = `mailto:${supportEmail}`;

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-title">Продукт</p>
          <ul>
            <li>
              <a href="/#features">Возможности</a>
            </li>
            <li>
              <a href="/#premium">Тарифы</a>
            </li>
            <li>
              <a href="/#premium">Премиум</a>
            </li>
            <li>
              <a href="/#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Поддержка</p>
          <ul>
            <li>
              <a href={supportMail}>Email</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Правовая информация</p>
          <ul>
            <li>
              <a href="/policy/">Политика конфиденциальности</a>
            </li>
            <li>
              <a href="/terms/">Условия использования</a>
            </li>
            <li>
              <a href={`${supportMail}?subject=${encodeURIComponent("Отмена подписки")}`}>
                Отмена подписки
              </a>
            </li>
            <li>
              <a href={`${supportMail}?subject=${encodeURIComponent("Заявка на возврат")}`}>
                Заявка на возврат
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap copy">
        <p>© 2026 Самозанятый Шинкаренко Владимир Артемович</p>
        <p>ИНН: 781312974811</p>
        <p>Статус: Плательщик налога на профессиональный доход (самозанятый)</p>
      </div>
    </footer>
  );
}

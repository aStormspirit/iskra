import { VkLink } from "@/components/vk-link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <p className="footer-note">Анонимный чат для знакомств и общения во ВКонтакте.</p>
        </div>
        <div>
          <p className="footer-title">Продукт</p>
          <ul>
            <li>
              <a href="#features">Возможности</a>
            </li>
            <li>
              <a href="#how">Как работает</a>
            </li>
            <li>
              <a href="#premium">Премиум</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Поддержка</p>
          <ul>
            <li>
              <VkLink>Написать боту</VkLink>
            </li>
            <li>
              <a href="#about">О сервисе</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Правовая информация</p>
          <ul>
            <li>
              <a href="#privacy">Конфиденциальность</a>
            </li>
            <li>
              <a href="#terms">Условия</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="copy">© 2026 Искра</p>
    </footer>
  );
}

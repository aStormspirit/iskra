import { Icon } from "@/components/icon";
import { siteName } from "@/lib/site";

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label={`${siteName}, на главную`}>
      <span className="logo-mark">
        <Icon name="logo" />
      </span>
      <span className="logo-word">{siteName}</span>
    </a>
  );
}

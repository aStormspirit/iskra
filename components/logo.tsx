import Link from "next/link";
import { Icon } from "@/components/icon";
import { siteName } from "@/lib/site";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label={`${siteName}, на главную`}>
      <span className="logo-mark">
        <Icon name="logo" />
      </span>
      <span className="logo-word">{siteName}</span>
    </Link>
  );
}

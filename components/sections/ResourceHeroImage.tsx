"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
};

type Phase = "pending" | "revealing" | "instant";

// Обложки, которые уже проявлялись в этой вкладке. При возврате на ресурс
// (кнопка «назад», повторный клик в карусели) картинка лежит в кеше браузера,
// и проигрывать анимацию заново незачем: показываем её сразу.
const revealedSources = new Set<string>();

/**
 * Фон hero на /freebies/[slug]: обложка выходит из белого тумана.
 *
 * Пока картинка грузится, hero целиком закрыт белой вуалью (видны только
 * заголовок, описание и кнопка). После загрузки и декодирования вуаль уезжает
 * вниз, открывая обложку сверху вниз. Двигается только transform, поэтому
 * анимация идёт на видеокарте и не дёргается.
 *
 * Компонент монтируется с key={slug}: при переходе между ресурсами старая
 * обложка не висит под новым заголовком, а создаётся новый <img>.
 */
export default function ResourceHeroImage({ src, alt }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [phase, setPhase] = useState<Phase>(() =>
    revealedSources.has(src) ? "instant" : "pending",
  );

  useEffect(() => {
    const img = imgRef.current;
    if (!img || phase !== "pending") return;

    let cancelled = false;

    const reveal = () => {
      if (cancelled) return;
      // decode() гарантирует, что картинка проявится уже раскодированной,
      // без построчной прорисовки под уезжающей вуалью.
      const decoded = typeof img.decode === "function" ? img.decode() : Promise.resolve();
      decoded
        .catch(() => undefined)
        .then(() => {
          if (cancelled) return;
          revealedSources.add(src);
          setPhase("revealing");
        });
    };

    // Картинка могла загрузиться раньше гидрации: onLoad тогда уже не придёт.
    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else {
      img.addEventListener("load", reveal, { once: true });
      // Битая картинка: всё равно убираем вуаль, чтобы hero не остался пустым.
      img.addEventListener("error", reveal, { once: true });
    }

    return () => {
      cancelled = true;
      img.removeEventListener("load", reveal);
      img.removeEventListener("error", reveal);
    };
  }, [phase, src]);

  const stateClass =
    phase === "instant" ? " is-instant" : phase === "revealing" ? " is-revealed" : "";

  return (
    <div className={`section-bg-image-wr is-light${stateClass}`}>
      <img
        ref={imgRef}
        alt={alt}
        className="image-cover resource-hero-img"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        sizes="100vw"
        src={src}
      />
      <div className="section-bg-gradient is-light" />
      <div className="resource-hero-veil" aria-hidden="true" />
      {/* Без JS вуаль никто не уберёт: прячем её сразу. */}
      <noscript>
        <style>{".resource-hero-veil{display:none}"}</style>
      </noscript>
    </div>
  );
}

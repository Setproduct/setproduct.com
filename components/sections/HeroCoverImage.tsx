"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
};

/**
 * Фон hero на /freebies/[slug] и /templates/[slug]: обложка выходит из белого тумана.
 *
 * Пока картинка грузится, hero целиком закрыт белой вуалью (видны только
 * заголовок, описание и кнопка). После загрузки и декодирования вуаль уезжает
 * вниз, открывая обложку сверху вниз. Двигается только transform, поэтому
 * анимация идёт на видеокарте и не дёргается.
 *
 * Компонент монтируется с key={slug}: при переходе между страницами старая
 * обложка не висит под новым заголовком, а создаётся новый <img>.
 *
 * Эффект проигрывается каждый раз при новой навигации, даже если картинка
 * уже лежит в кеше браузера: навечно «показанных» обложек не запоминаем.
 */
export default function HeroCoverImage({ src, alt }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || revealed) return;

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
          setRevealed(true);
        });
    };

    // Картинка могла загрузиться раньше гидрации: onLoad тогда уже не придёт.
    // Это же покрывает повторный визит на обложку из кеша — эффект всё равно сыграет.
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
  }, [revealed, src]);

  return (
    <div
      className={`section-bg-image-wr is-light${revealed ? " is-revealed" : ""}`}
    >
      <img
        ref={imgRef}
        alt={alt}
        className="image-cover hero-cover-img"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        sizes="100vw"
        src={src}
      />
      <div className="section-bg-gradient is-light" />
      <div className="hero-cover-veil" aria-hidden="true" />
      {/* Без JS вуаль никто не уберёт: прячем её сразу. */}
      <noscript>
        <style>{".hero-cover-veil{display:none}"}</style>
      </noscript>
    </div>
  );
}

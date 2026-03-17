'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageZoom.module.css';

const ZOOM = 3;
const POPUP_OFFSET = 20;

export default function ImageZoom({ src, alt, contain = false }) {
  const [isZooming, setIsZooming] = useState(false);
  const [ready, setReady] = useState(false);
  const [cacheBust, setCacheBust] = useState('');
  const containerRef = useRef(null);
  const popupRef = useRef(null);
  const rafId = useRef(null);
  const displayLoaded = useRef(false);
  const bgLoaded = useRef(false);

  // Reset when src changes (navigating between products)
  useEffect(() => {
    setReady(false);
    setIsZooming(false);
    displayLoaded.current = false;
    bgLoaded.current = false;

    // Generate a cache-busting key so the popup always fetches the latest version
    const bust = `?v=${Date.now()}`;
    setCacheBust(bust);

    // Preload the raw image for the popup background
    const preload = new window.Image();
    preload.src = src + bust;
    preload.onload = () => {
      bgLoaded.current = true;
      if (displayLoaded.current) setReady(true);
    };

    return () => { preload.onload = null; };
  }, [src]);

  // Called when next/image finishes loading
  const handleDisplayLoad = useCallback(() => {
    displayLoaded.current = true;
    if (bgLoaded.current) setReady(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const popup = popupRef.current;
      const container = containerRef.current;
      if (!popup || !container) return;

      const img = container.querySelector('img');
      if (!img || !img.naturalWidth) return;

      const rect = container.getBoundingClientRect();
      const popupSize = popup.offsetWidth;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const natAspect = img.naturalWidth / img.naturalHeight;
      let dispW, dispH, offX, offY;

      if (contain) {
        const pad = parseFloat(getComputedStyle(img).padding) || 0;
        const innerW = rect.width - pad * 2;
        const innerH = rect.height - pad * 2;
        if ((innerW / innerH) > natAspect) {
          dispH = innerH; dispW = innerH * natAspect;
        } else {
          dispW = innerW; dispH = innerW / natAspect;
        }
        offX = pad + (innerW - dispW) / 2;
        offY = pad + (innerH - dispH) / 2;
      } else {
        const contAspect = rect.width / rect.height;
        if (contAspect > natAspect) {
          dispW = rect.width; dispH = rect.width / natAspect;
        } else {
          dispH = rect.height; dispW = rect.height * natAspect;
        }
        offX = (rect.width - dispW) / 2;
        offY = (rect.height - dispH) / 2;
      }

      // Hide if cursor is outside the visible image area
      if (x < offX || x > offX + dispW || y < offY || y > offY + dispH) {
        popup.classList.remove(styles.popupVisible);
        return;
      }

      popup.classList.add(styles.popupVisible);

      // Zoomed image dimensions
      const zoomW = dispW * ZOOM;
      const zoomH = dispH * ZOOM;

      // Map cursor position to zoomed background position
      const bgPosX = popupSize / 2 - (x - offX) * ZOOM;
      const bgPosY = popupSize / 2 - (y - offY) * ZOOM;

      // Position popup offset from cursor, flip if near edge
      let popupX = x + POPUP_OFFSET;
      let popupY = y - popupSize / 2;
      if (popupX + popupSize > rect.width) popupX = x - POPUP_OFFSET - popupSize;
      if (popupY < 0) popupY = 0;
      if (popupY + popupSize > rect.height) popupY = rect.height - popupSize;

      popup.style.left = `${popupX}px`;
      popup.style.top = `${popupY}px`;
      popup.style.backgroundSize = `${zoomW}px ${zoomH}px`;
      popup.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
    });
  }, [contain]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${ready ? styles.zoomReady : ''}`}
      onMouseEnter={() => ready && setIsZooming(true)}
      onMouseLeave={() => {
        setIsZooming(false);
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
      }}
      onMouseMove={handleMouseMove}
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 992px) 100vw, 58vw" style={{ objectFit: contain ? 'contain' : 'cover', padding: contain ? '2rem' : '0' }} priority onLoad={handleDisplayLoad} />

      {isZooming && (
        <div
          ref={popupRef}
          className={styles.popup}
          style={{ backgroundImage: `url('${src}${cacheBust}')` }}
        />
      )}
    </div>
  );
}

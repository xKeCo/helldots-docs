'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { CommentOverlay } from 'helldots';

declare global {
  interface Window {
    /** The live overlay, for anyone reading these docs with a console open. */
    helldots?: CommentOverlay;
  }
}

const NAME_KEY = 'helldots-docs:name';
const ID_KEY = 'helldots-docs:anon-id';

/**
 * HellDots identifies nobody — it records whatever the host declares. This
 * site has no accounts, so it mints a per-browser id the way the README
 * suggests: the key, its lifetime and the consent story stay ours.
 */
function readIdentity(): { name: string; id: string } {
  let id = localStorage.getItem(ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(ID_KEY, id);
  }
  return { name: localStorage.getItem(NAME_KEY) ?? 'Guest', id };
}

interface HellDotsContextValue {
  overlay: CommentOverlay | null;
  ready: boolean;
  /** Bumped on every change, so consumers re-read the overlay. */
  revision: number;
  /** Mirrors overlay.commentMode, however it was flipped. */
  commentMode: boolean;
  /** The page's language, so consumers pick the same dictionary. */
  locale: string;
  name: string;
  setName: (name: string) => void;
}

const HellDotsContext = createContext<HellDotsContextValue>({
  overlay: null,
  ready: false,
  revision: 0,
  commentMode: false,
  locale: 'en',
  name: 'Guest',
  setName: () => {},
});

export function useHellDots() {
  return useContext(HellDotsContext);
}

/**
 * Run once the browser has had a chance to paint the new route — anchors are
 * resolved against live layout, so they need the elements to be there.
 *
 * Two frames rather than one: the first lands after React has committed, the
 * second after the browser has laid the commit out. The timeout is not a
 * belt-and-braces duplicate — a hidden tab never paints, so its
 * `requestAnimationFrame` never fires at all, and without this the widget
 * would still be pointing at the previous page when the tab came back.
 */
function onNextPaint(run: () => void): () => void {
  let done = false;
  let inner = 0;

  const fire = () => {
    if (done) return;
    done = true;
    run();
  };

  const outer = requestAnimationFrame(() => {
    inner = requestAnimationFrame(fire);
  });
  const timer = window.setTimeout(fire, 150);

  return () => {
    done = true;
    cancelAnimationFrame(outer);
    cancelAnimationFrame(inner);
    clearTimeout(timer);
  };
}

export function HellDotsProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  /** Rendered language for the widget's own UI — HellDots ships `en` and `es`. */
  locale: string;
}) {
  const [overlay, setOverlay] = useState<CommentOverlay | null>(null);
  const [ready, setReady] = useState(false);
  const [revision, setRevision] = useState(0);
  const [commentMode, setCommentMode] = useState(false);
  const [name, setNameState] = useState('Guest');

  const router = useRouter();
  const pathname = usePathname();

  // The router is read from inside HellDots' own callbacks, which outlive any
  // one render — a ref keeps them pointed at the current one.
  const routerRef = useRef(router);
  routerRef.current = router;

  useEffect(() => {
    let cancelled = false;
    let instance: CommentOverlay | undefined;

    void import('helldots').then(({ createCommentOverlay }) => {
      if (cancelled) return;

      const identity = readIdentity();
      setNameState(identity.name);

      instance = createCommentOverlay({
        user: identity,
        locale,
        persistence: 'localStorage',
        // The docs are one long page of text with a heavy sidebar; narrowing
        // the style enumeration keeps a capture from stalling the scroll.
        fastCapture: true,
        // "View on its page" from the inbox should be a route change, not a
        // full reload — the whole point of an App Router site.
        navigate: (page) => routerRef.current.push(page),
        autoDetectNavigation: true,
        onReady: (o) => {
          if (cancelled) return;
          setOverlay(o);
          setReady(true);
          setRevision((r) => r + 1);
          // Deliberate, and documented on the playground page: these docs are
          // also a console to poke the API from.
          window.helldots = o;
        },
        onChange: () => setRevision((r) => r + 1),
        // The keyboard shortcut never reaches this component, and the mode
        // switches itself off after a comment is saved — so the panel's button
        // has no other way to stay in step with the toolbar.
        onCommentModeChanged: setCommentMode,
        onError: (error, context) => {
          console.warn(`[helldots:${context}]`, error);
        },
      });
    });

    return () => {
      cancelled = true;
      delete window.helldots;
      instance?.cleanup();
      setOverlay(null);
      setReady(false);
      setCommentMode(false);
    };
    // Rebuilt when the language changes: HellDots takes its locale at
    // construction and exposes no setter, and there is nothing to lose —
    // localStorage mode reloads the comments on the way back up.
  }, [locale]);

  // pushState routing does not fire popstate, so the widget is told explicitly
  // once the new route has painted and its elements exist to anchor against.
  useEffect(() => {
    if (!overlay) return;
    return onNextPaint(() => {
      overlay.notifyNavigation();
      setRevision((r) => r + 1);
    });
  }, [overlay, pathname]);

  const setName = useCallback(
    (next: string) => {
      const trimmed = next.trim();
      if (!trimmed) return;
      localStorage.setItem(NAME_KEY, trimmed);
      setNameState(trimmed);
      overlay?.setUser({ name: trimmed, id: readIdentity().id });
    },
    [overlay],
  );

  const value = useMemo<HellDotsContextValue>(
    () => ({ overlay, ready, revision, commentMode, locale, name, setName }),
    [overlay, ready, revision, commentMode, locale, name, setName],
  );

  return <HellDotsContext.Provider value={value}>{children}</HellDotsContext.Provider>;
}

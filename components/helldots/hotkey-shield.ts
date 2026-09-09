/**
 * Stops page-level hotkeys from hijacking keystrokes meant for a text field.
 *
 * The widget renders inside a Shadow DOM, and an event that crosses that
 * boundary is **retargeted**: a listener on `window` sees `<helldots-root>`,
 * not the textarea the character is going into. Every "am I typing?" guard
 * written against `event.target` is therefore blind to it.
 *
 * That is not hypothetical. Three shortcuts misfire mid-sentence:
 *
 * - **`d` and `D`** flip the colour theme. Fumadocs does guard its theme
 *   hotkey, but on `event.target` — so the guard never sees the textarea.
 *   (Its predicate also ignores `shiftKey`, which is why a capital `D` at the
 *   start of a sentence counts too.)
 * - **`Cmd`/`Ctrl`+`K`** opens the search dialog over an unsent comment.
 *   Fumadocs' search has no typing guard at all.
 * - **`Alt`+`C`** is HellDots' own comment-mode shortcut, also unguarded — and
 *   on macOS `Option`+`C` is how you type **ç**, so writing "façade" or
 *   "Provençal" closes the box you are writing in.
 *
 * `composedPath()` is what fixes it: unlike `target`, it reports the real
 * element inside the shadow root. This listener runs in the capture phase, so
 * it sees the event before any of those handlers, and stops only the chords
 * that would steal the keystroke. It never calls `preventDefault()`, so the
 * character is still typed, and it leaves the keys the widget genuinely needs
 * — Escape, Enter, Cmd+Enter — to reach it untouched.
 */

const HOST = 'HELLDOTS-ROOT';

function isEditable(node: EventTarget): boolean {
  if (!(node instanceof HTMLElement)) return false;
  if (node.isContentEditable) return true;

  return node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || node.tagName === 'SELECT';
}

/** Decide whether this keystroke belongs to a text field, and to which one. */
function locate(event: KeyboardEvent) {
  const path = event.composedPath();

  return {
    typing: path.some(isEditable),
    insideWidget: path.some((node) => node instanceof HTMLElement && node.tagName === HOST),
  };
}

export function installHotkeyShield(): () => void {
  const shield = (event: KeyboardEvent) => {
    // An IME candidate window is mid-composition; those keystrokes are not ours
    // to reason about. 229 is the legacy spelling of the same condition.
    if (event.isComposing || event.keyCode === 229) return;

    const { typing, insideWidget } = locate(event);
    if (!typing) return;

    const key = event.key.toLowerCase();
    const bare = !event.metaKey && !event.ctrlKey && !event.altKey;

    const hijacks =
      // Fumadocs' theme toggle. A bare letter must never mean anything but
      // itself while somebody is writing.
      (key === 'd' && bare) ||
      // HellDots' comment-mode shortcut, which is also the ç key on macOS.
      (event.altKey && event.code === 'KeyC') ||
      // Fumadocs' search dialog. A deliberate chord, so it stays available
      // everywhere else on the page — but not on top of an unsent comment.
      (key === 'k' && (event.metaKey || event.ctrlKey) && insideWidget);

    // Propagation only: the character still lands in the field.
    if (hijacks) event.stopImmediatePropagation();
  };

  window.addEventListener('keydown', shield, true);

  return () => window.removeEventListener('keydown', shield, true);
}

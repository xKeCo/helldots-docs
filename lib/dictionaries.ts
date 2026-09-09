import { i18n, type Locale } from './i18n';

/**
 * Strings that live outside MDX — the nav, the landing page, the playground's
 * control panel. The documentation itself is translated as whole files
 * (`captures.es.mdx`), which is the right unit for prose; this is for the
 * chrome around it.
 */
export interface Dictionary {
  /** BCP 47 tag for <html lang> and Intl. */
  htmlLang: string;
  /** The locale HellDots itself is told to render in. */
  widgetLocale: string;
  /** Short enough for a browser tab; the tagline is not. */
  titleSuffix: string;
  tagline: string;
  nav: {
    documentation: string;
    playground: string;
  };
  home: {
    badge: string;
    lede: string;
    readDocs: string;
    playground: string;
    integrationNote: string;
    toggles: string;
    features: Array<{ key: string; title: string; body: string }>;
    closingTitle: string;
    closingBody: string;
    apiReference: string;
  };
  controls: {
    mounted: string;
    mounting: string;
    persistence: string;
    displayName: string;
    save: string;
    enterMode: string;
    exitMode: string;
    exportCsv: string;
    clearAll: string;
    confirmClear: string;
    total: string;
    open: string;
    inProgress: string;
    resolved: string;
    /** Wraps `overlay.getMetrics()`, which stays in English — it is code. */
    footnoteBefore: string;
    footnoteAfter: string;
  };
  demo: {
    eyebrow: string;
    heading: string;
    note: string;
    popular: string;
    perMonth: string;
    plans: Array<{ name: string; price: string; note: string; features: string[]; cta: string }>;
  };
}

const featureKeys = ['anchored', 'capture', 'store', 'triage', 'team', 'unobtrusive'] as const;

const en: Dictionary = {
  htmlLang: 'en',
  widgetLocale: 'en',
  titleSuffix: 'comment overlay for web apps',
  tagline:
    'Drop-in comment overlay for web apps. Click anywhere, leave a comment anchored to that element.',
  nav: {
    documentation: 'Documentation',
    playground: 'Playground',
  },
  home: {
    badge: 'These docs run the library. Try it',
    lede: 'A drop-in comment overlay for web apps. Your team clicks anywhere on a page, leaves a comment anchored to that element, and HellDots captures the context needed to act on it — a screenshot, the browser, the viewport, the DOM path.',
    readDocs: 'Read the docs',
    playground: 'Live playground',
    integrationNote: 'That is the whole integration.',
    toggles: 'toggles comment mode.',
    features: [
      {
        key: 'anchored',
        title: 'Anchored to the element',
        body: 'A selector, a DOM path and a structural fingerprint. When the page changes, the comment re-anchors; when the element is genuinely gone, it is marked orphaned rather than silently dropped.',
      },
      {
        key: 'capture',
        title: 'Screenshot and environment',
        body: 'The page as they saw it, plus URL, viewport, screen, DPR, browser, OS and language. A bug filed at 390×844 on iOS Safari says so, without anyone having to ask.',
      },
      {
        key: 'store',
        title: 'Your data, your store',
        body: 'No backend, no account, no telemetry. Persist to localStorage in one line, or subscribe to the callbacks and keep every comment as plain JSON in your own database.',
      },
      {
        key: 'triage',
        title: 'Triage that survives',
        body: 'Status, type, priority and free-form tags, plus an append-only audit trail of who moved what and when. Resolution time is derived from the log, not stored beside it.',
      },
      {
        key: 'team',
        title: 'Built for more than one',
        body: 'Reactions, replies, a permission predicate, and a meta.origin on every event so applying a change from a socket does not echo straight back to the server.',
      },
      {
        key: 'unobtrusive',
        title: 'Out of the way',
        body: 'Alt+C to arm, click to place, drag to crop. Rendered inside a Shadow DOM, so your CSS cannot leak in and its styles cannot leak out.',
      },
    ],
    closingTitle: 'Nothing is sent anywhere',
    closingBody:
      'There is no HellDots service on the other end. Comments live in the visitor’s browser, or in your own database through ten callbacks and one change stream. MIT licensed, ESM only, types included.',
    apiReference: 'API reference',
  },
  controls: {
    mounted: 'Widget mounted',
    mounting: 'Mounting…',
    persistence: 'persistence:',
    displayName: 'Your display name',
    save: 'Save',
    enterMode: 'Enter comment mode',
    exitMode: 'Exit comment mode',
    exportCsv: 'Export CSV',
    clearAll: 'Clear all',
    confirmClear: 'Delete every comment stored in this browser?',
    total: 'Total',
    open: 'Open',
    inProgress: 'In progress',
    resolved: 'Resolved',
    footnoteBefore: 'These figures come from ',
    footnoteAfter:
      ', re-read on every change the widget emits. Comments live in this browser only — nothing is sent anywhere.',
  },
  demo: {
    eyebrow: 'Demo surface',
    heading: 'Pick a plan',
    note: 'Not a real product — a page to leave comments on. Try dragging a box around the Pro price.',
    popular: 'Popular',
    perMonth: '/mo',
    plans: [
      {
        name: 'Starter',
        price: '$0',
        note: 'For one person poking at an idea.',
        features: ['1 project', 'Local comments', 'Community support'],
        cta: 'Start free',
      },
      {
        name: 'Pro',
        price: '$12',
        note: 'For a team that reviews together.',
        features: ['Unlimited projects', 'Shared inbox', 'CSV & PDF export', 'Priority support'],
        cta: 'Upgrade to Pro',
      },
      {
        name: 'Team',
        price: '$29',
        note: 'For everyone who touches the product.',
        features: ['SSO', 'Audit trail retention', 'Roles & permissions'],
        cta: 'Talk to us',
      },
    ],
  },
};

const es: Dictionary = {
  htmlLang: 'es',
  widgetLocale: 'es',
  titleSuffix: 'capa de comentarios para aplicaciones web',
  tagline:
    'Capa de comentarios lista para usar en aplicaciones web. Haz clic donde sea y deja un comentario anclado a ese elemento.',
  nav: {
    documentation: 'Documentación',
    playground: 'Playground',
  },
  home: {
    badge: 'Esta documentación usa la librería. Pruébala',
    lede: 'Una capa de comentarios lista para usar en aplicaciones web. Tu equipo hace clic en cualquier punto de la página, deja un comentario anclado a ese elemento, y HellDots captura el contexto necesario para actuar sobre él: una captura de pantalla, el navegador, el viewport, la ruta del DOM.',
    readDocs: 'Leer la documentación',
    playground: 'Playground en vivo',
    integrationNote: 'Esa es toda la integración.',
    toggles: 'activa el modo comentario.',
    features: [
      {
        key: 'anchored',
        title: 'Anclado al elemento',
        body: 'Un selector, una ruta del DOM y una huella estructural. Si la página cambia, el comentario se vuelve a anclar; si el elemento desaparece de verdad, se marca como huérfano en lugar de descartarse en silencio.',
      },
      {
        key: 'capture',
        title: 'Captura y entorno',
        body: 'La página tal como la vieron, más URL, viewport, pantalla, DPR, navegador, sistema operativo e idioma. Un bug reportado a 390×844 en iOS Safari lo dice solo, sin que nadie tenga que preguntarlo.',
      },
      {
        key: 'store',
        title: 'Tus datos, tu almacén',
        body: 'Sin backend, sin cuenta, sin telemetría. Persiste en localStorage con una línea, o suscríbete a los callbacks y guarda cada comentario como JSON plano en tu propia base de datos.',
      },
      {
        key: 'triage',
        title: 'Triaje que perdura',
        body: 'Estado, tipo, prioridad y etiquetas libres, más un registro de auditoría de solo anexado con quién movió qué y cuándo. El tiempo de resolución se deriva del registro, no se guarda aparte.',
      },
      {
        key: 'team',
        title: 'Pensado para más de una persona',
        body: 'Reacciones, respuestas, un predicado de permisos y un meta.origin en cada evento, para que aplicar un cambio recibido por socket no lo devuelva de inmediato al servidor.',
      },
      {
        key: 'unobtrusive',
        title: 'Sin estorbar',
        body: 'Alt+C para armar, clic para colocar, arrastrar para recortar. Se renderiza dentro de un Shadow DOM, así que tu CSS no se filtra hacia dentro ni sus estilos hacia fuera.',
      },
    ],
    closingTitle: 'No se envía nada a ninguna parte',
    closingBody:
      'No hay ningún servicio de HellDots al otro lado. Los comentarios viven en el navegador de quien visita, o en tu propia base de datos a través de diez callbacks y un flujo de cambios. Licencia MIT, solo ESM, tipos incluidos.',
    apiReference: 'Referencia de la API',
  },
  controls: {
    mounted: 'Widget montado',
    mounting: 'Montando…',
    persistence: 'persistencia:',
    displayName: 'Tu nombre visible',
    save: 'Guardar',
    enterMode: 'Activar modo comentario',
    exitMode: 'Salir del modo comentario',
    exportCsv: 'Exportar CSV',
    clearAll: 'Borrar todo',
    confirmClear: '¿Borrar todos los comentarios guardados en este navegador?',
    total: 'Total',
    open: 'Abiertos',
    inProgress: 'En curso',
    resolved: 'Resueltos',
    footnoteBefore: 'Estas cifras vienen de ',
    footnoteAfter:
      ', releídas en cada cambio que emite el widget. Los comentarios viven solo en este navegador — no se envía nada a ninguna parte.',
  },
  demo: {
    eyebrow: 'Superficie de prueba',
    heading: 'Elige un plan',
    note: 'No es un producto real — es una página sobre la que dejar comentarios. Prueba a arrastrar un recuadro alrededor del precio de Pro.',
    popular: 'Popular',
    perMonth: '/mes',
    plans: [
      {
        name: 'Starter',
        price: '0 $',
        note: 'Para una sola persona dándole vueltas a una idea.',
        features: ['1 proyecto', 'Comentarios locales', 'Soporte de la comunidad'],
        cta: 'Empezar gratis',
      },
      {
        name: 'Pro',
        price: '12 $',
        note: 'Para un equipo que revisa en conjunto.',
        features: [
          'Proyectos ilimitados',
          'Bandeja compartida',
          'Exportar a CSV y PDF',
          'Soporte prioritario',
        ],
        cta: 'Pasar a Pro',
      },
      {
        name: 'Team',
        price: '29 $',
        note: 'Para todo el mundo que toca el producto.',
        features: ['SSO', 'Retención del registro de auditoría', 'Roles y permisos'],
        cta: 'Hablemos',
      },
    ],
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, es };

/** An unknown code degrades to the default language rather than throwing. */
export function getDictionary(locale: string | undefined): Dictionary {
  return dictionaries[(locale ?? i18n.defaultLanguage) as Locale] ?? dictionaries.en;
}

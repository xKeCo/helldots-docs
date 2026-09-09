import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { uiTranslations } from 'fumadocs-ui/i18n';
import { appName, links } from './shared';
import { i18n } from './i18n';
import { getDictionary } from './dictionaries';
import { localizePath } from './i18n';
import { HellDotsMark } from '@/components/brand';

/**
 * Fumadocs' own chrome — the search dialog, the table of contents, the theme
 * switcher. English is the built-in default, so only Spanish needs writing out.
 */
export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: { displayName: 'English' },
    es: {
      displayName: 'Español',
      'Ask AI(AI chat button)': 'Preguntar a la IA',
      'Back to Home(404 not found page)': 'Volver al inicio',
      'Choose a language(language switcher)': 'Elige un idioma',
      'Choose a language(language switcher)(aria-label)': 'Elige un idioma',
      'Close Banner(banner)(aria-label)': 'Cerrar el aviso',
      'Close Search(search dialog)(aria-label)': 'Cerrar la búsqueda',
      'Close Sidebar(aria-label)': 'Cerrar la barra lateral',
      'Close Sidebar(sidebar)(aria-label)': 'Cerrar la barra lateral',
      'Collapse Sidebar(sidebar)(aria-label)': 'Contraer la barra lateral',
      'Copied Text(code block)(aria-label)': 'Texto copiado',
      'Copy Anchor Link(heading anchor)(aria-label)': 'Copiar el enlace a esta sección',
      'Copy Link(accordion)(aria-label)': 'Copiar el enlace',
      'Copy Markdown(page actions)': 'Copiar el Markdown',
      'Copy Text(code block)(aria-label)': 'Copiar el texto',
      'Dark(theme switcher)(aria-label)': 'Oscuro',
      'Default(type table)': 'Por defecto',
      'Edit on GitHub(edit page)': 'Editar en GitHub',
      'Hide Sidebar(sidebar)': 'Ocultar la barra lateral',
      'Last updated on(page footer)': 'Última actualización el',
      'Layout Tab(layout tab trigger)': 'Sección',
      'Light(theme switcher)(aria-label)': 'Claro',
      'Next Page(pagination)': 'Siguiente',
      'No Headings(table of contents)': 'Sin encabezados',
      'No results found(search dialog)': 'Sin resultados',
      'On this page(table of contents)': 'En esta página',
      'Open Search(search trigger)(aria-label)': 'Abrir la búsqueda',
      'Open Sidebar(aria-label)': 'Abrir la barra lateral',
      'Open Sidebar(sidebar)(aria-label)': 'Abrir la barra lateral',
      'Open in ChatGPT(page actions)': 'Abrir en ChatGPT',
      'Open in Claude(page actions)': 'Abrir en Claude',
      'Open in Cursor(page actions)': 'Abrir en Cursor',
      'Open in GitHub(page actions)': 'Abrir en GitHub',
      'Open in Scira AI(page actions)': 'Abrir en Scira AI',
      'Open(page actions)': 'Abrir',
      'Page Not Found(404 not found page)': 'Página no encontrada',
      'Parameters(type table)': 'Parámetros',
      'Previous Page(pagination)': 'Anterior',
      'Prop(type table)': 'Propiedad',
      'Read {url}, I want to ask questions about it.(page actions)':
        'Lee {url}, quiero hacerte preguntas sobre esa página.',
      'Returns(type table)': 'Devuelve',
      'Search(search dialog)': 'Buscar',
      'Search(search trigger)': 'Buscar',
      'Show Sidebar(sidebar)': 'Mostrar la barra lateral',
      'System(theme switcher)(aria-label)': 'Sistema',
      'Table of Contents(inline table of contents)': 'Contenido',
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 not found page)':
        'La página que buscas puede haberse eliminado, haber cambiado de nombre o no estar disponible por ahora.',
      'Toggle Menu(home layout header)(aria-label)': 'Abrir o cerrar el menú',
      'Toggle Theme(theme switcher)(aria-label)': 'Cambiar el tema',
      'Type(type table)': 'Tipo',
      'View as Markdown(page actions)': 'Ver como Markdown',
    },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  const dict = getDictionary(locale);

  return {
    // Renders the language switcher in the nav.
    i18n: true,
    nav: {
      url: localizePath(locale, '/'),
      title: (
        <span className="inline-flex items-center gap-2 font-semibold">
          <HellDotsMark className="size-5" />
          {appName}
        </span>
      ),
    },
    githubUrl: links.github,
    links: [
      {
        text: dict.nav.documentation,
        url: localizePath(locale, '/docs'),
        active: 'nested-url',
      },
      {
        text: dict.nav.playground,
        url: localizePath(locale, '/docs/playground'),
        active: 'url',
      },
      {
        text: 'npm',
        url: links.npm,
        external: true,
      },
    ],
  };
}

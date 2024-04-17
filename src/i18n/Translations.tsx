/* eslint-disable eslint-comments/no-use */
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import { translations } from '@/i18n'

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    fallbackLng: 'pl',
    lng: 'pl',
    resources: {
      en: { translation: translations.en },
      pl: { translation: translations.pl },
    },
  })

interface Props {
  children: React.ReactNode
}

const Translations = ({ children }: Props) => (
  <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
)

export default Translations

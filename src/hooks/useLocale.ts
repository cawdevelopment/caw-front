import { useTranslation } from 'react-i18next';

const LANGS = [
    {
        label: 'English',
        value: 'en',
        icon: '/icons/ic_flag_en.svg',
    },
    {
        label: 'Español',
        value: 'es',
        icon: '/icons/ic_flag_es.svg',
    },
    {
        label: 'Polski',
        value: 'pl',
        icon: '/icons/ic_flag_pl.svg',
    },
    // {
    //     label: 'Deutsch',
    //     value: 'de',
    //     icon: '/icons/ic_flag_de.svg',
    // },
];

export default function useLocales() {

    const { i18n, t } = useTranslation();
    const langStorage = (typeof window !== 'undefined') ? localStorage.getItem('i18nextLng') : 'en';
    const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[ 0 ];

    const handleChangeLanguage = (newlang: string) => {
        i18n.changeLanguage(newlang);
    };

    return {
        onChangeLang: handleChangeLanguage,
        t,
        currentLang,
        allLang: LANGS,
    };
}

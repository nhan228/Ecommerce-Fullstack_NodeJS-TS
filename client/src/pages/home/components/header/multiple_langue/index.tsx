import React, { useState, ChangeEvent } from "react";
import { useTranslation } from 'react-i18next';

const MultiLanguage: React.FC = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState('vi-VI');

    const handleLangChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        const lang = evt.target.value;
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <>
            <img src={language == "vi-VI" ? "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" : "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"} style={{ width: '20px', marginRight:'2px' }} alt="Flag" />
            <select onChange={(e) => { handleLangChange(e) }} id="language" defaultValue={language} style={{ width: '50px', height:'13.3px',borderRadius: '5px', outline:'none', fontSize:'10px', fontWeight:'600' }}>
                <option value="vi-VI">VI
                </option>
                <option value="en-EN">EN
                </option>
            </select>
        </>

    );
};

export default MultiLanguage

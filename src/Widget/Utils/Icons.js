import React from 'react';
import { ReactComponent as Phone } from '../Assets/Phone.svg';
import { ReactComponent as SMS } from '../Assets/Sms.svg';
import { ReactComponent as Email } from '../Assets/Email.svg';
import { ReactComponent as WhatsApp } from '../Assets/WhatsApp.svg';
import { ReactComponent as Messenger } from '../Assets/Messenger.svg';
import { ReactComponent as Telegram } from '../Assets/Telegram.svg';
import { ReactComponent as More } from '../Assets/More.svg';

export function getIconByType(type) {
    type = (type || '').toLowerCase();

    switch (type) {
        case 'call': {
            return <Phone/>;
        }
        case 'sms': {
            return <SMS/>;
        }
        case 'email': {
            return <Email/>;
        }
        case 'whatsapp': {
            return <WhatsApp/>;
        }
        case 'messenger': {
            return <Messenger/>;
        }
        case 'telegram': {
            return <Telegram/>;
        }
        case 'more': {
            return <More/>;
        }
        default: {
            return null;
        }
    }
}
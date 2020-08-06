import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
import './styles.css';

export interface Class {
    id: number;
    avatar: string;
    bio: string
    first_name: string;
    last_name: string;
    price: number;
    subject: string;
    whatsapp: string;
    user_id: number;
}

interface ClassItemProps {
    classItem: Class;
}

const ClassItem: React.FC<ClassItemProps> = ({ classItem }) => {
    function createNewConnection() {
        api.post('connections', { user_id: classItem.user_id });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={classItem.avatar} alt={classItem.first_name.concat(' ', classItem.last_name)}/>
                <div>
                    <strong>{classItem.first_name.concat(' ', classItem.last_name)}</strong>
                    <span>{classItem.subject}</span>
                </div>
            </header>

            <p>{classItem.bio}</p>

            <footer>
                <p>
                    Price/Hour
                    <strong>U$ {classItem.price}</strong>
                </p>
                <a 
                    href={`https://wa.me/${classItem.whatsapp}`} 
                    rel="noopener noreferrer" 
                    target="_blank"
                    onClick={createNewConnection}
                >
                    <img src={whatsAppIcon} alt="WhatsApp"/>Get in touch
                </a>
            </footer>
        </article>
    );
}

export default ClassItem;
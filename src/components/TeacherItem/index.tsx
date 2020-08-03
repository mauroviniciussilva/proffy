import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/49000408?s=460&u=99755dc0feb311bd5b238229d90609fd37be2af9&v=4" alt="Mauro Oliveira"/>
                <div>
                    <strong>Mauro Oliveira</strong>
                    <span>Sociology</span>
                </div>
            </header>
            <p>
                Sociology teacher for all levels of education
                <br /><br />
                Classes are focused on the specific needs of students, taking the student to knowledge, indicating ways and instruments for everyone to develop their cognitive skills and critical thinking autonomously.
            </p>
            <footer>
                <p>
                    Price/Hour
                    <strong>U$ 30</strong>
                </p>
                <button type="button">
                    <img src={whatsAppIcon} alt="WhatsApp"/>
                    Get in touch
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;
import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/Textarea';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api';
import './styles.css';

function TeacherFrom() {
    const history = useHistory();

    const [ avatar, setAvatar ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ first_name, setFirstName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ scheduleItems, setScheduleItems ] = useState([ { week_day: 0, from: '', to: '' } ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    };

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('users', {
            type: 'Teacher',
            first_name,
            last_name, 
            avatar,
            whatsapp,
            bio,
        }).then(response => {
            const { user_id } = response.data;
            api.post('classes', {
                user_id,
                subject,
                price: Number(price),
                schedule: scheduleItems
            }).then(() => {
                alert('Successful registration');
                history.push('/');
            }).catch(() => {
                alert('Error when registering');
            });
        }).catch(() => {
            alert('Error when registering');
        });

        console.log({
            first_name,
            last_name,
            avatar,
            whatsapp,
            bio,
            subject,
            price,
            scheduleItems
        });
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedSheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            } else return scheduleItem;
        });

        setScheduleItems(updatedSheduleItems)
    }

    return (
        <div id="page-teacher-form" className="container">
        <PageHeader 
            title="How amazing that you want to teach!"
            description="The first step is to fill out this registration form"    
        />
        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Personal Data</legend>
                    <Input 
                        name="first_name"
                        label="First Name"
                        type="text"
                        value={first_name}
                        onChange={(e) => { setFirstName(e.target.value) }}
                    />
                    <Input
                        name="last_name"
                        label="Last Name"
                        type="text"
                        value={last_name}
                        onChange={(e) => { setLastName(e.target.value) }}
                    />
                    <Input
                        name="avatar"
                        label="Avatar"
                        type="text"
                        value={avatar}
                        onChange={(e) => { setAvatar(e.target.value) }}
                    />
                    <Input
                        name="whatsapp"
                        label="WhatsApp"
                        type="text"
                        value={whatsapp}
                        onChange={(e) => { setWhatsapp(e.target.value) }}
                    />
                    <TextArea
                        name="bio"
                        label="Bio"
                        value={bio}
                        onChange={(e) => { setBio(e.target.value) }}
                    />
                </fieldset>
                <fieldset>
                    <legend>About the Class</legend>
                    <Select 
                        name="subject"
                        label="Subject"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Art', label: 'Art' },
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Biology', label: 'Biology' },
                            { value: 'Business Studies', label: 'Business Studies' },
                            { value: 'Chemistry', label: 'Chemistry' },
                            { value: 'Citizenship', label: 'Citizenship' },
                            { value: 'English', label: 'English' },
                            { value: 'Geography', label: 'Geography' },
                            { value: 'Geometry', label: 'Geometry' },
                            { value: 'Grammar', label: 'Grammar' },
                            { value: 'Handwriting', label: 'Handwriting' },
                            { value: 'Home Economics', label: 'Home Economics' },
                            { value: 'Literature', label: 'Literature' },
                            { value: 'Mathematics', label: 'Mathematics' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Physical Education', label: 'Physical Education' },
                            { value: 'Physics', label: 'Physics' },
                            { value: 'Science', label: 'Science' },
                            { value: 'Sociology', label: 'Sociology' },
                            { value: 'Speech', label: 'Speech' }
                        ]}
                    /> 
                    <Input
                        name="price"
                        label="Price per Hour"
                        type="text"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                </fieldset>
                <fieldset>
                    <legend>
                        Available schedules
                        <button type="button" onClick={addNewScheduleItem}>+ New schedule</button>
                    </legend>
                {
                    scheduleItems.map((scheduleItem, index) => {
                        return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                    name="week_day"
                                    label="Week Day"
                                    value={scheduleItem.week_day}
                                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                    options={[
                                        { value: '0', label: 'Sunday' },
                                        { value: '1', label: 'Monday' },
                                        { value: '2', label: 'Tuesday' },
                                        { value: '3', label: 'Wednesday' },
                                        { value: '4', label: 'Thursday' },
                                        { value: '5', label: 'Friday' },
                                        { value: '6', label: 'Saturday' },
                                    ]}
                                />
                                <Input 
                                    name="from" 
                                    label="From" 
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                />
                                <Input 
                                    name="to" 
                                    label="To" 
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                />
                            </div>
                        );
                    })
                }
                </fieldset>
                <footer>
                    <p>
                        <img src={warningIcon} alt="Important warning"/>
                        Important! <br />
                        Fill all the blanks
                    </p>
                    <button type="submit">Save registration</button>
                </footer>
            </form>
        </main>
    </div>
    );
}

export default TeacherFrom;
import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import ClassItem, { Class } from '../../components/ClassItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';
import './styles.css';

function ClassList() {
    const [ classItems, setClassItem ] = useState([]);
    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');

    function searchClasses(e: FormEvent) {
        e.preventDefault();

        api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        }).then(response => {
            setClassItem(response.data);
        }).catch(() => console.log('Error trying to get data'))
    }

    return (
        <div id="page-class-list" className="container">
            <PageHeader title="These are the available proffys">
                <form id="search-classes" onSubmit={searchClasses}>
                    <Select 
                        name="subject"
                        label="Subject"
                        value={subject}
                        onChange={e => { setSubject(e.target.value) }}
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
                    <Select 
                        name="week_day"
                        label="Week Day"
                        value={week_day}
                        onChange={e => { setWeekDay(e.target.value) }}
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
                        name="time" 
                        label="Time" 
                        type="time"
                        value={time}
                        onChange={e => { setTime(e.target.value) }}
                    />
                    <button type="submit" name="search">Search</button>
                </form>
            </PageHeader>
            <main>
                {
                    classItems.map((classItem: Class) => {
                        return <ClassItem key={classItem.id} classItem={classItem}/>
                    })
                }
            </main>
        </div>
    );
}

export default ClassList;
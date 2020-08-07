import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import ClassList from './pages/ClassList'
import TeacherFrom from './pages/TeacherForm';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" component={ClassList} />
            <Route path="/give-classes" component={TeacherFrom} />
        </BrowserRouter>
    );
}

export default Routes;
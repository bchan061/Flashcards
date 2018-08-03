import React from 'react';
import CardList from './components/CardList'
import TestData from './test/testData'
import './style/App.css'

class App extends React.Component {
    render() {
        return (
            <CardList data={TestData} />
        )
    }
}

export default App;

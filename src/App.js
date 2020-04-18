import React from 'react';
import Layout from './hoc/Layout/Layout';
import Mymo from './containers/Mymo';
import YearStat from './containers/YearStat/YearStat';
import { Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Layout>
            
            <Switch>
                <Route path="/" exact component={Mymo} />
                <Route path="/yearstat" component={YearStat} />
            </Switch>
        </Layout>
    );
}

export default App;

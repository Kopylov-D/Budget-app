import React from 'react';
import Layout from './hoc/Layout/Layout';
import Expenses from './containers/Expenses/Expenses';
import YearStat from './containers/YearStat/YearStat';
import { Switch, Route } from 'react-router-dom';
import Income from './containers/Income/Income';
import Invest from './containers/Invest/Invest';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Expenses} />
                <Route path="/income" component={Income} />
                <Route path="/invest" component={Invest} />
                <Route path="/yearstat" component={YearStat} />
            </Switch>
        </Layout>
    );
}

export default App;

const { useState } = React;

function ForeignAidViz() {
    const [data] = useState([
        { country: 'Israel', totalAid: 3800000000, population: 9814000 },
        { country: 'Egypt', totalAid: 1430000000, population: 106156000 },
        { country: 'Jordan', totalAid: 1520000000, population: 11337000 },
        { country: 'Ukraine', totalAid: 13600000000, population: 36744000 },
        { country: 'Afghanistan', totalAid: 260000000, population: 42239000 },
        { country: 'Ethiopia', totalAid: 960000000, population: 126527000 },
        { country: 'South Sudan', totalAid: 520000000, population: 11088000 },
        { country: 'Syria', totalAid: 835000000, population: 23227000 },
        { country: 'Yemen', totalAid: 975000000, population: 34449000 },
        { country: 'Iraq', totalAid: 440000000, population: 45504000 }
    ]);

    const [sortOrder, setSortOrder] = useState('desc');

    const processedData = data.map(item => ({
        ...item,
        perCapita: item.totalAid / item.population
    })).sort((a, b) => 
        sortOrder === 'desc' ? b.perCapita - a.perCapita : a.perCapita - b.perCapita
    );

    return React.createElement('div', { className: 'card' },
        React.createElement('h1', null, 'US Foreign Aid Per Capita by Country'),
        React.createElement('table', null,
            React.createElement('thead', null,
                React.createElement('tr', null,
                    React.createElement('th', null, 'Country'),
                    React.createElement('th', null, 'Total Aid (USD)'),
                    React.createElement('th', null, 'Population'),
                    React.createElement('th', { 
                        onClick: () => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc'),
                        style: { cursor: 'pointer' }
                    }, 'Per Capita Aid (USD)')
                )
            ),
            React.createElement('tbody', null,
                processedData.map(item => 
                    React.createElement('tr', { key: item.country },
                        React.createElement('td', null, item.country),
                        React.createElement('td', null, `$${item.totalAid.toLocaleString()}`),
                        React.createElement('td', null, item.population.toLocaleString()),
                        React.createElement('td', null, `$${item.perCapita.toFixed(2)}`)
                    )
                )
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ForeignAidViz));
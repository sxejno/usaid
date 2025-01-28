// app.js
console.log('Script loading...');

const { useState } = React;

function ForeignAidViz() {
    console.log('ForeignAidViz component initializing');
    
    const [data] = useState([
        { country: 'Israel', totalAid: 3800000000, population: 9300000 },
        { country: 'Egypt', totalAid: 1430000000, population: 104000000 },
        { country: 'Jordan', totalAid: 1520000000, population: 10200000 },
        { country: 'Ukraine', totalAid: 13600000000, population: 44000000 },
        { country: 'Afghanistan', totalAid: 260000000, population: 38000000 },
        { country: 'Ethiopia', totalAid: 960000000, population: 117000000 },
        { country: 'South Sudan', totalAid: 520000000, population: 11200000 },
        { country: 'Syria', totalAid: 835000000, population: 17500000 },
        { country: 'Yemen', totalAid: 975000000, population: 30500000 },
        { country: 'Iraq', totalAid: 440000000, population: 40500000 }
    ]);

    const [sortOrder, setSortOrder] = useState('desc');

    const processedData = data.map(item => ({
        ...item,
        perCapita: item.totalAid / item.population
    })).sort((a, b) => 
        sortOrder === 'desc' ? b.perCapita - a.perCapita : a.perCapita - b.perCapita
    );

    return React.createElement('div', { className: 'card' },
        React.createElement('h1', { className: 'text-2xl mb-4' }, 'US Foreign Aid Per Capita by Country'),
        React.createElement('table', null,
            React.createElement('thead', null,
                React.createElement('tr', null,
                    React.createElement('th', null, 'Country'),
                    React.createElement('th', { style: { textAlign: 'right' } }, 'Total Aid (USD)'),
                    React.createElement('th', { style: { textAlign: 'right' } }, 'Population'),
                    React.createElement('th', { 
                        style: { textAlign: 'right', cursor: 'pointer' },
                        onClick: () => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')
                    }, 'Per Capita Aid (USD)')
                )
            ),
            React.createElement('tbody', null,
                processedData.map(item => 
                    React.createElement('tr', { key: item.country },
                        React.createElement('td', null, item.country),
                        React.createElement('td', { style: { textAlign: 'right' } }, 
                            `$${item.totalAid.toLocaleString()}`
                        ),
                        React.createElement('td', { style: { textAlign: 'right' } }, 
                            item.population.toLocaleString()
                        ),
                        React.createElement('td', { style: { textAlign: 'right' } }, 
                            `$${item.perCapita.toFixed(2)}`
                        )
                    )
                )
            )
        )
    );
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, attempting to render...');
    try {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(ForeignAidViz));
        console.log('Render complete');
    } catch (error) {
        console.error('Error rendering application:', error);
        document.getElementById('root').innerHTML = 'Error loading visualization. Please check console for details.';
    }
});
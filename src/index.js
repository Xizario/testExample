import React, { Component } from 'react';
import { render } from 'react-dom';

import { withState } from './with-state.js';
import { GridColumn, Grid } from '@progress/kendo-react-grid';
import products from './products.json';

const StatefullGrid = withState(Grid);


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <StatefullGrid data={products} style={{ maxHeight: '400px' }}>
          <GridColumn field="ProductID" title="Product Id" filter="numeric" />
          <GridColumn field="ProductName" title="Product Name" />
          <GridColumn field="UnitsInStock" title="Units In Stock" filter="numeric" />
        </StatefullGrid>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

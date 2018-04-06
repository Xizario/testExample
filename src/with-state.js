import React from 'react';

import { process } from '@progress/kendo-data-query';
import { GridToolbar } from '@progress/kendo-react-grid';

export function withState(WrappedGrid) {
    return class StatefullGrid extends React.Component {
        constructor(props) {
            super(props);
            this.state = this.createState({ skip: 0, take: 10 });
            this.dataStateChange = this.dataStateChange.bind(this);
            this.back = this.back.bind(this);
            this.forward = this.forward.bind(this);
        }

        createState(dataState) {
            return {
                dataState: dataState,
                history: { ...this.state, future: {} },
                future: {}
            };
        }

        dataStateChange(event) {
            this.setState(this.createState(event.data));
        }

        back() {
            this.setState({
                ...this.state.history,
                future: { ...this.state, history: {} }
            });
        }

        forward() {
            this.setState({
                ...this.state.future,
                history: { ...this.state, future: {} }
            });
        }

        render() {
            const result = process(this.props.data, this.state.dataState);
            const g = (
              <WrappedGrid
                        filterable={true}
                        sortable={true}
                        pageable={{ pageSizes: true }}

                        {...this.props}

                        total={result.total}
                        data={result.data}
                        skip={this.state.dataState.skip}
                        pageSize={this.state.dataState.take}
                        filter={this.state.dataState.filter}
                        sort={this.state.dataState.sort}

                        dataStateChange={this.dataStateChange}
                    >
                        {this.props.children}
                        <GridToolbar>
                            <button
                                title="Back"
                                className="k-button k-primary"
                                onClick={this.back}
                                disabled={this.state.history.dataState === undefined}
                            > Back </button>
                            <button
                                title="Forward"
                                className="k-button k-primary"
                                onClick={this.forward}
                                disabled={this.state.future.dataState === undefined}
                            > Forward </button>

                        </GridToolbar>
                    </WrappedGrid>
            );
            return (
                <div>
                    {g}
                    {g}
                </div>
            );
        }
    };
}

import React from 'react';

export class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    componentDidMount() {
        this.setState({
            count: 1,
            xss: `<p>componentDidMount</p>`,
        });
    }
    render() {
        console.log('render', this.state.count);
        return <button>{this.state.count}</button>
    }
}
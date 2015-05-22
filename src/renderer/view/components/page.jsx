import React from 'react';

export default class SplitViewButton extends React.Component {

    render() { 
        return (
            <div className="win-page" >{this.props.children}</div>
        );
    }
}

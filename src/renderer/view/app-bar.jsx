import React from 'react';
import {NavBarCommand, SplitView} from 'react-winjs';
import {AppBarTop, SplitViewButton} from './components';
import {RouteHandler} from 'react-router';

export default class AppBar extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            route: null,
            title: ""
        };    
        this.props = {
            options: []
        }
    }
    

    handleTogglePane () {
        let splitView = this.refs.splitView.winControl;
        splitView.paneHidden = !splitView.paneHidden;
    }

    handleChangeRoute (option) {
        this.setState({ route: option.route, title: option.label });
        this.refs.splitView.winControl.paneHidden = true;
        if(this.props.onNavigate) this.props.onNavigate(option.route, option);
    }
        
    render() {

        let options = this.props.options.map((option) => {
            return  <NavBarCommand
                        label={option.label}
                        icon={option.icon}
                        onClick={this.handleChangeRoute.bind(this, option)} />
        });

        let paneComponent = (
            <div>
                <div>
                    <SplitViewButton onClick={() => this.handleTogglePane() } />
                </div>
               
               {options}

            </div>
        );
  
        var title = this.state.title;

        if(!title && this.props.options.length){
            title = this.props.options[0].label;
        }


        let contentComponent = (
            <div>
                <AppBarTop title={title} />
                 {this.props.children}
            </div>
            
        );

        var style = {
            height: "100%"            
        };



        return (
            <SplitView
                ref="splitView"
                style={style}
                paneComponent={paneComponent}
                contentComponent={contentComponent} />
        );
    }
}
/**
 * This class controls the add section the products section.
 */

import React, {Component} from 'react';
import {Tab, Grid, Button, Divider, Dimmer, Loader, Label,Icon} from 'semantic-ui-react';

import adminUserStore from '../../AdminStores/AdminUserStore';
import {serverScripts} from '../../../shared/urls';

/**
 *   Sets up the grid system for positioning components.
 *   This class allows the user to select their task and then a form is generated.
 */
export default class AddPane extends Component{
//
    constructor() {
        super();
        this.state = {
            activeComp:null,
            user: adminUserStore.getUser()
        };
    }


    //Handles the button clicks for add category or add product. sets the active component based on the users click
    handleClick(e,{name}){

        switch(name){
            case "cat":
                this.setState({activeComp :<Cat session={this.state.user.serverSession}/>});
                break;
            case "prod":
                this.setState({activeComp :<Prod session={this.state.user.serverSession}/>});
                break;
            default: this.setState({activeComp :null});
        }
    }


    render(){
        return(
            <Tab.Pane>
                <Grid columns={'equal'}>
                    <Grid.Row columns={'16'} >
                        <Grid.Column width={'8'}>
                            <Button color={'red'} style={{margin:10}} name="cat" onClick={this.handleClick.bind(this)}>Add Category</Button>
                            <Button color={'red'} style={{margin:10}} name="prod" onClick={this.handleClick.bind(this)}>Add Product</Button>
                        </Grid.Column>
                    </Grid.Row>
                    {this.state.activeComp}

                </Grid>
            </Tab.Pane>

        );
    }

}

/**
 * Component must be made with a parent tag of Grid.Row. the child components will then be rendered in that row.
 * Component must be registered in the handleClick in add pane.
 */
class Cat extends Component{

    constructor(){
        super();
        this.state = {
            loading: true,
            currentCats: null,
            categoryInput: '',
            insertMessage: null,
        };
    }

    componentWillMount(){
        this.getCategories();
    }

    getCategories(){
        this.setState({loading:true});
        fetch(serverScripts+"admin/Controllers/productsController.php", {
            method: 'POST',
            headers:{"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_CATEGORIES",
                sessionId :this.props.session
            }),
            mode: 'cors'
        }).then((response)=>response.json()).then((data)=> {
            this.setState({currentCats: data});
            this.setState({loading:false});
        }).catch((err)=>{
            console.error(err);
        });
    }

    componentDidMount(){

    }

    removeCat(id){
        this.setState({loading:true});
        fetch(serverScripts+"admin/Controllers/productsController.php", {
            method: 'POST',
            headers:{"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "DELETE_CATEGORY",
                categoryId: id,
                sessionId :this.props.session
            }),
            mode: 'cors'
        }).then((response)=>response.json()).then((data)=> {
            this.setState({insertMessage: data});
            if(data.success){
                let tmpArr  = this.state.currentCats;
                for(let i=0;i<tmpArr.length;i++){
                    if(tmpArr[i].id===id){
                        tmpArr.splice(i,1);
                        this.setState({currentCats: tmpArr});
                        break;
                    }
                }

            }
            this.setState({loading:false});
        }).catch((err)=>{
            console.error(err);
            this.setState({loading:false});
        });
    }

    handleCatInput(e) {
        this.setState({categoryInput: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({loading:true});
        fetch(serverScripts+"admin/Controllers/productsController.php", {
            method: 'POST',
            headers:{"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "ADD_CATEGORY",
                newCategory: this.state.categoryInput,
                sessionId :this.props.session
            }),
            mode: 'cors'
        }).then((response)=>response.json()).then((data)=> {
            this.setState({insertMessage: data});
            if(data.success){
                this.getCategories();
                this.setState({categoryInput: ''});
            }
            this.setState({loading:false});
        }).catch((err)=>{
            console.error(err);
            this.setState({loading:false});
        });

    }



    render(){
        return(
            <div>
            <Grid.Row columns={'16'} >
                <Grid>
                    <div className="add_items_positioning">
                        <Grid.Row columns={'16'}>
                            <Divider/>
                            <Divider horizontal>Current Categories in the store</Divider>
                            <Divider/>
                        </Grid.Row>

                        <Grid.Row >
                            {this.state.currentCats !=null?this.state.currentCats.map((item,i)=> <Label key={item.id}>{item.cat} <Icon name='delete' onClick={this.removeCat.bind(this, item.id)}/></Label> ): null}
                            <br />
                            <Divider/>
                        </Grid.Row>
                        <br /><br />
                        <Grid.Row>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <label className="font_size_label">Category Name: </label>
                                <div className="ui input menu-spacing "> <input type="text" placeholder="Name" value={this.state.categoryInput} onChange={this.handleCatInput.bind(this)}/></div>
                                <button type='submit' className="ui button">Add</button>
                                {this.state.insertMessage == null?<span></span>:<span>{this.state.insertMessage.Message}</span>}
                            </form>
                            <br />
                        </Grid.Row>
                    </div>
                </Grid>
            </Grid.Row>
                <Dimmer active={this.state.loading} inverted>
                    <Loader>Loading</Loader>
                </Dimmer>

            </div>
        );
    }
}

/**
 * Component must be made with a parent tag of Grid.Row. the child components will then be rendered in that row.
 * Component must be registered in the handleClick in add pane.
 */
class Prod extends Component{

    constructor(){
        super();
        this.state = {
            loading: true,
        };
    }



    render(){
        return(
            <Grid.Row columns={'16'}>
                <Grid.Column width={'8'}>
                    <h1>Col 1 prod</h1>
                </Grid.Column>

                <Grid.Column width={'8'}>
                    <h1>Col 2 prod</h1>
                </Grid.Column>
            </Grid.Row>
        );
    }
}



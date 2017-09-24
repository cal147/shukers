/**
 * This class controls the add section the products section.
 */

import React, {Component} from 'react';
import {
    Tab,
    Grid,
    Button,
    Divider,
    Dimmer,
    Loader,
    Label,
    Icon,
    Confirm,
    TextArea,
    Checkbox,
    Input,
    Message
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';


import '../../AdminMaster.css'

import adminUserStore from '../../AdminStores/AdminUserStore';
import {serverScripts, imgResource} from '../../../shared/urls';

/**
 *   Sets up the grid system for positioning components.
 *   This class allows the user to select their task and then a form is generated.
 */
export default class AddPane extends Component {
//
    constructor() {
        super();
        this.state = {
            activeComp: null,
            user: adminUserStore.getUser()
        };
    }


    //Handles the button clicks for add category or add product. sets the active component based on the users click
    handleClick(e, {name}) {

        switch (name) {
            case "cat":
                this.setState({activeComp: <Cat session={this.state.user.serverSession}/>});
                break;
            case "prod":
                this.setState({activeComp: <Prod session={this.state.user.serverSession}/>});
                break;
            default:
                this.setState({activeComp: null});
        }
    }


    render() {
        return (
            <Tab.Pane>
                <Grid columns={'equal'}>
                    <Grid.Row columns={'16'}>
                        <Grid.Column width={'8'}>
                            <Button color={'red'} style={{margin: 10}} name="cat" onClick={this.handleClick.bind(this)}>Add
                                Category</Button>
                            <Button color={'red'} style={{margin: 10}} name="prod"
                                    onClick={this.handleClick.bind(this)}>Add Product</Button>
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
class Cat extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            currentCats: null,
            categoryInput: '',
            insertMessage: null,
            openConfirm: false,
            showCancelButton: null,
            idToDelete: null,
        };
    }

    componentWillMount() {
        this.getCategories();
    }

    getCategories() {
        this.setState({loading: true});
        fetch(serverScripts + "admin/Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_CATEGORIES",
                sessionId: this.props.session
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            this.setState({currentCats: data});
            this.setState({loading: false});
        }).catch((err) => {
            console.error(err);
        });
    }

    componentDidMount() {

    }

    removeCat(id) {
        this.setState({loading: true});
        fetch(serverScripts + "admin/Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "DELETE_CATEGORY",
                categoryId: id,
                sessionId: this.props.session
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            this.setState({insertMessage: data});
            if (data.success) {
                let tmpArr = this.state.currentCats;
                for (let i = 0; i < tmpArr.length; i++) {
                    if (tmpArr[i].id === id) {
                        tmpArr.splice(i, 1);
                        this.setState({currentCats: tmpArr});
                        break;
                    }
                }

            }
            this.setState({loading: false});
        }).catch((err) => {
            console.error(err);
            this.setState({loading: false});
        });
    }

    handleCatInput(e) {
        this.setState({categoryInput: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        fetch(serverScripts + "admin/Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "ADD_CATEGORY",
                newCategory: this.state.categoryInput,
                sessionId: this.props.session
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            this.setState({insertMessage: data});
            if (data.success) {
                this.getCategories();
                this.setState({categoryInput: ''});
            }
            this.setState({loading: false});
        }).catch((err) => {
            console.error(err);
            this.setState({loading: false});
        });


    }

    handleConfirm = () => {
        this.setState({openConfirm: false});
        this.removeCat(this.state.idToDelete);
    };

    handleCancel = () => {
        this.setState({openConfirm: false})
    };

    confirmRemoveCat(id) {
        this.setState({
            openConfirm: true,
            insertMessage: "Are you suer you want to delete this category",
            showCancelButton: "Cancel",
            idToDelete: id
        });
    }


    render() {
        return (
            <Grid.Row columns={'16'}>
                <Grid>
                    <div className="add_items_positioning">
                        <Grid.Row columns={'16'}>
                            <Divider/>
                            <Divider horizontal>Current Categories in the store</Divider>
                            <Divider/>
                        </Grid.Row>

                        <Grid.Row>
                            {this.state.currentCats != null ? this.state.currentCats.map((item, i) => <Label
                                key={item.id}>{item.cat} <Icon name='delete'
                                                               onClick={this.confirmRemoveCat.bind(this, item.id)}/></Label>) : null}
                            <br/>
                        </Grid.Row>
                        <br/>
                        <Grid.Row>
                            {this.state.insertMessage == null ? <span></span> : <span
                                style={{color: 'red', fontSize: "20px"}}>{this.state.insertMessage.Message}</span>}
                        </Grid.Row>
                        <br/>
                        <Grid.Row>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <label className="font_size_label">Category Name: </label>
                                <div className="ui input add_items_positioning "><input type="text" placeholder="Name"
                                                                                        value={this.state.categoryInput}
                                                                                        onChange={this.handleCatInput.bind(this)}/>
                                </div>
                                <button type='submit' className="ui button">Add</button>
                            </form>
                            <br/>
                        </Grid.Row>
                    </div>
                </Grid>
                <Dimmer active={this.state.loading} inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Confirm
                    open={this.state.openConfirm}
                    cancelButton={this.state.showCancelButton}
                    content={this.state.insertMessage}
                    onConfirm={this.handleConfirm}
                    onCancel={this.handleCancel}
                />
            </Grid.Row>

        );
    }
}

/**
 * Component must be made with a parent tag of Grid.Row. the child components will then be rendered in that row.
 * Component must be registered in the handleClick in add pane.
 */
class Prod extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            categoryOptions: null,
            selectedCat: "",
            nameInput: "",
            prodDesc: "",
            price: 0,
            units: "",
            onOffer: false,
            threeForTen: false,
            images: null,
            imageBin :null,
            errorMessage:"",
            errorState:true,
            success:false,
        };
    }

    componentWillMount() {
        this.getCategories();
    }

    componentDidMount() {

    }

    getCategories() {
        this.setState({loading: true});
        fetch(serverScripts + "admin/Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_CATEGORIES",
                sessionId: this.props.session
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            this.setState({categoryOptions: data});
            this.setState({loading: false});
        }).catch((err) => {
            console.error(err);
        });
    }

    selectCat(e) {
        this.setState({selectedCat: e.target.value});
    }

    handleNameInput(e) {
        this.setState({nameInput: e.target.value});
    }

    handleUnitInput(e) {
        this.setState({units: e.target.value});
    }

    descInput(e, data) {
        this.setState({prodDesc: data.value});
    }

    onOffer(e, data) {
        this.setState({onOffer: data.checked});
    }

    threeForTen(e, data) {
        this.setState({threeForTen: data.checked});
    }

    price(e, data) {
        this.setState({price: e.target.value});
    }

    onImageDrop(acceptedFiles) {
        // let addImage = this.state.images;
        // addImage.unshift(acceptedFiles[0]);
        this.setState({images: acceptedFiles[0]});

        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                this.setState({imageBin: fileAsBinaryString});
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            //reader.readAsBinaryString(file);
            reader.readAsDataURL(file);
        });

    }

    validateandSubmit(){

        this.state.selectedCat === "" ? this.setState({errorMessage:"Select a Category", errorState:true}): this.setState({errorState:false});
        this.state.nameInput === "" ? this.setState({errorMessage:"Enter a name", errorState:true}): this.setState({errorState:false});
        this.state.prodDesc === "" ? this.setState({errorMessage:"Enter description", errorState:true}): this.setState({errorState:false});
        this.state.price === 0 ? this.setState({errorMessage:"Enter a price", errorState:true}): this.setState({errorState:false});
        this.state.images.length === 0 ? this.setState({errorMessage:"You haven't added an image", errorState:true}): this.setState({errorState:false});
        this.state.units === "" ? this.setState({errorMessage:"Enter units", errorState:true}): this.setState({errorState:false});
        if(!this.state.errorState){
            //upload the file.
            this.setState({loading: true});


            fetch(serverScripts + "admin/Controllers/productsController.php", {
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: JSON.stringify({
                    action: "ADD_PRODUCT",
                    prodName: this.state.nameInput,
                    description: this.state.prodDesc,
                    price: this.state.price,
                    onOffer: this.state.onOffer,
                    category: this.state.selectedCat,
                    name: this.state.images.name,
                    blob: this.state.imageBin,
                    sessionId: this.props.session,
                    threeForTen: this.state.threeForTen,
                    units: this.state.units,
                }),
                mode: 'cors'
            }).then((response) => response.json()).then((data) => {
                this.setState({loading: false, success: data.success}, ()=>{
                   if(this.state.success){
                       this.setState({
                           selectedCat: "",
                           nameInput: "",
                           prodDesc: "",
                           price: 0,
                           units:"",
                           onOffer: false,
                           images: null,
                           imageBin :null,
                           errorMessage:"",
                           errorState:true,
                       });
                   }
                });
            }).catch((err) => {
                console.error(err);
            });

        }


    }


    render() {

        const imgStyle = {
            width: "50%",
            textAlign: "center"
        };

        return (

            <Grid.Row>

                <Grid columns={4}>
                    <Grid.Row>
                        <Grid.Column>
                            <Label size={"large"} pointing="right" basic>Category ID</Label>
                            <select className="ui selection dropdown" onChange={this.selectCat.bind(this)}>
                                <option value={null}>Select...</option>
                                {this.state.categoryOptions != null ? this.state.categoryOptions.map((item, i) =>
                                    <option key={item.id} value={item.id}
                                            onChange={this.selectCat.bind(this, item.id)}>{item.cat} </option>) : null}
                            </select>
                        </Grid.Column>

                        <Grid.Column>
                            <Label size={"large"} pointing="right" basic>Name</Label>
                            <div className="ui input"><input type="text" placeholder="Name" value={this.state.nameInput}
                                                             onChange={this.handleNameInput.bind(this)}/></div>
                        </Grid.Column>

                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={16}><Label size={"large"} pointing="below"
                                                       basic>Description</Label></Grid.Column>
                        <Grid.Column><TextArea placeholder='Enter description' value={this.state.prodDesc} style={{width: "660px"}}
                                               onChange={this.descInput.bind(this)}/></Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column><Checkbox toggle label={<label>On Offer</label>} checked={this.state.onOffer}
                                               onChange={this.onOffer.bind(this)}/></Grid.Column>
                        <Grid.Column><Checkbox toggle label={<label>Three For Ten</label>} checked={this.state.threeForTen}
                                               onChange={this.threeForTen.bind(this)}/></Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Label size={"large"} pointing="right" basic>Price</Label>
                            <Input labelPosition='right' type='text' onChange={this.price.bind(this)} value={this.state.price}>
                                <Label basic>£</Label>
                                <input size={6} pattern="[0-9.]{2,6}" name="pounds"/>
                            </Input>
                        </Grid.Column>

                        <Grid.Column>
                            <Label size={"large"} pointing="right" basic>Unit</Label>
                            <div className="ui input"><input type="text" placeholder="Unit" value={this.state.units}
                                                             onChange={this.handleUnitInput.bind(this)}/></div>

                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Label size={"large"} pointing="below" basic>Add Images</Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={10}>
                        <Grid.Column width={2}>
                            <Dropzone
                                multiple={false}
                                accept="image/*"
                                onDrop={this.onImageDrop.bind(this)}
                            >
                                {this.state.images != null?<img src={this.state.images.preview} alt={this.state.images.name} style={{height: "190px", padding:"5px"}}/>:
                                    <div style={{width: "50%", textAlign: "center", marginLeft:"20%", marginTop:"10%"}}><img src={imgResource + "photo-128.png"} alt="Add" /><br/><span>Drag or click to add image</span></div>}
                            </Dropzone>

                        </Grid.Column>

                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={5}>
                            <div  style={{color:"red", fontSize:"30px"}}>{this.state.errorMessage}</div>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button color='red' onClick={this.validateandSubmit.bind(this)}>Add Product</Button>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={10}>
                            {this.state.success? <Message
                                success
                                header='The product wass added'
                                content='The product will now appear on the web site'
                            />: null}
                        </Grid.Column>

                    </Grid.Row>


                </Grid>

                <Dimmer active={this.state.loading} inverted>
                    <Loader>Loading</Loader>
                </Dimmer>

            </Grid.Row>

        );
    }
}




import { EventEmitter } from 'events';
import Dispatcher from '../../dispatcher';
import {serverScripts} from '../../shared/urls';
import adminUserStore from './AdminUserStore';

class SalesStore extends EventEmitter{


    constructor(){
        super();
        this.sales = null;
        this.user =  adminUserStore.getUser();

        this.refreshSales();


    }


    refreshSales(){

        let count = 0;

        if(this.user.Staff) {

            fetch(serverScripts + "admin/Controllers/SalesStoreController.php", {
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: JSON.stringify({
                    action: "GET_SALES",
                    sessionId: this.user.serverSession
                }),
                mode: 'cors'
            }).then((response) => response.json()).then((data) => {
                if (data.success) {
                    this.sales = data.sales;
                    this.emit("change");
                }
            }).catch((err) => {
                console.error(err);
            });


            this.emit("change");
            count = 0;
        }

        if(count == 0) {
            setTimeout(() => {
                this.refreshSales();
            }, 60000*5); //Gets sales data from the server every 5 mins.
            count++;
        }
    }

    getSales(){
        return this.sales;
    }

    getSalesCount(){
        let count = 0;
        if(this.sales != null) count = this.sales.length;

        return count;
    }

    dispatchSale(id){
        fetch(serverScripts+"admin/Controllers/SalesStoreController.php", {
            method: 'POST',
            headers:{"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "MARK_AS_DISPATCHED",
                sessionId : this.user.serverSession,
                id: id
            }),
            mode: 'cors'
        }).then((response)=>response.json()).then((data)=>{
            if(data.success) {
                this.refreshSales();
                this.emit("change");
            }
        }).catch((err)=>{
            console.error(err);
        });

    }

    //Listens for dispatched. when a dispatch comes in the relevant method is called.
    handleActions(action){

        switch(action.type){
            case "DISPATCH_SALE":
                this.dispatchSale(action.id);
                break;

            default: break;
        }
    }//End of handle actions

}

const salesStore = new SalesStore();
Dispatcher.register(salesStore.handleActions.bind(salesStore));

window.salesStore = salesStore; //Temp can access the user store from the console.

export default salesStore;
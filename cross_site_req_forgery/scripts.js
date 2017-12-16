const ProductItem = React.createClass({
    render: function () {
        debugger
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
        );
    }
});

const ProductList = React.createClass({
    render: function () {
        var products = this.props.products.map(function (product, index) {
            debugger
            return (
                <ProductItem
                    key={index}
                    name={product.name}
                    price={product.price}
                />
            );
        });

        return (
            <table>
                <tbody>
                {products}
                </tbody>
            </table>
        );
    }
});

// Could come from an API, LocalStorage, another component, etc...
const products = [
    {name: 'Toast', price: 1499},
    {name: 'Bacon', price: 3245},
    {name: 'Coffee', price: 300}
];
const Button = React.createClass({
    render: function () {
        return (
            <button
                className={this.props.className}
                onClick={this.props.handleClick}>{this.props.name}</button>
        );
    }
});
var Cookie = {cookie:'',path:'',domain:'',value:''}
var Credentials = {param:'',value:''}
var Selenium = {Xpath:''}

var Root = React.createClass({
    getInitialState:function () {
        return {
                login_required:false,
                url:'',
                url_id:'',
                userrole:'no_role',
                service:'crosssite',
                steps:[
                    {
                        login_type:'',
                    },{
                        success_url:''
                    },{
                        Cookie:[Cookie],
                        // Cookie:[{cookie:'',path:'',domain:'',value:''}],
                        Credentials:[this.Credentials],
                        Selenium:[this.Selenium],
                        sel_cmd1:''
                    }
                ],
                modalOpen:false,
                crosssite : { currentstep: 1, limit: 4, edit_login: 0 },
                backButtonVisible:true,
                nextButtonVisible:true,
                submitButtonVisible:true,
        };
    },

    validateForm() {
        return true
    },

    handleChange :function (e) {
        debugger
        if(e.target.name==='login_required'){
            debugger
            this.setState({
                [e.target.name]: !this.state[e.target.name]
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    },
    onModalInputChange:function (e) {
        let state = {...this.state}
        state.steps[this.state.crosssite.currentstep-1][e.target.name]= e.target.value
        this.setState(state)
    },
    openModal:function () {
        debugger
        this.setState({modalOpen:true})
    },
    validateInitialForm:function(){
        if (!(this.is_valid_url(this.state.url))) {
            alert('Enter a valid URL to scan');
            return false;
        }
        let state= {...this.state}
        state.steps = state.map(step,index=>{
            step.visible = index===0
        })
        state.crosssite.currentstep = 1
        this.setState(state)
        // this.setState({crosssite:{currentstep : 1}})
        // this.state.crosssite.currentstep = 1;
        // console.log("Current: " + crosssite.currentstep);
        // Init buttons and UI
        // widget.not(':eq(0)').hide();
        // $(".step").eq(0).show();
        // this.hideButtons();
    },
    backButtonHandle:function(){
        if(this.state.crosssite.currentstep > 1){
            debugger
            this.setState({...this.state,crosssite:{...this.state.crosssite,currentstep:this.state.crosssite.currentstep - 1}})
        }
        console.log("Inside back button: ", this.state.crosssite.currentstep);
    },
    nextButtonHandle:function(){
        console.log("Inside next button: ",this.state.crosssite.currentstep);
        if (this.state.crosssite.currentstep) {
            debugger
            if (!this.canClickNext()) return;
        }
        if(this.state.crosssite.currentstep < this.state.crosssite.limit){
            debugger
            this.setState({...this.state,crosssite:{...this.state.crosssite,currentstep:this.state.crosssite.currentstep + 1}})
        }
    },
    canClickNext:function () {
        return this.state.crosssite.currentstep === 1 ? this.validateLoginType() : this.validateRedirectURL()
    },

    validateRedirectURL:function () {
        return this.is_valid_url(this.state.steps[1]['success_url'])
    },

    addMoreParams:function () {
        let state= {...this.state}
        if ( this.state.steps[0]['login_type'] === "Credentials" ) {
            state.steps[2][this.state.steps[0]['login_type']].push(Credentials)
        }
        else if ( this.state.steps[0]['login_type'] === 'Cookie' ) {
            state.steps[2][this.state.steps[0]['login_type']].push(Cookie)
        }
        else if ( this.state.steps[0]['login_type'] === 'Selenium' ) {
            state.steps[2][this.state.steps[0]['login_type']].push(Selenium)
        }
        this.setState(state)
    },
    validateLoginType:function () {
        if (this.state.steps[0]['login_type']!=='') {
            //$('#loginTypeError').hide();
            // jQuery("#login-param-div").hide();
            // jQuery("#cookie-param-div").hide();
            // jQuery("#selenium-param-div").hide();
            /*if ( jQuery("input[name='login_type']:checked").val() == 'Credentials') {
                jQuery("#login-param-div").show();
            }
            else if ( jQuery("input[name='login_type']:checked").val() == 'Cookie' ) {
                jQuery("#cookie-param-div").show();
            }
            else if ( jQuery("input[name='login_type']:checked").val() == 'Selenium' ) {
                jQuery("#selenium-param-div").show();
            }*/
            return true;
        }
        else {
            // $('#loginTypeError').show();
            return false;
        }
    },
    is_valid_url:function(url) {
        return /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
    },
    /*handleSubmit :function (event) {
        event.preventDefault();
    },*/
    closeModal:function () {
        // widget      = $(".step");
        // widget.not(':eq(0)').hide();
        // let steps={...this.state.steps}
        let steps=this.state.steps.map(item=>{
            item.visible = index===0
        })
        console.log('close event');
        this.setState({...this.state,steps:steps})
        //current = 1; Not Needed, otherwise back button wont work
    },
    // Hide buttons according to the current step
    hideButtons : function(){
        console.log("Inside hide button: ", this.state.crosssite.currentstep, this.state.crosssite.limit);
        // $(".action").hide();

        // if(this.state.crosssite.currentstep < this.state.crosssite.limit) btnnext.show();
        // if(this.state.crosssite.currentstep > 1) this.state.btnback.show();
        // if (this.state.crosssite.currentstep == this.state.crosssite.limit) {
        // btnnext.hide();
        // this.setState({nextButtonVisible:false,submitButtonVisible:true})
        // btnsubmit.show();

    },
    /*$('#mainModal').on('hidden.bs.modal', function () {
        // widget      = $(".step");
        // widget.not(':eq(0)').hide();
        // let steps={...this.state.steps}
        let steps=this.state.steps.map(item=>{
            item.visible = index===0
        })
        console.log('close event');
        this.setState({...this.state,steps:steps})
        //current = 1; Not Needed, otherwise back button wont work
    })*/
    render:function () {
        console.log(this.state)
        const k =['Password','Cookie','Xpath'];

        debugger
        return(
            <div className="col-sm-9">
                <div className="form-group">
                    <form action="" method="post" className="form-inline">
                        <label htmlFor="urlid" className="control-label">URL</label>
                        <input type="text" size="50" name="url" id="urlid" value={this.state.url} placeholder="https://www.google.com" className="form-control" onChange={ this.handleChange }/>
                        <input type="hidden" name="url_id" value={this.state.url_id} id="urlid1" onChange={ this.handleChange }/>
                        <input type="hidden" name="userrole" value={this.state.userrole} onChange={ this.handleChange }/>
                        <input type="hidden" name="service" value={this.state.service} onChange={ this.handleChange }/>
                        <h>{this.state.login_required}</h>
                        <input type="checkbox" label={this.state.login_required} name="login_required" id="loginrequired" checked={this.state.login_required} onChange={ this.handleChange }/>Login Required?
                        {this.state.login_required && (
                            <button type="button" className="btn btn-primary" id="mainmodalbutton" data-toggle="modal" data-target="#mainModal" onClick={ this.openModal }>Add Login Credentials</button>
                        )}
                        <input type="submit" className="btn btn-primary" value="Scan"/>
                    </form>
                    {/*{this.state.modalOpen ? this.getModal() : null}*/}
                    <div>
                        {/*{this.state.modalOpen ? this.bootstrapOriginalModal() : null}*/}
                        {this.state.modalOpen &&
                        (
                            <div id="mainModal" className="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title">Add Login Credentials</h4>
                                        </div>
                                        <div className="modal-body">
                                            <div className="addedLogin">
                                                <ul id="addedLoginList" className="list-unstyled list-inline" style={{display:"none"}}>
                                                </ul>
                                            </div>
                                            {this.state.crosssite.currentstep  === 1 &&
                                            (<div className="step 1 step1">
                                                Login Type
                                                {this.state.steps[0].login_type==='' && (

                                                    <div className="alert alert-danger fade in" id="loginTypeError">Please select login type</div>)}
                                                {["Credentials","Cookie","Selenium"].map((item,index)=>{
                                                    return (
                                                        <div className="radio" key={index}>
                                                            <label>
                                                                <input type="radio" name="login_type" value={item}
                                                                       checked={this.state.steps[0]['login_type']===item}
                                                                       onChange={this.onModalInputChange}/>{k[index]}</label>
                                                        </div>
                                                    )
                                                })}
                                            </div>)}
                                            {this.state.crosssite.currentstep  === 2 &&
                                            (<div className="step 2 step2">
                                                {this.state.steps[1]['success_url']==='' && (<div className="alert alert-danger fade in" id="successURLError" >Please enter valid success URL</div>)}
                                                URL if the user logged in successfully
                                                {/*<input type="text" name="success_url" size="30" value={this.state.steps[1]['success_url']} className="form-control" onChange={this.onModalInputChange}/>*/}
                                                <input type="text" name="success_url" size="30" value={"www.google.com"} className="form-control" onChange={this.onModalInputChange}/>
                                            </div>)}
                                            {this.state.crosssite.currentstep  === 3 &&
                                            (<div className="step 3 step3">
                                                {this.state.steps[0]['login_type'] === "Credentials" &&
                                                (<div id="login-param-div">
                                                    <p>Add Login Parameters: ie the username and password to login to the site. </p>
                                                    <p>Enter the name of the parameter in login form in the param field, Enter the value
                                                        of the parameter in value field). For example if the username parameter is named
                                                        username in login form, enter username in param field, and actual username value
                                                        in value field.</p>
                                                    <ul id="login-param-list" className="list-unstyled">
                                                        {this.state.steps[2]['Credentials'].map((cookie, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <label htmlFor={"param" + (index + 1)}
                                                                           className="control-label">{"Param " + (index + 1)}</label>
                                                                    <input type="text" size="10"
                                                                           name={"param" + (index + 1)} value=""
                                                                           className="form-control"
                                                                           id={"param-" + (index + 1)}/>
                                                                    <label htmlFor={"value" + (index + 1)}
                                                                           className="control-label">{"Value " + (index + 1)}</label>
                                                                    <input type="text" size="10"
                                                                           name={"value" + (index + 1)} value=""
                                                                           className="form-control"
                                                                           id={"value-" + (index + 1)}/>
                                                                </li>)
                                                        })
                                                        }
                                                        </ul>
                                                </div>)}
                                                {this.state.steps[0]['login_type'] === "Cookie" &&
                                                    (<div id="cookie-param-div">
                                                        <ul id="cookie-param-list" className="list-unstyled">
                                                            {this.state.steps[2]['Cookie'].map((cookie,index)=>{
                                                               return (
                                                                   <li key={index}>
                                                                       <label htmlFor={!index ? "cookie_name" : "cookie_name" + (index + 1) + 1} className="control-label">{!index ? "Cookie" : "Cookie " + (index +1) }</label>
                                                                       <input type="text" size="10" name={"cookie_name"+(index + 1)} value="" className="form-control" id={!index ? "admin-cookie-name-" : "cookie-name-" + (index + 1) } />
                                                                       <label htmlFor={!index ? "admin_cookie_value" : "cookie_value" + (index + 1) + 1 } className="control-label">{!index ? "Value" : "Value " + (index+1) }</label>
                                                                       <input type="text" size="10" name={"cookie_value"+(index + 1)} value="" className="form-control" id={!index ? "admin-cookie-value-" : "cookie-value-" + (index + 1) }/>
                                                                       <label htmlFor={!index ? "admin_cookie_domain" : "cookie_domain" + (index + 1) + 1 } className="control-label">{!index ? "Domain" : "Domain " + (index+1) }</label>
                                                                       <input type="text" size="10" name={"cookie_domain"+(index + 1)} value="" className="form-control" id={!index ? "admin-cookie-domain-" : "cookie-domain-" + (index + 1) }/>
                                                                       <label htmlFor={!index ? "admin_cookie_path" : "cookie_path" + (index + 1) + 1 } className="control-label">{!index ? "Path" : "Path " + (index+1) }</label>
                                                                       <input type="text" size="10" name={"cookie_path"+(index + 1)} value="" className="form-control" id={!index ? "admin-cookie-path-" : "cookie-path-" + (index + 1) }/>
                                                                   </li>
                                                               )
                                                            })}
                                                        </ul>

                                                    </div>)}
                                                {this.state.steps[0]['login_type'] === "Selenium" &&
                                                (<div id="selenium-param-div">
                                                    <ul id="selenium-param-list" className="list-unstyled">
                                                        {this.state.steps[2]['Selenium'].map((sel,index)=>{
                                                            return (
                                                                <li key={index}>
                                                                    <label htmlFor={"sel_cmd" + (index + 1) + 1} className="control-label">{"Xpath " + (index +1) }</label>
                                                                    <input type="text" size="10" name={"sel_cmd"+(index + 1)} value="" className="form-control" id={"sel-cmd" + (index + 1) } />
                                                                </li>
                                                            )
                                                        })}

                                                    </ul>
                                                </div>)}
                                                <Button className = {"btn btn-primary"} name={"Add More Param"} handleClick={this.addMoreParams}/>
                                                {/*<button type = "button" className = "btn btn-primary" id="add-param">Add More Param</button>*/}
                                                <button type = "button" className = "btn btn-primary" id="add-param-save">Save</button>
                                                <button className="btn btn-primary" id="add-another-login" style={{display:"none"}}>Add Another Login Credentials</button>
                                            </div>)}

                                        </div>
                                        <div className="modal-footer">
                                            {(this.state.crosssite.currentstep > 1) && <Button className="action back btn-primary" name={"Back"} handleClick={this.backButtonHandle}/>}
                                            {((this.state.crosssite.currentstep < this.state.crosssite.limit) && (this.state.crosssite.currentstep !== this.state.crosssite.limit)) && <Button className="action next btn-primary" name={"Next"} handleClick={this.nextButtonHandle}/>}
                                            {<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>}
                                            {/*{(this.state.crosssite.currentstep === this.state.crosssite.limit) && <button type="button" className="btn btn-default" data-dismiss="modal">Submit button created by vikas</button>}*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
})

ReactDOM.render(<Root/>, document.getElementById('root'));
// ReactDOM.render(<ProductList products={products} />, document.getElementById('root'));
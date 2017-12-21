const Cookie = {cookie_name: '', cookie_path: '', cookie_domain: '', cookie_value: ''};
const Credentials = {param: '', value: ''};
const Selenium = {sel_cmd: ''};

const CookiesComponent = React.createClass({
    render: function(){
        let {cookiesArray,onModalInputChange} = this.props
        return(
            <div id="cookie-param-div">
                <ul id="cookie-param-list" className="list-unstyled">
                    {cookiesArray.map((cookie,index)=>{
                        return (
                            <li key={index}>
                                <label htmlFor={!index ? "cookie_name" : "cookie_name" + (index + 1) + 1} className="control-label">{!index ? "Cookie" : "Cookie " + (index +1) }</label>
                                <input type="text" size="10" name={"cookie_name" + (index + 1)} value={cookie[`cookie_name${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-name-" : "cookie-name-" + (index + 1) } onChange={onModalInputChange}/>
                                <label htmlFor={!index ? "admin_cookie_value" : "cookie_value" + (index + 1) + 1 } className="control-label">{!index ? "Value" : "Value " + (index+1) }</label>
                                <input type="text" size="10" name={"cookie_value"+(index + 1)} value={cookie[`cookie_value${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-value-" : "cookie-value-" + (index + 1) } onChange={onModalInputChange}/>
                                <label htmlFor={!index ? "admin_cookie_domain" : "cookie_domain" + (index + 1) + 1 } className="control-label">{!index ? "Domain" : "Domain " + (index+1) }</label>
                                <input type="text" size="10" name={"cookie_domain"+(index + 1)} value={cookie[`cookie_domain${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-domain-" : "cookie-domain-" + (index + 1) } onChange={onModalInputChange}/>
                                <label htmlFor={!index ? "admin_cookie_path" : "cookie_path" + (index + 1) + 1 } className="control-label">{!index ? "Path" : "Path " + (index+1) }</label>
                                <input type="text" size="10" name={"cookie_path"+(index + 1)} value={cookie[`cookie_path${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-path-" : "cookie-path-" + (index + 1) } onChange={onModalInputChange}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
})
const SeleniumComponent= React.createClass({
    render:function(){
        let {seleniumArray,onModalInputChange} = this.props
        return(
            <div id="selenium-param-div">
            <ul id="selenium-param-list" className="list-unstyled">
                {seleniumArray.map((sel,index)=>{
                    return (
                        <li key={index}>
                            <label htmlFor={"sel_cmd" + (index + 1) + 1} className="control-label">{"Xpath " + (index +1) }</label>
                            <input type="text" size="10" name={"sel_cmd"+(index + 1)} value={sel[`sel_cmd${(index+1)}`]} className="form-control" id={"sel-cmd" + (index + 1) } onChange={onModalInputChange}/>
                        </li>
                    )
                })}
            </ul>
        </div>)
    }
})
const LoginDetailsComponent= React.createClass({
    render:function(){
        let {login_type,data,addMoreParams,onModalInputChange,save} = this.props
        const cookiesArray=data['Cookie']
        const seleniumArray=data['Selenium']
        const credentialsArray=data['Credentials']
        return(
            <div className="step 4 step4">
                {login_type === "Credentials" && (<CredentialsComponent credentialsArray={credentialsArray} onModalInputChange = {onModalInputChange}/>)}
                {login_type === "Cookie" && (<CookiesComponent cookiesArray={cookiesArray} onModalInputChange = {onModalInputChange}/>)}
                {login_type === "Selenium" && (<SeleniumComponent seleniumArray={seleniumArray} onModalInputChange = {onModalInputChange}/> )}
                <Button className = {"btn btn-primary"} name={"Add More Param"} id={"add-param"} handleClick={addMoreParams}/>
                <Button className = {"btn btn-primary"} name={"Save"} id={"add-param-save"} handleClick={save}/>
                <button className="btn btn-primary" id="add-another-login" style={{display:"none"}}>Add Another Login Credentials</button>
            </div>)
    }
})
const LoginTypeComponent= React.createClass({
    render:function(){
        let {login_type,onModalInputChange} = this.props
        const loginTypeNames =['Password','Cookie','Xpath'];
        const loginTypeValues =["Credentials","Cookie","Selenium"];
        return(
            <div className="step 2 step1">
                Login Type
                {login_type==='' && (
                    <div className="alert alert-danger fade in" id="loginTypeError">Please select login type</div>)}
                {loginTypeValues.map((item,index)=>{
                    return (
                        <div className="radio" key={index}>
                            <label>
                                <input type="radio" name="login_type" value={item}
                                       checked={login_type===item}
                                       onChange={onModalInputChange}/>{loginTypeNames[index]}</label>
                        </div>
                    )
                })}
            </div>
        )
    }
})
const SuccessURLComponent= React.createClass({
    render:function(){
        let {success_url,onModalInputChange} = this.props
        return(
            <div className="step 3 step3">
                {success_url==='' && (<div className="alert alert-danger fade in" id="successURLError" >Please enter valid success URL</div>)}
                URL if the user logged in successfully
                {/*<input type="text" name="success_url" size="30" value={this.state.steps[1]['success_url']} className="form-control" onChange={this.onModalInputChange}/>*/}
                <input type="text" name="success_url" size="30" value={"www.google.com"} className="form-control" onChange={onModalInputChange}/>
                {/*<input type="text" name="success_url" size="30" value={success_url} className="form-control" onChange={this.onModalInputChange}/>*/}
            </div>
        )
    }
})
const UserRoleComponent= React.createClass({
    render:function(){
        let {activeRole,userRoleValues,onModalInputChange} = this.props
        return(
            <div className="step 1 step1">
                Role for which you are adding Login Credentials
                {activeRole==='' && (
                    <div className="alert alert-danger fade in" id="loginTypeError">Please select a role</div>)}
                {Object.keys(userRoleValues).map((item,index)=>{
                    return (
                        <div className="radio" key={index}>
                            <label>
                                <input type="radio" name="userrole" value={item}
                                       checked={activeRole===item}
                                       onChange={onModalInputChange}/>{userRoleValues[item]}</label>
                        </div>
                    )
                })}
            </div>)
    }
})
const CredentialsComponent= React.createClass({
    render:function(){
        let {credentialsArray,onModalInputChange} = this.props
        return(
            <div id="login-param-div">
                <p>Add Login Parameters: ie the username and password to login to the site. </p>
                <p>Enter the name of the parameter in login form in the param field, Enter the value
                    of the parameter in value field). For example if the username parameter is named
                    username in login form, enter username in param field, and actual username value
                    in value field.</p>
                <ul id="login-param-list" className="list-unstyled">
                    {credentialsArray.map((cookie, index) => {
                        return (
                            <li key={index}>
                                <label htmlFor={"param" + (index + 1)} className="control-label">{"Param " + (index + 1)}</label>
                                <input type="text" size="10" name={"param" + (index + 1)} value={cookie['param']}
                                       className="form-control" onChange={onModalInputChange}
                                       id={"param-" + (index + 1)}/>
                                <label htmlFor={"value" + (index + 1)} className="control-label">{"Value " + (index + 1)}</label>
                                <input type="text" size="10" name={"value" + (index + 1)} value={cookie['value']}
                                       className="form-control" onChange={onModalInputChange}
                                       id={"value-" + (index + 1)}/>
                            </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
})
const Button =(props)=> (<button className={props.className} onClick={props.handleClick}>{props.name}</button>)
var Root = React.createClass({
    getInitialState:function(){
        return {
            login_required:false,
            url:'',
            url_id:'',
            service:'crosssite',
            steps:[
                {
                    userrole:new Set(),
                },{
                    login_type:{
                        // 'admin':'Cookie'
                    },
                },{
                    success_url:{
                        // 'admin':'www.google.com'
                    },
                },{
                    /*'admin':{
                        Cookie:[this.getValues(Cookie,1)],
                        Credentials:[this.getValues(Credentials,1)],
                        Selenium:[this.getValues(Selenium,1)],
                    }*/
                }
            ],
            modalOpen:false,
            crosssite : { activeRole:'',currentstep: 1, limit: 5, edit_login: 0 }
        };
    },
    componentDidMount:function () {
        $(this.refs.modal.getDOMNode()).modal({
            backdrop: "static",
            show: false
        });
    },
    componentWillUnmount: function () {
        $(this.refs.modal.getDOMNode()).off();
    },
    getValues:function(object,itemNumber){
        let k ={}
        Object.keys(object).map(prop => {
            // noinspection JSAnnotator
            k[`${prop}${itemNumber}`] = object[prop]
        });
        console.log(k)
        return k
    },
    validateForm() {
        return true
    },

    handleChange :function(e){
        this.setState({
            [e.target.name]: e.target.name==='login_required' ? !this.state[e.target.name] : e.target.value
        });
    },

    formAndAddStep3Object:function(){
        return {
        Cookie:[this.getValues(Cookie,1)],
        Credentials:[this.getValues(Credentials,1)],
        Selenium:[this.getValues(Selenium,1)]
    }},
    onModalInputChange:function(e){
        console.log('onModalInputChange')
        console.log('e.target.name ',e.target.name)
        console.log('e.target.value ',e.target.value )
        let {steps,crosssite}=this.state
        let activeRole = crosssite.activeRole
        console.log('steps are ',steps)
        if(crosssite.currentstep===4 ){
            let login_type = steps[1]['login_type'][activeRole]
            console.log('steps[3] ',steps[3])
            steps[3][activeRole][login_type].map((item,index)=>{
                if(item.hasOwnProperty(e.target.name)){
                    steps[3][activeRole][login_type][index][e.target.name]=e.target.value
                }
            })
            console.log('step[3]..... ',steps[3])
        }else{
            if(e.target.name==='userrole'){
                let selectedUserrole = e.target.value
                if(!(steps[0]['userrole'].has(selectedUserrole))){
                    steps[0]['userrole'].add(e.target.value)
                    steps[1]['login_type'][selectedUserrole]=''
                    steps[2]['success_url'][selectedUserrole]=''
                    crosssite.activeRole=selectedUserrole
                    steps[3][selectedUserrole] = this.formAndAddStep3Object(selectedUserrole)
                }else {
                    crosssite.activeRole=selectedUserrole
                }
            }else {
                //login_type
                //success_url
                steps[crosssite.currentstep-1][e.target.name][crosssite.activeRole]=e.target.value
            }
        }
        console.log('onModalInputChange steps are ',steps)
        this.setState({...this.state,steps:steps,crosssite:crosssite})
    },
    openModal:function(){
        if (!(this.is_valid_url(this.state.url))) {
            alert('Enter a valid URL to scan');
            return false;
        }
        console.log('url validated')
        // $(this.refs.modal.getDOMNode()).modal("show");
        // this.setState({...this.state,modalOpen:true})
    },
    closeModal:function(){
        console.log('close event');
        this.setState({...this.state,modalOpen:false,crosssite:{...this.state.crosssite,currentstep:1}})
        //current = 1; Not Needed, otherwise back button wont work
    },
    show: function () {
        alert('show')
        if (!(this.is_valid_url(this.state.url))) {
            alert('Enter a valid URL to scan');
            return false;
        }
        $(this.refs.modal.getDOMNode()).modal("show");
    },
    hide: function () {
        alert('hide')
        $(this.refs.modal.getDOMNode()).modal("hide");
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
            this.setState({...this.state,crosssite:{...this.state.crosssite,currentstep:this.state.crosssite.currentstep - 1}})
        }
        console.log("Inside back button: ", this.state.crosssite.currentstep);
    },
    nextButtonHandle:function(){
        const {currentstep,limit}=this.state.crosssite
        console.log("Inside next button currentstep: ",currentstep);
        if (currentstep) {
            if (!this.canClickNext()) return;
        }
        if(currentstep < limit){
            this.setState({...this.state,crosssite:{...this.state.crosssite,currentstep:currentstep + 1}})
        }
    },
    canClickNext:function(){
        debugger
        if ( this.state.crosssite.currentstep === 1 ) return this.validate_login_role();
        if ( this.state.crosssite.currentstep === 2 ) return this.validateLoginType();
        if ( this.state.crosssite.currentstep === 3 ) return this.validateRedirectURL();
    },

    validateRedirectURL:function(){
        let activeRole = this.state.crosssite.activeRole
        debugger
        return this.is_valid_url(this.state.steps[2]['success_url'][activeRole])
    },

    addMoreParams:function(){
        let steps= [...this.state.steps]
        let activeRole = this.state.crosssite.activeRole
        let login_type = steps[1]['login_type'][activeRole]
        let map ={'Credentials':Credentials,'Cookie':Cookie,'Selenium':Selenium}
        steps[3][activeRole][login_type].push(this.getValues(map[login_type],steps[3][activeRole][login_type].length+1))
        this.setState({...this.state,steps:steps})
    },
    getObjectArraySerialized:function(arrayOfSimpleObjects){
        let str = '';
        arrayOfSimpleObjects.map((item)=>{
            str+=this.getObjectSerialized(item)
        })
        return str
    },
    getObjectSerialized:function(structure){
        let str=''
        Object.keys(structure).map((item,index)=>{
            if(structure.hasOwnProperty(item)) {
                if(Object.keys(this.state.crosssite).indexOf(item)===-1){
                    str+= `${item}=${structure[item]}&`
                }
            }}
        )
        return str
    },
    serialize:function(structure){
        let l =''
        Object.keys(structure).map((item,index)=>{
            if(structure.hasOwnProperty(item)) {
                if (typeof structure[item] !== "object") {
                    if(['modalOpen','login_required'].indexOf(item)===-1){
                        l+=`${item}=${structure[item]}&`
                    }
                }else{
                    if(item==='crosssite'){
                        l+=this.getObjectSerialized(structure[item])
                    }else if(item==='steps'){
                        
                        console.log('structure[item] ',structure[item])
                        structure[item].map((j,i)=> {
                            if ([0,1,2].indexOf(i) !== -1) {
                                l += this.getObjectSerialized(j)
                            } else {
                                Object.keys(structure[item][3]).map((CookieCredSel, indo) => {
                                    if (structure[item][3].hasOwnProperty(CookieCredSel)) {
                                        if (Array.isArray(structure[item][3][CookieCredSel])) {
                                            l += this.getObjectArraySerialized(structure[item][3][CookieCredSel])
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
        return l
    },
    save:function(){
        alert('save')
        let state= {...this.state}
        let hash = this.serialize(state);

        hash = hash.slice(0,hash.length-1)
        console.log('hash is ',hash)
        // crosssite.edit_login = 0;

        const xhr = new XMLHttpRequest();
        // xhr.open('post', 'http://35.167.23.92/scan/save_loginnew');
        xhr.open('post', '/scan/save_loginnew');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success
                console.log(xhr.response)
                console.log('The form is valid');
                alert('The Login Credentials are saved');
                this.setState({...this.state,url_id:data.scan_id})
            } else {
                // failure
                console.log(xhr.response)
                console.log(xhr.response.message)
                // const errors = xhr.response.errors ? xhr.response.errors : {};
                // errors.summary = xhr.response.message;
            }
        });
        xhr.send(hash);
    },
    validate_login_role:function(){return this.state.crosssite.activeRole !==''},
    validateLoginType:function(){
        let activeRole = this.state.crosssite.activeRole
        debugger
        return  (this.state.steps[1]['login_type'][activeRole]!=='')
    },
    is_valid_url:function(url){return (/^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url))},
    /*handleSubmit :function (event) {
        event.preventDefault();
    },*/

    /*$('#mainModal').on('hidden.bs.modal', function(){
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
    EditLoginCredentials:function(e){
        let {crosssite}=this.state
        let userrole=e.target.value
        // crosssite.activeRole = userrole
        // this.crosssite.currentstep = 4
        this.setState({...this.state,crosssite:{...crosssite,activeRole : userrole ,currentstep : 4 }})
    },
    render:function(){
        console.log(this.state)
        const userRoleValues={admin:'Admin',non_admin:'Non Admin',custom_role_1:'Custom Role 1',custom_role_2:'Custom Role 2',no_login:'No Login'}
        const {url,url_id,login_required,service,modalOpen,steps,crosssite}=this.state
        let activeRole = crosssite.activeRole
        let login_type = activeRole ? steps[1]['login_type'][crosssite.activeRole] : ''
        let success_url = activeRole ? steps[2]['success_url'][crosssite.activeRole] : ''
        // let success_url= steps[2]['success_url'][crosssite.activeRole]
        let cookieSelCred =  activeRole ? steps[3][crosssite.activeRole] : {}
        /*let logincount;
        if ( crosssite.edit_login ) {
            logincount = crosssite.edit_login;
        }else {
            logincount = jQuery("ul#addedLoginList li").length;
            logincount++;
            (<li>
                <button type = "button" class = "btn btn-primary edit_login" id=`edit-login${logincount}`>`Edit ${activeRole} Login Credentials`</button>
                <div id=`login${logincount}`></div>
            </li>)
        }
        jQuery("#add-another-login").show();
*/

        return(
            <div className="col-sm-9">
                <div className="form-group">
                    <form action="" method="post" className="form-inline">
                        <label htmlFor="urlid" className="control-label">URL</label>
                        <input type="text" size="50" name="url" id="urlid" value={url} placeholder="https://www.google.com" className="form-control" onChange={ this.handleChange }/>
                        <input type="hidden" name="url_id" value={url_id} id="urlid1" onChange={ this.handleChange }/>
                        <input type="hidden" name="userrole" value={activeRole} onChange={ this.handleChange }/>
                        <input type="hidden" name="service" value={service} onChange={ this.handleChange }/>
                        <h>{login_required}</h>
                        <input type="checkbox" label={login_required} name="login_required" id="loginrequired" checked={login_required} onChange={ this.handleChange }/>Login Required?
                        {login_required && (
                            <button type="button" className="btn btn-primary" onClick={ this.show }>Add Login Credentials</button>
                            // <button type="button" className="btn btn-primary" id="mainmodalbutton" data-toggle="modal" data-target="#mainModal" onClick={ this.openModal }>Add Login Credentials</button>
                        )}
                        <input type="submit" className="btn btn-primary" value="Scan"/>
                    </form>
                    {/*{modalOpen ? this.getModal() : null}*/}
                    <div>
                        {/*{modalOpen ? this.bootstrapOriginalModal() : null}*/}
                        {/*{modalOpen &&*/
                            // <div id="mainModal" className="modal fade" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true" role="dialog">
                        }
                        (

                            <div id="mainModal" ref="modal" className="modal fade">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" onClick={this.closeModal}>&times;</button>
                                            <h4 className="modal-title">Add Login Credentials</h4>
                                        </div>
                                        <div className="modal-body">
                                            <div className="addedLogin">
                                                <ul id="addedLoginList" className="list-unstyled list-inline">
                                                    {[...steps[0]['userrole']].map((item,index)=>
                                                        (<li key={index}>
                                                            <Button className = {"btn btn-primary edit_login"} name={`Edit ${userRoleValues[item]} Login Credentials`} handleClick={this.EditLoginCredentials}/>
                                                        </li>)
                                                    )}
                                                </ul>
                                            </div>
                                            {crosssite.currentstep  === 1 &&
                                                (<UserRoleComponent activeRole={activeRole} userRoleValues={userRoleValues} onModalInputChange ={this.onModalInputChange}/>)}
                                            {crosssite.currentstep  === 2 &&
                                                (<LoginTypeComponent login_type={login_type} onModalInputChange ={this.onModalInputChange}/>)}
                                            {crosssite.currentstep  === 3 &&
                                                (<SuccessURLComponent success_url={success_url} onModalInputChange = {this.onModalInputChange}/>)}
                                            {crosssite.currentstep  === 4 &&
                                                (<LoginDetailsComponent login_type={login_type} data = {cookieSelCred} addMoreParams={this.addMoreParams} onModalInputChange={this.onModalInputChange} save={this.save}/>)}
                                        </div>
                                        <div className="modal-footer">
                                            {(crosssite.currentstep > 1) && <Button className="action back btn-primary" name={"Back"} handleClick={this.backButtonHandle}/>}
                                            {((crosssite.currentstep < crosssite.limit) && (crosssite.currentstep !== crosssite.limit)) && <Button className="action next btn-primary" name={"Next"} handleClick={this.nextButtonHandle}/>}
                                            {<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>}
                                            {/*{(this.state.crosssite.currentstep === this.state.crosssite.limit) && <button type="button" className="btn btn-default" data-dismiss="modal">Submit button created by vikas</button>}*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        { /*}*/}
                    </div>
                </div>
            </div>
        )
    }
})

ReactDOM.render(<Root/>, document.getElementById('root'));

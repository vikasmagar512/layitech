
const Button = React.createClass({
    render: function() {
        return (<button className={this.props.className} onClick={this.props.handleClick}>{this.props.name}</button>)
    }
});
const Cookie = {cookie_name: '', cookie_path: '', cookie_domain: '', cookie_value: ''};
const Credentials = {param: '', value: ''};
const Selenium = {sel_cmd: ''};

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
                        Cookie:[this.getValues(Cookie,1)],
                        Credentials:[this.getValues(Credentials,1)],
                        Selenium:[this.getValues(Selenium,1)],
                    }
                ],
                modalOpen:false,
                crosssite : { currentstep: 1, limit: 4, edit_login: 0 }
        };
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

    handleChange :function (e) {
        if(e.target.name==='login_required'){
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
        
        console.log('onModalInputChange')
        console.log('e.target.name ',e.target.name)
        console.log('e.target.value ',e.target.value )
        let {steps,crosssite}=this.state
        let login_type =steps[0]['login_type']
        console.log('steps are ',steps)
        if(crosssite.currentstep===3 ){
            
            console.log('steps[2][steps[0][login_type',steps[2][login_type])
            steps[2][login_type].map((item,index)=>{
                if(item.hasOwnProperty(e.target.name)){
                    steps[2][login_type][index][e.target.name]=e.target.value
                }
            })
            console.log('step[2]..... ',steps[2])
        }else{
            
            steps[crosssite.currentstep-1][e.target.name]= e.target.value
        }
        console.log('onModalInputChange steps are ',steps)
        this.setState({...this.state,steps:steps})
    },
    openModal:function () {
        
        this.setState({...this.state,modalOpen:true})
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
    canClickNext:function () {
        return this.state.crosssite.currentstep === 1 ? this.validateLoginType() : this.validateRedirectURL()
    },

    validateRedirectURL:function () {
        return this.is_valid_url(this.state.steps[1]['success_url'])
    },

    addMoreParams:function () {
        let steps= [...this.state.steps]
        let login_type = steps[0]['login_type']
        let map ={'Credentials':Credentials,'Cookie':Cookie,'Selenium':Selenium}
        steps[2][login_type].push(this.getValues(map[login_type],steps[2][login_type].length+1))
        this.setState({...this.state,steps:steps})
    },
    getObjectArraySerialized:function (arrayOfSimpleObjects) {
        let str = '';
        arrayOfSimpleObjects.map((item)=>{
            str+=this.getObjectSerialized(item)
        })
        return str
    },
    getObjectSerialized:function (structure) {
        let str=''
        Object.keys(structure).map((item,index)=>{
            if(structure.hasOwnProperty(item)) {
                // if(['currentstep','limit','edit_login'].indexOf(item)===-1){
                if(Object.keys(this.state.crosssite).indexOf(item)===-1){
                    str+= `${item}=${structure[item]}&`
                }
            }}
        )
        return str
    },
    serialize:function (structure) {
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
                            if ([0, 1].indexOf(i) !== -1) {
                                l += this.getObjectSerialized(j)
                            } else {
                                Object.keys(structure[item][2]).map((CookieCredSel, indo) => {
                                    if (structure[item][2].hasOwnProperty(CookieCredSel)) {
                                        if (Array.isArray(structure[item][2][CookieCredSel])) {
                                            l += this.getObjectArraySerialized(structure[item][2][CookieCredSel])
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
    save:function () {
        alert('save')
        let state= {...this.state}
        let hash = this.serialize(state);

        hash = hash.slice(0,hash.length-1)
        console.log('hash is ',hash)
        // crosssite.edit_login = 0;

        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://35.167.23.92/scan/save_loginnew');
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
    validateLoginType:function () {
        return  (this.state.steps[0]['login_type']!=='')
    },
    is_valid_url:function(url) {
        return /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
    },
    /*handleSubmit :function (event) {
        event.preventDefault();
    },*/
    closeModal:function () {
        console.log('close event');
        this.setState({...this.state,crosssit:{...this.state.crosssite,currentstep:1}})
        //current = 1; Not Needed, otherwise back button wont work
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
        const {url,url_id,userrole,login_required,service,modalOpen,steps,crosssite}=this.state
        let login_type = steps[0]['login_type']
        const k =['Password','Cookie','Xpath'];

        
        return(
            <div className="col-sm-9">
                <div className="form-group">
                    <form action="" method="post" className="form-inline">
                        <label htmlFor="urlid" className="control-label">URL</label>
                        <input type="text" size="50" name="url" id="urlid" value={url} placeholder="https://www.google.com" className="form-control" onChange={ this.handleChange }/>
                        <input type="hidden" name="url_id" value={url_id} id="urlid1" onChange={ this.handleChange }/>
                        <input type="hidden" name="userrole" value={userrole} onChange={ this.handleChange }/>
                        <input type="hidden" name="service" value={service} onChange={ this.handleChange }/>
                        <h>{login_required}</h>
                        <input type="checkbox" label={login_required} name="login_required" id="loginrequired" checked={login_required} onChange={ this.handleChange }/>Login Required?
                        {login_required && (
                            <button type="button" className="btn btn-primary" id="mainmodalbutton" data-toggle="modal" data-target="#mainModal" onClick={ this.openModal }>Add Login Credentials</button>
                        )}
                        <input type="submit" className="btn btn-primary" value="Scan"/>
                    </form>
                    {/*{modalOpen ? this.getModal() : null}*/}
                    <div>
                        {/*{modalOpen ? this.bootstrapOriginalModal() : null}*/}
                        {modalOpen &&
                        (
                            <div id="mainModal" className="modal fade" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true" role="dialog">
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
                                            {crosssite.currentstep  === 1 &&
                                            (<div className="step 1 step1">
                                                Login Type
                                                {steps[0].login_type==='' && (
                                                    <div className="alert alert-danger fade in" id="loginTypeError">Please select login type</div>)}
                                                {["Credentials","Cookie","Selenium"].map((item,index)=>{
                                                    return (
                                                        <div className="radio" key={index}>
                                                            <label>
                                                                <input type="radio" name="login_type" value={item}
                                                                       checked={login_type===item}
                                                                       onChange={this.onModalInputChange}/>{k[index]}</label>
                                                        </div>
                                                    )
                                                })}
                                            </div>)}
                                            {crosssite.currentstep  === 2 &&
                                            (<div className="step 2 step2">
                                                {steps[1]['success_url']==='' && (<div className="alert alert-danger fade in" id="successURLError" >Please enter valid success URL</div>)}
                                                URL if the user logged in successfully
                                                {/*<input type="text" name="success_url" size="30" value={this.state.steps[1]['success_url']} className="form-control" onChange={this.onModalInputChange}/>*/}
                                                <input type="text" name="success_url" size="30" value={"www.google.com"} className="form-control" onChange={this.onModalInputChange}/>
                                            </div>)}
                                            {crosssite.currentstep  === 3 &&
                                            (<div className="step 3 step3">
                                                {login_type === "Credentials" &&
                                                (<div id="login-param-div">
                                                    <p>Add Login Parameters: ie the username and password to login to the site. </p>
                                                    <p>Enter the name of the parameter in login form in the param field, Enter the value
                                                        of the parameter in value field). For example if the username parameter is named
                                                        username in login form, enter username in param field, and actual username value
                                                        in value field.</p>
                                                    <ul id="login-param-list" className="list-unstyled">
                                                        {steps[2]['Credentials'].map((cookie, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <label htmlFor={"param" + (index + 1)} className="control-label">{"Param " + (index + 1)}</label>
                                                                    <input type="text" size="10" name={"param" + (index + 1)} value={cookie['param']}
                                                                           className="form-control" onChange={this.onModalInputChange}
                                                                           id={"param-" + (index + 1)}/>
                                                                    <label htmlFor={"value" + (index + 1)} className="control-label">{"Value " + (index + 1)}</label>
                                                                    <input type="text" size="10" name={"value" + (index + 1)} value={cookie['value']}
                                                                           className="form-control" onChange={this.onModalInputChange}
                                                                           id={"value-" + (index + 1)}/>
                                                                </li>)
                                                        })
                                                        }
                                                        </ul>
                                                </div>)}
                                                {login_type === "Cookie" &&
                                                    (<div id="cookie-param-div">
                                                        <ul id="cookie-param-list" className="list-unstyled">
                                                            {steps[2]['Cookie'].map((cookie,index)=>{
                                                               return (
                                                                   <li key={index}>
                                                                       <label htmlFor={!index ? "cookie_name" : "cookie_name" + (index + 1) + 1} className="control-label">{!index ? "Cookie" : "Cookie " + (index +1) }</label>
                                                                       <input type="text" size="10" name={"cookie_name"+(index + 1)} value={cookie[`cookie_name${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-name-" : "cookie-name-" + (index + 1) } onChange={this.onModalInputChange}/>
                                                                       <label htmlFor={!index ? "admin_cookie_value" : "cookie_value" + (index + 1) + 1 } className="control-label">{!index ? "Value" : "Value " + (index+1) }</label>
                                                                       <input type="text" size="10" name={"cookie_value"+(index + 1)} value={cookie[`cookie_value${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-value-" : "cookie-value-" + (index + 1) } onChange={this.onModalInputChange}/>
                                                                       <label htmlFor={!index ? "admin_cookie_domain" : "cookie_domain" + (index + 1) + 1 } className="control-label">{!index ? "Domain" : "Domain " + (index+1) }</label>
                                                                       <input type="text" size="10" name={"cookie_domain"+(index + 1)} value={cookie[`cookie_domain${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-domain-" : "cookie-domain-" + (index + 1) } onChange={this.onModalInputChange}/>
                                                                       <label htmlFor={!index ? "admin_cookie_path" : "cookie_path" + (index + 1) + 1 } className="control-label">{!index ? "Path" : "Path " + (index+1) }</label>
                                                                       <input type="text" size="10" name={"cookie_path"+(index + 1)} value={cookie[`cookie_path${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-path-" : "cookie-path-" + (index + 1) } onChange={this.onModalInputChange}/>
                                                                   </li>
                                                               )
                                                            })}
                                                        </ul>

                                                    </div>)}
                                                {login_type === "Selenium" &&
                                                (<div id="selenium-param-div">
                                                    <ul id="selenium-param-list" className="list-unstyled">
                                                        {steps[2]['Selenium'].map((sel,index)=>{
                                                            return (
                                                                <li key={index}>
                                                                    <label htmlFor={"sel_cmd" + (index + 1) + 1} className="control-label">{"Xpath " + (index +1) }</label>
                                                                    <input type="text" size="10" name={"sel_cmd"+(index + 1)} value={sel[`sel_cmd${(index+1)}`]} className="form-control" id={"sel-cmd" + (index + 1) } onChange={this.onModalInputChange}
                                                                    />
                                                                </li>
                                                            )
                                                        })}

                                                    </ul>
                                                </div>)}
                                                <Button className = {"btn btn-primary"} name={"Add More Param"} id={"add-param"} handleClick={this.addMoreParams}/>
                                                <Button className = {"btn btn-primary"} name={"Save"} id={"add-param-save"}  handleClick={this.save}/>
                                                <button className="btn btn-primary" id="add-another-login" style={{display:"none"}}>Add Another Login Credentials</button>
                                            </div>)}

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
                        }
                    </div>
                </div>
            </div>
        )
    }
})

ReactDOM.render(<Root/>, document.getElementById('root'));

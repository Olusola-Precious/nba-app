import React,{Component} from 'react';
import styles from './signin.module.css';
import FormField from '../widgets/FormFields/formfields';
import {firebase} from '../../firebase';

class SignIn extends Component{
    state ={
        registerError:'',
        loading:false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your Email',
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:'',

            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your Password',
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                touched: false,
                validationMessage: '',

            }
        }
    }


    updateForm(element){
        const newFormdata={
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;

        if (element.blur) {
            let validData = this.validate(newElement);
            //console.log(validData);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1]
        }

        newElement.touched = element.blur;
        newFormdata[element.id]=newElement;

        //console.log(newFormdata);
        this.setState({
            formdata:newFormdata
        })
    }


    validate(elem){
        let error=[true,''];
        
        if (elem.validation.email) {
            const valid = /\S+@\S+\.\S+/.test(elem.value);
            const message = `${!valid ? "Must be a valid email" : ""}`
            error = !valid ? [valid, message] : error
        }

        if (elem.validation.password) {
            const valid = elem.value.length > 5;
            const message = `${!valid ? "Must be greater than 5" : ""}`
            error = !valid ? [valid, message] : error
        }
        if(elem.validation.required){
            const valid = elem.value.trim() !== '';
            const message = `${!valid ? "This Field is required":""}`
            error = !valid ? [valid,message]:error
        }

        return error;
    }

    submitButton(){
        return this.state.loading ? 
        "Loading...":
        <div className={styles.btns}>
            <button onClick={(event)=>this.submitForm(event,false)}>Register Now</button>
                <button onClick={(event) => this.submitForm(event, true)}>Log in</button>
        </div>
    }


    submitForm(event,type){
        event.preventDefault();
        if(type !== null){
            let dataTosubmit = {};
            let formIsValid = true;

            for(let key in this.state.formdata){
                dataTosubmit[key] = this.state.formdata[key].value;
            }

            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid
            }

            if (formIsValid){
                //console.log(dataTosubmit);
                this.setState({
                    loading:true,
                    registerError:''
                })
                if(type){
                    // console.log("Login")
                    firebase.auth().signInWithEmailAndPassword(
                        dataTosubmit.email,
                        dataTosubmit.password
                    ).then(() => {
                        this.props.history.push('/')
                    }).catch((err) => {
                        this.setState(
                            {
                                loading: false,
                                registerError: err.message
                            }
                        )
                    });

                }else{
                    firebase.auth().createUserWithEmailAndPassword(
                        dataTosubmit.email,
                        dataTosubmit.password
                    ).then(()=>{
                        this.props.history.push('/')
                    }).catch((err)=>{
                        this.setState(
                            {
                                loading:false,
                                registerError:err.message
                            }
                        )
                    });

                }

            }



        }
    }

    showError(){
        return this.state.registerError !== '' ?
            <div className={styles.registerError}>
                {this.state.registerError}
            </div>
            :
            ''
    }
        
    

    render(){
        return (
        <div className={styles.logContainer}>    
                <h2>Register - Log in</h2>
            <form onSubmit={(event)=>this.submitForm(event,null)}>
                
                <FormField 
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element)=>this.updateForm(element)}
                />

                <FormField
                    id={'password'}
                    formdata={this.state.formdata.password}
                    change={(element) => this.updateForm(element)}
                />

                { this.submitButton() }
                { this.showError() }

            </form>
        </div>
        )
    }
}


export default SignIn;
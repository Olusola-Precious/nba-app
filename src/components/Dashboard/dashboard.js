import React,{Component} from 'react';
import FormField from '../widgets/FormFields/formfields';
import style from './dashboard.module.css';
import {firebaseArticles, firebaseTeams,firebase} from '../../firebase';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import Uploader from '../widgets/FileUploader/fileuploader';

class Dashboard extends Component{
    state = {
        editorState:EditorState.createEmpty(),
        postError: '',
        loading: false,
        formdata:{
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'Enter your Name',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',

            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter post title',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',

            },
            body:{
                element: 'texteditor',
                value: '',
                valid: true,

            },
            image: {
                element: 'image',
                value: '',
                valid: true,

            },
            team: {
                element: 'select',
                value: '',
                config: {
                    name: 'team_input',
                    options:[]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',

            },
        }

    }

    componentDidMount(){
        this.loadTeams()
    }

    loadTeams = ()=>{
        firebaseTeams.once('value')
        .then((snapshot)=>{
            let team = [];

            snapshot.forEach((childSnapshot)=>{
                team.push({
                    id:childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })

            const newFormdata = {...this.state.formdata};
            const newElement = {...newFormdata['team']};
            // console.log(newElement)
            newElement.config.options = team;
            newFormdata['team'] = newElement;
            
            this.setState({
                formdata:newFormdata
            })

        })
    }



    updateForm(element, content='') {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }

        if(content === ''){
            newElement.value = element.event.target.value;
        }
        else{
            newElement.value = content;
        }
        

        if (element.blur) {
            let validData = this.validate(newElement);
            //console.log(validData);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1]
        }

        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;

        //console.log(newFormdata);
        this.setState({
            formdata: newFormdata
        })
    }

    validate(elem) {
        let error = [true, ''];

        if (elem.validation.required) {
            const valid = elem.value.trim() !== '';
            const message = `${!valid ? "This Field is required" : ""}`
            error = !valid ? [valid, message] : error
        }

        return error;
    }

    submitButton() {
        return this.state.loading ?
            "Loading..." :
            <div>
                <button type="submit">Add Post</button>
            </div>
    }



    submitForm = (event)=>{
        event.preventDefault();
        let dataTosubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataTosubmit[key] = this.state.formdata[key].value;
        }

        for (let key in this.state.formdata) {
            formIsValid = this.state.formdata[key].valid && formIsValid
        }

        
        

        if (formIsValid){
            this.setState({
                loading:true,
                postError:''
            })
            console.log("For is Valid");

            firebaseArticles.orderByChild("id")
                .limitToLast(1).once('value').then((snapshot)=>{
                    let articleId=null;
                    snapshot.forEach(childSnapshot=>{
                        articleId=childSnapshot.val().id;
                    })
                    dataTosubmit['date']=firebase.database.ServerValue.TIMESTAMP;
                    dataTosubmit['id'] = articleId+1;
                    dataTosubmit['team']=parseInt(dataTosubmit['team'],10);

                    //console.log(dataTosubmit);
                    firebaseArticles.push(dataTosubmit).then(article=>{
                        this.props.history.push(`/articles/${article.key}`)
                    }).catch(err=>{
                        this.setState({
                            postError:err.message
                        })
                    })
                })
        }else{
            console.log(this.state.formdata)
            this.setState({
                postError:'Something Went Wrong'
            })
        }

    }

    showError() {
        return this.state.postError !== '' ?
            <div>
                {this.state.postError}
            </div>
            :
            ''
    }


    onEditorStateChange = (editorState)=>{
        let contentState = editorState.getCurrentContent();
        //let rawState = convertToRaw(contentState);

        let html = stateToHTML(contentState);
        
        this.updateForm({ id: 'body' }, html)
        this.setState({
            editorState
        })
    }

    storeFileName =(filename)=> {
        this.updateForm({id:"image"},filename)
    }

    render(){
        return (
            <div className={style.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>
                    <Uploader
                        setFilename = {(filename)=>this.storeFileName(filename)}
                    />

                    <FormField
                        id={'author'}
                        formdata={this.state.formdata.author}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'title'}
                        formdata={this.state.formdata.title}
                        change={(element) => this.updateForm(element)}
                    />

                    <Editor 
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <FormField
                        id={'team'}
                        formdata={this.state.formdata.team}
                        change={(element) => this.updateForm(element)}
                    />

                    {this.submitButton()}
                    {this.showError()}
                </form>

            </div>
        )
    }
    
}


export default Dashboard;
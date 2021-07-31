import React from 'react';
import styles from './formfields.module.css';


const Formfields = ({formdata,id,change}) => {
    const showError = ()=>{
        let errormessage = null;
        if(formdata.validation && !formdata.valid){
            errormessage = (
                <div className={styles.labelError}>
                    {formdata.validationMessage}
                </div>
            )
        }
        return errormessage;
    }
    
    const renderTemplate = () =>{
        let formtemplate = null;

        switch(formdata.element){
            case('input'):
                formtemplate = (
                    <div>
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event)=>change({event, id, blur:false})}
                        />
                        {showError()}
                    </div>
                )
                break;
            
            case ('select'):
                formtemplate = (
                    <div>
                        <select 
                            value={formdata.value}
                            name={formdata.name}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id, blur: false })}
                        >
                            {formdata.config.options.map((item,i)=>(
                            <option key={i} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        {showError()}
                    </div>
                )
                break;

            default:
                formtemplate = null;
        }

        return formtemplate
    }
    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default Formfields;
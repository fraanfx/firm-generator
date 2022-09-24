import React, { useState, useEffect } from "react";
import Signature from '../components/firm'
import '../index.css'
import { getValue } from "@testing-library/user-event/dist/utils";

 
export interface SignatureProps {
    fullName: string;
    position: string;
    mail: string;
    phone: string;
    calendarLink: string;
    prefix: string;
    
}


interface State extends SignatureProps {
    withPhone: boolean;
    withCalendar: boolean;
    copied: boolean;
    progress: number;
   
}

const initialState: State = {
    fullName: "",
    position: "",
    mail: "",
    phone: "",
    calendarLink: "",
    prefix: "",
    progress: 100,
    withPhone: false,
    withCalendar: false,
    copied: false,
};

 export function UISignature () {
    const [state, setState] = React.useState<State>(
        JSON.parse(localStorage.getItem("firm") || '{}') || initialState
        )

 React.useEffect(() => {
    localStorage.setItem("firm", JSON.stringify(state))
 })


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "withPhone" || event.target.name === "withCalendar") {
            setState((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.checked,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
            }))
        }
    };
   
    const clearState =()=> setState(initialState);
    const isStateChanged = () => {
        return JSON.stringify(state) === JSON.stringify(initialState);
    };
const enoughData = () => {
    
   
    
    
    if (state.withCalendar && state.withPhone){
        if(
           state.fullName &&
           state.position &&
           state.mail &&
           state.phone &&
           state.calendarLink
        ){
            return(
            <Signature  
                fullName={state.fullName} 
                position={state.position} 
                mail={state.mail} 
                phone={state.phone} 
                prefix="M. "
                calendarLink={state.calendarLink}  
            />

            )
        }else {
            Object.entries(state).forEach(([key, value]) => {
                if(
                    ["fullName", "position", "mail", "phone", "calendarLink"].includes(key)
                ) {
                    if(getValue.length === 0){
                            state.progress = state.progress -20;
                        
                    }
                }
            });
            return(
                <>
                        <p>Introduce más datos para visualizar tu firma</p>
                </>
                
            )
        }
    } else if (state.withCalendar){
            if(
               state.fullName &&
               state.position &&
               state.mail &&
               state.calendarLink
            ){
                return(
                    <Signature  
                        fullName={state.fullName} 
                        position={state.position} 
                        mail={state.mail} 
                        prefix="T. "
                        phone="902 026 289" 
                        calendarLink={state.calendarLink}  
                    />
                )
            }else {
                Object.entries(state).forEach(([key, value]) => {
                    if(
                        ["fullName", "position", "mail", "calendarLink"].includes(key)
                    ) {
                        if(getValue.length === 0){
                            state.progress = state.progress -25;
                        }
                    }
                });
                return(
                    <>
                        <p>Introduce más datos para visualizar tu firma</p>
                    </>
                )
            }
        
    }else if(state.withPhone){
            if(
               state.fullName &&
               state.position &&
               state.mail &&
               state.phone
            ){
                return(
                    <Signature  
                    fullName={state.fullName} 
                    position={state.position} 
                    mail={state.mail} 
                    prefix="M. "
                    phone={state.phone} 
                    calendarLink="none"  
                />
                )
            }else {
                Object.entries(state).forEach(([key, value]) => {
                    if(
                        ["fullName", "position", "mail", "phone"].includes(key)
                    ) {
                        if(getValue.length === 0){
                            state.progress = state.progress -25;
                        }
                    }
                });
                return(
                    <>
                        <p>Introduce más datos para visualizar tu firma</p>
                    </>
                    
                )
            }
            

    }
    else{
        if(
            state.fullName &&
            state.position &&
            state.mail 
            
         ){
             return(
            <Signature  
                 fullName={state.fullName} 
                 position={state.position} 
                 mail={state.mail} 
                 prefix="T. "
                 phone="902 026 289" 
                 calendarLink="none"  
             />
             )
         }else {
             Object.entries(state).forEach(([key, value]) => {
                 if(
                     ["fullName", "position", "mail"].includes(key)
                 ) {
                     if(getValue.length === 0){
                         state.progress = state.progress -33;
                     }
                 }
             });
         }
         return(
            <>
                        <p>Introduce más datos para visualizar tu firma</p>
            </>
        )

    }
}



const copyToClipboard = () => {
    let copyText = document.querySelector(".signature");
    const range = document.createRange();
    if (copyText) {
        range.selectNode(copyText);
    }
    const windowSelection = window.getSelection();
    if (windowSelection) {
        windowSelection.removeAllRanges();
        windowSelection.addRange(range);
    }
    try {
        let successful = document.execCommand("copy");
        console.log(successful ? "Success" : "Fail");
        setState((prevState) => ({
            ...prevState,
            copied: true,
        }));
    } catch (err) {
        console.log("Fail");
    }
};





return(
    <>
        <div className="container column">
                <div className="header">
                    <img className="img-logo" src="https://drive.google.com/uc?export=view&id=1yUARIdUsS9RT9ydAqvuBHOssTxxq1jwF"/>
                    <p>Signature generator</p>
                </div>

                <div className="columns">
                    <div className="form-column">
                        <form action="">
                        <input 
                            type="text"
                            placeholder="Tu nombre aquí"
                            className="form--input"
                            name="fullName"
                            value={state.fullName}
                            onChange={handleChange}
                        /> 

                        <input 
                            type="text"
                            placeholder="Tu cargo aquí"
                            className="form--input"
                            name="position"
                            value={state.position}
                            onChange={handleChange}
                        />  
                       <div className="check--group">
                        <input className="check--input" 
                            type="checkbox"
                            id="isPhoneChecked"
                            name="withPhone"
                            checked={state.withPhone}
                            onChange={handleChange}

                        />
                        <label className="check--label" htmlFor="isPhoneChecked">{state.withPhone ? "Móvil de empleado" : "Sin móvil de empleado"}</label>
                      
                        </div> 
                        
                        {state.withPhone &&(
                                <input 
                                type="text"
                                placeholder="Tu número de móvil aquí"
                                className="form--input"
                                name="phone"
                                value={state.phone}
                                onChange={handleChange}
                            />    
                        )
                        }
                        <input 
                            type="text"
                            placeholder="Tu email aquí"
                            className="form--input"
                            name="mail"
                            value={state.mail}
                            
                            onChange={handleChange}
                        />  





                        <div className="check--group">
                        <input className="check--input" 
                            type="checkbox"
                            id="isCalendarChecked"
                            name="withCalendar"
                            checked={state.withCalendar}
                            onChange={handleChange}
                        />
                         <label className="check--label" htmlFor="isCalendarChecked">{state.withCalendar ? "Enlace de reunion google meet" : "Sin enlace de reunión"}</label>
                        </div>
                        
                       
                        
                        {state.withCalendar &&(

                                <input 
                                        type="text"
                                        placeholder="Link reunión"
                                        className="form--input"
                                        name="calendarLink"
                                        value={state.calendarLink}
                                        onChange={handleChange}
                                />    
                                    
                        )
                        
                        } 
                        <div className="container-buttons">
                              
                            <a className="button-style" onClick={copyToClipboard}>Copiar firma</a> 
                            <a className="button-style" href="http://gmail.com/#settings/general" target="_blank" rel="noreferrer">Cambiar firma</a>                      
                            <button className="button-style borrar"  onClick={clearState}>Borrar datos</button>
                        </div> 
                         </form>
                    </div>
                    <div className="signature-column">
                        <div className="progress">
                            {/*actualProcess*/}
                        </div>
                        {enoughData()}
                    </div>
                </div>

               
        </div>
        <div className='footer-sutil'>
          <p>Made with <span className='heart'> &#129293;</span>  from Catarsis Factory</p>
      </div> 
        
    </>
)



 }

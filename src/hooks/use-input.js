import { useState } from "react";

// Eigener Hook zur Auswertung des Inputs der Formularfelder und Reset auf leer nach Absenden

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    
    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    };
    
    const inputBlurHandler = (event) => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        value: enteredValue, // eingegebener Wert
        isValid: valueIsValid, // Überprüfung auf Richtigkeit
        hasError, // fehlerhafter Input zum Anzeigen einer Fehlermeldung
        valueChangeHandler, // Veränderung am Input
        inputBlurHandler, // wenn Input Feld Fokus verliert, sprich nicht mehr angewählt ist
        reset, // Eingabewert zurücksetzen
    };
};

export default useInput;
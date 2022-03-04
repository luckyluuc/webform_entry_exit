import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";

const ExitForm = (props) => {
  const {
    value: dateOfExitValue,
    isValid: dateOfExitIsValid,
    hasError: dateOfExitHasError,
    valueChangeHandler: dateOfExitChangeHandler,
    inputBlurHandler: dateOfExitBlurHandler,
    reset: resetDateOfExit,
  } = useInput(isNotEmpty);

  const {
    value: lastWorkdayValue,
    isValid: lastWorkdayIsValid,
    hasError: lastWorkdayHasError,
    valueChangeHandler: lastWorkdayChangeHandler,
    inputBlurHandler: lastWorkdayBlurHandler,
    reset: resetLastWorkday,
  } = useInput(isNotEmpty);

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    dateOfExitIsValid &&
    lastWorkdayIsValid &&
    firstNameIsValid &&
    lastNameIsValid
  ) {
    formIsValid = true;
  }

  const dateOfExitClasses = dateOfExitHasError
    ? "form-control invalid"
    : "form-control";
  const lastWorkdayClasses = lastWorkdayHasError
    ? "form-control invalid"
    : "form-control";
  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";

  async function addInputHandler(exit) {
    const response = await fetch(
      "https://webform-entry-exit-default-rtdb.firebaseio.com/exit.json",
      {
        method: "POST",
        body: JSON.stringify(exit),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const dateOfExit = dateOfExitValue;
    const lastWorkday = lastWorkdayValue;
    const firstName = firstNameValue;
    const lastName = lastNameValue;

    const exit = {
      dateOfExit,
      lastWorkday,
      firstName,
      lastName,
    };

    addInputHandler(exit);

    resetDateOfExit();
    resetLastWorkday();
    resetFirstName();
    resetLastName();
  };

  return (
    <form onSubmit={submitHandler}>
      <h1 className="form-control">Austritt</h1>
      <div className="control-group-exit">
        <div className={dateOfExitClasses}>
          <label>Austrittsdatum</label>
          <input
            type="date"
            id="dateOfExit"
            value={dateOfExitValue}
            onChange={dateOfExitChangeHandler}
            onBlur={dateOfExitBlurHandler}
          />
          {dateOfExitHasError && (
            <p className="error-text">Bitte Datum auswählen.</p>
          )}
        </div>
        <div className={lastWorkdayClasses}>
          <label>Letzter Arbeitstag</label>
          <input
            type="date"
            id="lastWorkday"
            value={lastWorkdayValue}
            onChange={lastWorkdayChangeHandler}
            onBlur={lastWorkdayBlurHandler}
          />
          {lastWorkdayHasError && (
            <p className="error-text">Bitte Datum auswählen.</p>
          )}
        </div>
      </div>
      <div className="control-group-exit">
        <div className={firstNameClasses}>
          <label htmlFor="name">Vorname</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">Bitte Vorname eingeben.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Nachname</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Bitte Nachname eingeben.</p>
          )}
        </div>
      </div>
      <div className="form-actions">
        <button type="button" onClick={props.onCancel}>
          Zurück
        </button>
        <button disabled={!formIsValid}>Senden</button>
      </div>
    </form>
  );
};

export default ExitForm;

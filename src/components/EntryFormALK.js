import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@syna.ch");
const isPhonenumber = (value) =>
  value.match(/^\(?([0-9]{3})\)?[ ]?([0-9]{3})[ ]?([0-9]{2})[ ]?([0-9]{2})$/); // Überprüfung ob Input Format XXX XXX XX XX oder XXXXXXXXXX entspricht

const EntryFormALK = (props) => {
  const {
    value: dateOfEntryValue,
    isValid: dateOfEntryIsValid,
    hasError: dateOfEntryHasError,
    valueChangeHandler: dateOfEntryChangeHandler,
    inputBlurHandler : dateOfEntryBlurHandler,
    reset: resetdateOfEntry,
  } = useInput(isNotEmpty);

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler : titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler : firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler : lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: mailValue,
    isValid: mailIsValid,
    hasError: mailHasError,
    valueChangeHandler: mailChangeHandler,
    inputBlurHandler : mailBlurHandler,
    reset: resetMail,
  } = useInput(isEmail);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler : phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isPhonenumber);

  const {
    value: workplaceValue,
    isValid: workplaceIsValid,
    hasError: workplaceHasError,
    valueChangeHandler: workplaceChangeHandler,
    inputBlurHandler : workplaceBlurHandler,
    reset: resetWorkplace,
  } = useInput(isNotEmpty);

  const {
    value: roleValue,
    isValid: roleIsValid,
    hasError: roleHasError,
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler : roleBlurHandler,
    reset: resetRole,
  } = useInput(isNotEmpty);

  const {
    value: distributionListValue,
    isValid: distributionListIsValid,
    hasError: distributionListHasError,
    valueChangeHandler: distributionListChangeHandler,
    inputBlurHandler : distributionListBlurHandler,
    reset: resetDistributionList,
  } = useInput(isNotEmpty);

  const {
    value: driveValue,
    isValid: driveIsValid,
    hasError: driveHasError,
    valueChangeHandler: driveChangeHandler,
    inputBlurHandler : driveBlurHandler,
    reset: resetDrive,
  } = useInput(isNotEmpty);

  const {
    value: sendLoginValue,
    isValid: sendLoginIsValid,
    hasError: sendLoginHasError,
    valueChangeHandler: sendLoginChangeHandler,
    inputBlurHandler : sendLoginBlurHandler,
    reset: resetSendLogin,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    dateOfEntryIsValid &&
    titleIsValid &&
    firstNameIsValid &&
    lastNameIsValid &&
    mailIsValid &&
    phoneIsValid &&
    workplaceIsValid &&
    roleIsValid &&
    distributionListIsValid &&
    driveIsValid &&
    sendLoginIsValid
  ) {
    formIsValid = true;
  }

  const dateOfEntryClasses = dateOfEntryHasError
    ? "form-control invalid"
    : "form-control";
  const titleClasses = titleHasError ? "form-control invalid" : "form-control";
  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const mailClasses = mailHasError ? "form-control invalid" : "form-control";
  const phoneClasses = phoneHasError ? "form-control invalid" : "form-control";
  const workplaceClasses = workplaceHasError
    ? "form-control invalid"
    : "form-control";
  const roleClasses = roleHasError ? "form-control invalid" : "form-control";
  const distributionListClasses = distributionListHasError ? "form-control invalid" : "form-control";
  const driveClasses = driveHasError ? "form-control invalid" : "form-control";
  const sendLoginClasses = sendLoginHasError
    ? "form-control invalid"
    : "form-control";

    async function addInputHandler(entryALK) {
      const response = await fetch('https://webform-entry-exit-default-rtdb.firebaseio.com/entryALK.json', {
        method: 'POST',
        body: JSON.stringify(entryALK),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
    }

  const submitHandler = (event) => {
    event.preventDefault();
 
    if (!formIsValid) {
      return;
    }

    const entryALK = {
      dateOfEntryValue,
      titleValue,
      firstNameValue,
      lastNameValue,
      mailValue,
      phoneValue,
      workplaceValue,
      roleValue,
      distributionListValue,
      driveValue,
      sendLoginValue
    };

    addInputHandler(entryALK);
          
    resetdateOfEntry();
    resetTitle();
    resetFirstName();
    resetLastName();
    resetMail();
    resetPhone();
    resetWorkplace();
    resetRole();
    resetDistributionList();
    resetDrive();
    resetSendLogin();
  };

  return (
    <form onSubmit={submitHandler}>
      <h1 className="form-control">Eintritt ALK</h1>
      <div className="control-group">
        <div className={dateOfEntryClasses}>
          <label>Eintrittsdatum</label>
          <input
            type="date"
            id="dateOfEntry"
            value={dateOfEntryValue}
            onChange={dateOfEntryChangeHandler}
            onBlur={dateOfEntryBlurHandler}
          />
          {dateOfEntryHasError && (
            <p className="error-text">Bitte Datum auswählen.</p>
          )}
        </div>
      </div>
      <div className="control-group1">
        <div className={titleClasses}>
          <label>Anrede</label>
          <select id="title" onChange={titleChangeHandler} onBlur={titleBlurHandler}>
            <option value=""></option>
            <option value="Frau">Frau</option>
            <option value="Herr">Herr</option>
          </select>
          {titleHasError && (
            <p className="error-text">Bitte Anrede auswählen.</p>
          )}
        </div>
        <div className={firstNameClasses}>
          <label htmlFor="firstName">Vorname</label>
          <input
            type="text"
            id="firstName"
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
      <div className="control-group2">
        <div className={mailClasses}>
          <label htmlFor="email">E-Mailadresse</label>
          <input
            type="email"
            id="email"
            value={mailValue}
            onChange={mailChangeHandler}
            onBlur={mailBlurHandler}
          />
          {mailHasError && (
            <p className="error-text">Bitte gültige Mailadresse eingeben.</p>
          )}
        </div>
        <div className={phoneClasses}>
          <label htmlFor="phone">Telefonnummer (xxx xxx xx xx)</label>
          <input
            type="text"
            id="phone"
            value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />
          {phoneHasError && (
            <p className="error-text">Bitte gültige Nummer eingeben.</p>
          )}
        </div>
      </div>
      <div className="control-group3">
        <div className={workplaceClasses}>
          <label>Arbeitsort</label>
          <select id="arbeitsort" onChange={workplaceChangeHandler} onBlur={workplaceBlurHandler}>
            <option value=""></option>
            <option value="Brugg">Brugg</option>
            <option value="Bulle">Bulle</option>
            <option value="Chur">Chur</option>
            <option value="Fribourg">Fribourg</option>
            <option value="Genf">Genf</option>
            <option value="Glattbrugg">Glattbrugg</option>
            <option value="Luzern">Luzern</option>
            <option value="Rüti">Rüti</option>
            <option value="Tafers">Tafers</option>
            <option value="Visp">Visp</option>
            <option value="Zentrale">Zentrale</option>
            <option value="Zürich">Zürich</option>
          </select>
          {workplaceHasError && (
            <p className="error-text">Bitte Arbeitsort auswählen.</p>
          )}
        </div>
        <div className={roleClasses}>
          <label htmlFor="role">Funktion</label>
          <input
            type="text"
            id="role"
            value={roleValue}
            onChange={roleChangeHandler}
            onBlur={roleBlurHandler}
          />
          {roleHasError && (
            <p className="error-text">Bitte Funktion eingeben.</p>
          )}
        </div>
      </div>
      <div className="control-group4">
      <div className={distributionListClasses}>
          <label>Verteilerliste(n)</label>
          <select id="distributionListe" onChange={distributionListChangeHandler} onBlur={distributionListBlurHandler}> 
            <option value=""></option>
            <option value="Führungsteam">Führungsteam</option>
            <option value="Sitzung Zahlstellenleitung">Sitzung Zahlstellenleitung</option>
            <option value="Rechtsdienst D">Rechtsdienst D</option>
            <option value="Rechtsdienst F">Rechtsdienst F</option>
          </select>
          {distributionListHasError && (
            <p className="error-text">Bitte Verteilerliste(n) auswählen.</p>
          )}
        </div>
        <div className={driveClasses}>
          <label>Zugriff Laufwerk G</label>
          <select id="laufwerk" onChange={driveChangeHandler} onBlur={driveBlurHandler}>
            <option value=""></option>
            <option value="Brugg">Brugg</option>
            <option value="Bulle">Bulle</option>
            <option value="Chur">Chur</option>
            <option value="Fribourg">Fribourg</option>
            <option value="Genf">Genf</option>
            <option value="Glattbrugg">Glattbrugg</option>
            <option value="Luzern">Luzern</option>
            <option value="Olten">Olten</option>
            <option value="Pool">Pool</option>
            <option value="Quality Management">Quality Management</option>
            <option value="Rechtsdienst ALK">Rechtsdienst ALK</option>
            <option value="Region Mitte">Region Mitte</option>
            <option value="Rüti">Rüti</option>
            <option value="Tafers">Tafers</option>
            <option value="Visp">Visp</option>
            <option value="Zentrale">Zentrale</option>
            <option value="Zürich">Zürich</option>
          </select>
          {driveHasError && (
            <p className="error-text">Bitte Laufwerk auswählen.</p>
          )}
        </div>
      </div>
      <div className="control-group5">
        <div className={sendLoginClasses}>
          <label htmlFor="sendLogin">Senden an:</label>
          <input
            type="text"
            id="sendLogin"
            value={sendLoginValue}
            onChange={sendLoginChangeHandler}
            onBlur={sendLoginBlurHandler}
          />
          {sendLoginHasError && (
            <p className="error-text">Bitte Kontaktperson angeben.</p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={props.onCancel}>Zurück</button>
        <button disabled={!formIsValid}>
          Senden
        </button>
      </div>
    </form>
  );
};

export default EntryFormALK;

import React, {useEffect, useState} from 'react'
import {useHistory, Link} from 'react-router-dom';
import {Formik, Form, Field, useField, ErrorMessage} from "formik";
import {TextField, InputLabel, Button, Select, Grid, MenuItem, Slide, makeStyles, useTheme, Icon, LinearProgress, Paper, colors, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core'
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete'
import * as Yup from 'yup'
import './addBook.css'

import ELibService from "../../../repository/ElibraryRepository";

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });
const countries = [
    { id: "1", continent: "Asia", country: "Afghanistan, Islamic Republic of"},
    { id: "2", continent: "Europe", country: "Albania, Republic of"},
    { id: "3", continent: "Antarctica", country: "Antarctica (the territory South of 60 deg S)"},
    { id: "4", continent: "Africa", country: "Algeria, People's Democratic Republic of"},
    { id: "5", continent: "Oceania", country: "American Samoa"},
    { id: "6", continent: "Europe", country: "Andorra, Principality of"},
    { id: "7", continent: "Africa", country: "Angola, Republic of"},
    { id: "8", continent: "North America", country: "Antigua and Barbuda"},
    { id: "9", continent: "Europe", country: "Azerbaijan, Republic of"},
    { id: "10", continent: "South America", country: "Argentina, Argentine Republic"},
    { id: "11", continent: "Oceania", country: "Australia, Commonwealth of"},
    { id: "12", continent: "Europe", country: "Austria, Republic of"},
    { id: "13", continent: "North America", country: "Bahamas, Commonwealth of the"},
    { id: "14", continent: "Asia", country: "Bahrain, Kingdom of"},
    { id: "15", continent: "Asia", country: "Bangladesh, People's Republic of"},
    { id: "16", continent: "Europe", country: "Armenia, Republic of"},
    { id: "17", continent: "North America", country: "Barbados"},
    { id: "18", continent: "Europe", country: "Belgium, Kingdom of"},
    { id: "19", continent: "North America", country: "Bermuda"},
    { id: "20", continent: "Asia", country: "Bhutan, Kingdom of"},
    { id: "21", continent: "South America", country: "Bolivia, Republic of"},
    { id: "22", continent: "Europe", country: "Bosnia and Herzegovina"},
    { id: "23", continent: "Africa", country: "Botswana, Republic of"},
    { id: "24", continent: "Antarctica", country: "Bouvet Island (Bouvetoya)"},
    { id: "25", continent: "South America", country: "Brazil, Federative Republic of"},
    { id: "26", continent: "North America", country: "Belize"},
    { id: "27", continent: "Asia", country: "British Indian Ocean Territory (Chagos Archipelago)"},
    { id: "28", continent: "Oceania", country: "Solomon Islands"},
    { id: "29", continent: "North America", country: "British Virgin Islands"},
    { id: "30", continent: "Asia", country: "Brunei Darussalam"},
    { id: "31", continent: "Europe", country: "Bulgaria, Republic of"},
    { id: "32", continent: "Asia", country: "Myanmar, Union of"},
    { id: "33", continent: "Africa", country: "Burundi, Republic of"},
    { id: "34", continent: "Europe", country: "Belarus, Republic of"},
    { id: "35", continent: "Asia", country: "Cambodia, Kingdom of"},
    { id: "36", continent: "Africa", country: "Cameroon, Republic of"},
    { id: "37", continent: "North America", country: "Canada"},
    { id: "38", continent: "Africa", country: "Cape Verde, Republic of"},
    { id: "39", continent: "North America", country: "Cayman Islands"},
    { id: "40", continent: "Africa", country: "Central African Republic"},
    { id: "41", continent: "Asia", country: "Sri Lanka, Democratic Socialist Republic of"},
    { id: "42", continent: "Africa", country: "Chad, Republic of"},
    { id: "43", continent: "South America", country: "Chile, Republic of"},
    { id: "44", continent: "Asia", country: "China, People's Republic of"},
    { id: "45", continent: "Asia", country: "Taiwan"},
    { id: "46", continent: "Asia", country: "Christmas Island"},
    { id: "47", continent: "Asia", country: "Cocos (Keeling) Islands"},
    { id: "48", continent: "South America", country: "Colombia, Republic of"},
    { id: "49", continent: "Africa", country: "Comoros, Union of the"},
    { id: "50", continent: "Africa", country: "Mayotte"},
    { id: "51", continent: "Africa", country: "Congo, Republic of the"},
    { id: "52", continent: "Africa", country: "Congo, Democratic Republic of the"},
    { id: "53", continent: "Oceania", country: "Cook Islands"},
    { id: "54", continent: "North America", country: "Costa Rica, Republic of"},
    { id: "55", continent: "Europe", country: "Croatia, Republic of"},
    { id: "56", continent: "North America", country: "Cuba, Republic of"},
    { id: "57", continent: "Europe", country: "Cyprus, Republic of"},
    { id: "58", continent: "Europe", country: "Czech Republic"},
    { id: "59", continent: "Africa", country: "Benin, Republic of"},
    { id: "60", continent: "Europe", country: "Denmark, Kingdom of"},
    { id: "61", continent: "North America", country: "Dominica, Commonwealth of"},
    { id: "62", continent: "North America", country: "Dominican Republic"},
    { id: "63", continent: "South America", country: "Ecuador, Republic of"},
    { id: "64", continent: "North America", country: "El Salvador, Republic of"},
    { id: "65", continent: "Africa", country: "Equatorial Guinea, Republic of"},
    { id: "66", continent: "Africa", country: "Ethiopia, Federal Democratic Republic of"},
    { id: "67", continent: "Africa", country: "Eritrea, State of"},
    { id: "68", continent: "Europe", country: "Estonia, Republic of"},
    { id: "69", continent: "Europe", country: "Faroe Islands"},
    { id: "70", continent: "South America", country: "Falkland Islands (Malvinas)"},
    { id: "71", continent: "Antarctica", country: "South Georgia and the South Sandwich Islands"},
    { id: "72", continent: "Oceania", country: "Fiji, Republic of the Fiji Islands"},
    { id: "73", continent: "Europe", country: "Finland, Republic of"},
    { id: "74", continent: "Europe", country: "Ã…land Islands"},
    { id: "75", continent: "Europe", country: "France, French Republic"},
    { id: "76", continent: "South America", country: "French Guiana"},
    { id: "77", continent: "Oceania", country: "French Polynesia"},
    { id: "78", continent: "Antarctica", country: "French Southern Territories"},
    { id: "79", continent: "Africa", country: "Djibouti, Republic of"},
    { id: "80", continent: "Africa", country: "Gabon, Gabonese Republic"},
    { id: "81", continent: "Europe", country: "Georgia"},
    { id: "82", continent: "Africa", country: "Gambia, Republic of the"},
    { id: "83", continent: "Asia", country: "Palestinian Territory, Occupied"},
    { id: "84", continent: "Europe", country: "Germany, Federal Republic of"},
    { id: "85", continent: "Africa", country: "Ghana, Republic of"},
    { id: "86", continent: "Europe", country: "Gibraltar"},
    { id: "87", continent: "Oceania", country: "Kiribati, Republic of"},
    { id: "88", continent: "Europe", country: "Greece, Hellenic Republic"},
    { id: "89", continent: "North America", country: "Greenland"},
    { id: "90", continent: "North America", country: "Grenada"},
    { id: "91", continent: "North America", country: "Guadeloupe"},
    { id: "92", continent: "Oceania", country: "Guam"},
    { id: "93", continent: "North America", country: "Guatemala, Republic of"},
    { id: "94", continent: "Africa", country: "Guinea, Republic of"},
    { id: "95", continent: "South America", country: "Guyana, Co-operative Republic of"},
    { id: "96", continent: "North America", country: "Haiti, Republic of"},
    { id: "97", continent: "Antarctica", country: "Heard Island and McDonald Islands"},
    { id: "98", continent: "Europe", country: "Holy See (Vatican City State)"},
    { id: "99", continent: "North America", country: "Honduras, Republic of"},
    { id: "100", continent: "Asia", country: "Hong Kong, Special Administrative Region of China"},
    { id: "101", continent: "Europe", country: "Hungary, Republic of"},
    { id: "102", continent: "Europe", country: "Iceland, Republic of"},
    { id: "103", continent: "Asia", country: "India, Republic of"},
    { id: "104", continent: "Asia", country: "Indonesia, Republic of"},
    { id: "105", continent: "Asia", country: "Iran, Islamic Republic of"},
    { id: "106", continent: "Asia", country: "Iraq, Republic of"},
    { id: "107", continent: "Europe", country: "Ireland"},
    { id: "108", continent: "Asia", country: "Israel, State of"},
    { id: "109", continent: "Europe", country: "Italy, Italian Republic"},
    { id: "110", continent: "Africa", country: "Cote d'Ivoire, Republic of"},
    { id: "111", continent: "North America", country: "Jamaica"},
    { id: "112", continent: "Asia", country: "Japan"},
    { id: "113", continent: "Asia", country: "Kazakhstan, Republic of"},
    { id: "114", continent: "Asia", country: "Jordan, Hashemite Kingdom of"},
    { id: "115", continent: "Africa", country: "Kenya, Republic of"},
    { id: "116", continent: "Asia", country: "Korea, Democratic People's Republic of"},
    { id: "117", continent: "Asia", country: "Korea, Republic of"},
    { id: "118", continent: "Asia", country: "Kuwait, State of"},
    { id: "119", continent: "Asia", country: "Kyrgyz Republic"},
    { id: "120", continent: "Asia", country: "Lao People's Democratic Republic"},
    { id: "121", continent: "Asia", country: "Lebanon, Lebanese Republic"},
    { id: "122", continent: "Africa", country: "Lesotho, Kingdom of"},
    { id: "123", continent: "Europe", country: "Latvia, Republic of"},
    { id: "124", continent: "Africa", country: "Liberia, Republic of"},
    { id: "125", continent: "Africa", country: "Libyan Arab Jamahiriya"},
    { id: "126", continent: "Europe", country: "Liechtenstein, Principality of"},
    { id: "127", continent: "Europe", country: "Lithuania, Republic of"},
    { id: "128", continent: "Europe", country: "Luxembourg, Grand Duchy of"},
    { id: "129", continent: "Asia", country: "Macao, Special Administrative Region of China"},
    { id: "130", continent: "Africa", country: "Madagascar, Republic of"},
    { id: "131", continent: "Africa", country: "Malawi, Republic of"},
    { id: "132", continent: "Asia", country: "Malaysia"},
    { id: "133", continent: "Asia", country: "Maldives, Republic of"},
    { id: "134", continent: "Africa", country: "Mali, Republic of"},
    { id: "135", continent: "Europe", country: "Malta, Republic of"},
    { id: "136", continent: "North America", country: "Martinique"},
    { id: "137", continent: "Africa", country: "Mauritania, Islamic Republic of"},
    { id: "138", continent: "Africa", country: "Mauritius, Republic of"},
    { id: "139", continent: "North America", country: "Mexico, United Mexican States"},
    { id: "140", continent: "Europe", country: "Monaco, Principality of"},
    { id: "141", continent: "Asia", country: "Mongolia"},
    { id: "142", continent: "Europe", country: "Moldova, Republic of"},
    { id: "143", continent: "Europe", country: "Montenegro, Republic of"},
    { id: "144", continent: "North America", country: "Montserrat"},
    { id: "145", continent: "Africa", country: "Morocco, Kingdom of"},
    { id: "146", continent: "Africa", country: "Mozambique, Republic of"},
    { id: "147", continent: "Asia", country: "Oman, Sultanate of"},
    { id: "148", continent: "Africa", country: "Namibia, Republic of"},
    { id: "149", continent: "Oceania", country: "Nauru, Republic of"},
    { id: "150", continent: "Asia", country: "Nepal, State of"},
    { id: "151", continent: "Europe", country: "Netherlands, Kingdom of the"},
    { id: "152", continent: "North America", country: "Netherlands Antilles"},
    { id: "153", continent: "North America", country: "CuraÃ§ao"},
    { id: "154", continent: "North America", country: "Aruba"},
    { id: "155", continent: "North America", country: "Sint Maarten (Netherlands)"},
    { id: "156", continent: "North America", country: "Bonaire, Sint Eustatius and Saba"},
    { id: "157", continent: "Oceania", country: "New Caledonia"},
    { id: "158", continent: "Oceania", country: "Vanuatu, Republic of"},
    { id: "159", continent: "Oceania", country: "New Zealand"},
    { id: "160", continent: "North America", country: "Nicaragua, Republic of"},
    { id: "161", continent: "Africa", country: "Niger, Republic of"},
    { id: "162", continent: "Africa", country: "Nigeria, Federal Republic of"},
    { id: "163", continent: "Oceania", country: "Niue"},
    { id: "164", continent: "Oceania", country: "Norfolk Island"},
    { id: "165", continent: "Europe", country: "Norway, Kingdom of"},
    { id: "166", continent: "Oceania", country: "Northern Mariana Islands, Commonwealth of the"},
    { id: "167", continent: "Oceania", country: "United States Minor Outlying Islands"},
    { id: "168", continent: "Oceania", country: "Micronesia, Federated States of"},
    { id: "169", continent: "Oceania", country: "Marshall Islands, Republic of the"},
    { id: "170", continent: "Oceania", country: "Palau, Republic of"},
    { id: "171", continent: "Asia", country: "Pakistan, Islamic Republic of"},
    { id: "172", continent: "North America", country: "Panama, Republic of"},
    { id: "173", continent: "Oceania", country: "Papua New Guinea, Independent State of"},
    { id: "174", continent: "South America", country: "Paraguay, Republic of"},
    { id: "175", continent: "South America", country: "Peru, Republic of"},
    { id: "176", continent: "Asia", country: "Philippines, Republic of the"},
    { id: "177", continent: "Oceania", country: "Pitcairn Islands"},
    { id: "178", continent: "Europe", country: "Poland, Republic of"},
    { id: "179", continent: "Europe", country: "Portugal, Portuguese Republic"},
    { id: "180", continent: "Africa", country: "Guinea-Bissau, Republic of"},
    { id: "181", continent: "Asia", country: "Timor-Leste, Democratic Republic of"},
    { id: "182", continent: "North America", country: "Puerto Rico, Commonwealth of"},
    { id: "183", continent: "Asia", country: "Qatar, State of"},
    { id: "184", continent: "Africa", country: "Reunion"},
    { id: "185", continent: "Europe", country: "Romania"},
    { id: "186", continent: "Asia", country: "Russian Federation"},
    { id: "187", continent: "Africa", country: "Rwanda, Republic of"},
    { id: "188", continent: "North America", country: "Saint Barthelemy"},
    { id: "189", continent: "Africa", country: "Saint Helena"},
    { id: "190", continent: "North America", country: "Saint Kitts and Nevis, Federation of"},
    { id: "191", continent: "North America", country: "Anguilla"},
    { id: "192", continent: "North America", country: "Saint Lucia"},
    { id: "193", continent: "North America", country: "Saint Martin"},
    { id: "194", continent: "North America", country: "Saint Pierre and Miquelon"},
    { id: "195", continent: "North America", country: "Saint Vincent and the Grenadines"},
    { id: "196", continent: "Europe", country: "San Marino, Republic of"},
    { id: "197", continent: "Africa", country: "Sao Tome and Principe, Democratic Republic of"},
    { id: "198", continent: "Asia", country: "Saudi Arabia, Kingdom of"},
    { id: "199", continent: "Africa", country: "Senegal, Republic of"},
    { id: "200", continent: "Europe", country: "Serbia, Republic of"},
    { id: "201", continent: "Africa", country: "Seychelles, Republic of"},
    { id: "202", continent: "Africa", country: "Sierra Leone, Republic of"},
    { id: "203", continent: "Asia", country: "Singapore, Republic of"},
    { id: "204", continent: "Europe", country: "Slovakia (Slovak Republic)"},
    { id: "205", continent: "Asia", country: "Vietnam, Socialist Republic of"},
    { id: "206", continent: "Europe", country: "Slovenia, Republic of"},
    { id: "207", continent: "Africa", country: "Somalia, Somali Republic"},
    { id: "208", continent: "Africa", country: "South Africa, Republic of"},
    { id: "209", continent: "Africa", country: "Zimbabwe, Republic of"},
    { id: "210", continent: "Europe", country: "Spain, Kingdom of"},
    { id: "211", continent: "Africa", country: "South Sudan"},
    { id: "212", continent: "Africa", country: "Western Sahara"},
    { id: "213", continent: "Africa", country: "Sudan, Republic of"},
    { id: "214", continent: "South America", country: "Suriname, Republic of"},
    { id: "215", continent: "Europe", country: "Svalbard & Jan Mayen Islands"},
    { id: "216", continent: "Africa", country: "Swaziland, Kingdom of"},
    { id: "217", continent: "Europe", country: "Sweden, Kingdom of"},
    { id: "218", continent: "Europe", country: "Switzerland, Swiss Confederation"},
    { id: "219", continent: "Asia", country: "Syrian Arab Republic"},
    { id: "220", continent: "Asia", country: "Tajikistan, Republic of"},
    { id: "221", continent: "Asia", country: "Thailand, Kingdom of"},
    { id: "222", continent: "Africa", country: "Togo, Togolese Republic"},
    { id: "223", continent: "Oceania", country: "Tokelau"},
    { id: "224", continent: "Oceania", country: "Tonga, Kingdom of"},
    { id: "225", continent: "North America", country: "Trinidad and Tobago, Republic of"},
    { id: "226", continent: "Asia", country: "United Arab Emirates"},
    { id: "227", continent: "Africa", country: "Tunisia, Tunisian Republic"},
    { id: "228", continent: "Europe", country: "Turkey, Republic of"},
    { id: "229", continent: "Asia", country: "Turkmenistan"},
    { id: "230", continent: "North America", country: "Turks and Caicos Islands"},
    { id: "231", continent: "Oceania", country: "Tuvalu"},
    { id: "232", continent: "Africa", country: "Uganda, Republic of"},
    { id: "233", continent: "Europe", country: "Ukraine"},
    { id: "234", continent: "Europe", country: "Macedonia"},
    { id: "235", continent: "Africa", country: "Egypt, Arab Republic of"},
    { id: "236", continent: "Europe", country: "United Kingdom of Great Britain & Northern Ireland"},
    { id: "237", continent: "Europe", country: "Guernsey, Bailiwick of"},
    { id: "238", continent: "Europe", country: "Jersey, Bailiwick of"},
    { id: "239", continent: "Europe", country: "Isle of Man"},
    { id: "240", continent: "Africa", country: "Tanzania, United Republic of"},
    { id: "241", continent: "North America", country: "United States of America"},
    { id: "242", continent: "North America", country: "United States Virgin Islands"},
    { id: "243", continent: "Africa", country: "Burkina Faso"},
    { id: "244", continent: "South America", country: "Uruguay, Eastern Republic of"},
    { id: "245", continent: "Asia", country: "Uzbekistan, Republic of"},
    { id: "246", continent: "South America", country: "Venezuela, Bolivarian Republic of"},
    { id: "247", continent: "Oceania", country: "Wallis and Futuna"},
    { id: "248", continent: "Oceania", country: "Samoa, Independent State of"},
    { id: "249", continent: "Asia", country: "Yemen"},
    { id: "250", continent: "Africa", country: "Zambia, Republic of"},
    { id: "251", continent: "Oceania", country: "Disputed Territory"},
    { id: "252", continent: "Asia", country: "Iraq-Saudi Arabia Neutral Zone"},
    { id: "253", continent: "Asia", country: "United Nations Neutral Zone"},
    { id: "254", continent: "Asia", country: "Spratly Islands"},
]

const options = countries.map((country) => {
    const firstLetter = country.country[0].toUpperCase();
    return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...country,
    };
});
const filter = createFilterOptions();
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
        maxWidth: 400
    },
    button: {
        margin: theme.spacing(1)
    },
    margin: {
        margin: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: colors.blueGrey[100],
        border: `2px solid ${colors.blueGrey[200]}`
    },
    rootPaper: {
        margin: theme.spacing(3)
    },
    dialogAutocomplete: {
        width: 300,
        margin: theme.spacing(1)
    }
}));
export default function AddBook({onAddBook, findAuthors, categories, authors}){
    const history = useHistory();
    const classes = useStyles();
    const [createAuthor, setCreateAuthor] = useState(false);
    const [openDialog, toggleOpen] = useState(false);
    const [openErr, toggleOpenErr] = useState(false);
    const [authorDialogValue, setAuthorDialogValue] = useState({
        name: "",
        surname: "",
        country: "",
        continent: "",
        countryId: ""
    });
    useEffect(() => {
        findAuthors();
        }, [])

    const addAuthor = () => {
        console.log("Author added")
        const name = authorDialogValue.name
        const surname = authorDialogValue.surname
        const country = authorDialogValue.country
        const continent = authorDialogValue.continent
        const countryId = parseInt(authorDialogValue.countryId)
        if( name === "" || surname === "" || country === "") toggleOpenErr(true);
        else {
            console.log("name: %s, surname: %s, country: %s, continent: %s", name, surname, country, continent)
            console.log("Country id: %d", countryId)
            ELibService.addAuthor(name,surname,countryId).then(res => {
                console.log(res);
                findAuthors();
            })
            handleClose()
        }
    }
    // const handleAuthorChange = (event) => {
    //     event.preventDefault();
    //     if( event.target.value != null && event.target.value.trim() !== "" ) {
    //         const authors = event.target.value.trim();
    //         const authNameSurname = authors.split(" ")
    //         findAuthors(authNameSurname[0], authNameSurname[1])
    //     }
    //     else{
    //         findAuthors();
    //     }
    // }
    const MyNumberInput = ({id,InputProps, ...props}) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : "";
        return (
            <TextField {...field} type="number" id={id} label="available Copies" variant="outlined" InputProps={InputProps} InputLabelProps={{shrink: true}}  error={!!errorText} />
        )
    };

    const BookSchema = Yup.object().shape({
        name: Yup.string().max(70, "Too long").required("This field is required!"),
        author: Yup.object({
            name: Yup.string().max(30, "Too long").required("Please enter author name!"),
            surname: Yup.string().max(30, "Too long").required("Please enter author surname!")
        }),
        category: Yup.string().required("This field is required!"),
        availableCopies: Yup.number().min(1,"Can't be less then one copy!").max(10000,"Too much").required("This is required")
    });
    const myEmailValidation = (email) => {
        let errMsg;
        if(email !== 'user@email.com' && email !== 'admin@rentScoot.com') errMsg = "За тестирање користете ги следните адреси: user@email.com и admin@rentScoot.com";
        return errMsg;
    }
    const handleClose = () => {
        setAuthorDialogValue({
            ...authorDialogValue,
            name: "",
            surname: "",
            country: ""
        });
        toggleOpen(false);
    };
    const handleCloseError = () => {
        toggleOpenErr(false);
        toggleOpen(true);
    }
    return (
      <div>
          <Formik
              enableReinitialize
                initialValues={
                    { name: "", category: "", author: authorDialogValue, availableCopies: 1}
          } onSubmit={(values, {setSubmitting}) => {
            setSubmitting(true);
            onAddBook(values.name, values.category, values.author.id, values.availableCopies);
            console.log("Submitting ");
            setSubmitting(false);
            history.push('/books');
          }
          }
          validationSchema={BookSchema}
          >
              {({errors, touched, isSubmitting, values, handleChange, setFieldValue}) => {
                return (
                    <Form>
                        <Paper className={classes.rootPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Paper className={classes.paper} elevation={2}>
                                    <label>Author</label> <br/>
                                    <Field
                                        id="author-selection"
                                        name={"author"}
                                        as={Autocomplete}
                                        value={values.author.name + " " + values.author.surname}
                                        onChange={(event, newValue) => {
                                            if (typeof newValue === 'string') {
                                                const aParts = newValue.trim().split(" ")
                                                const aName = aParts[0]
                                                let aSurname = ""
                                                if (typeof aParts[1] === "string") aSurname = aParts[1]
                                                // timeout to avoid instant validation of the dialog's form.
                                                setTimeout(() => {
                                                    toggleOpen(true);
                                                    setAuthorDialogValue({
                                                        ...authorDialogValue,
                                                        name: aName,
                                                        surname: aSurname
                                                    });
                                                    setFieldValue("author", authorDialogValue.name + " " + authorDialogValue.surname)
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                const aParts = newValue.inputValue.trim().split(" ")
                                                const aName = aParts[0]
                                                let aSurname = ""
                                                if (typeof aParts[1] === "string") aSurname = aParts[1]
                                                toggleOpen(true);
                                                setAuthorDialogValue({
                                                    ...authorDialogValue,
                                                    name: aName,
                                                    surname: aSurname
                                                });
                                                setFieldValue("author", authorDialogValue.name + " " + authorDialogValue.surname)
                                            } else {
                                                // handleChange(event)
                                                if(newValue) setFieldValue("author", newValue)
                                                else setFieldValue("author",{
                                                    name: "",
                                                    surname: "",
                                                    country: "",
                                                    continent: "",
                                                    countryId: ""
                                                })
                                            }
                                        }}
                                        filterOptions={(options, params) => {
                                            const aParts = params.inputValue.trim().split(" ")
                                            const aName = aParts[0]
                                            let aSurname = ""
                                            if (typeof aParts[1] === "string") aSurname = aParts[1]
                                            const filtered = filter(options, params);

                                            if (params.inputValue !== '') {
                                                filtered.push({
                                                    inputValue: params.inputValue,
                                                    name: `Add "${aName}`,
                                                    surname: `${aSurname}"`
                                                });
                                            }
                                            return filtered;
                                        }}
                                        options={authors}
                                        getOptionLabel={(author) => {
                                            // e.g value selected with enter, right from the input
                                            if (typeof author === 'string') {
                                                return author;
                                            }
                                            if (author.inputValue) {
                                                return author.inputValue;
                                            }
                                            return author.name + " " + author.surname;
                                        }}
                                        selectOnFocus
                                        handleHomeEndKeys
                                        renderOption={(author) => author.name + " " + author.surname }
                                        style={{ width: 300 }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Name Surname" variant="outlined" />
                                        )}
                                    />
                                    <ErrorMessage
                                        name={"author.name"}
                                        component="div"
                                        className="validator"
                                    />
                                    {/*<ErrorMessage*/}
                                    {/*    name={"author.surname"}*/}
                                    {/*    component="div"*/}
                                    {/*    className="validator"*/}
                                    {/*/>*/}
                                </Paper>
                            </Grid>
                        <Grid item container xs={6} direction={"column"} alignItems={"center"}>
                            <Paper className={classes.paper}>
                        <Grid item>
                            <InputLabel htmlFor="bookName">Book</InputLabel>
                            <Field className={"form-field"} as={TextField} name="name" placeholder="Book Name" variant="outlined"/>
                            <ErrorMessage
                                name={"name"}
                                component="div"
                                className="validator"
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel className={classes.margin} htmlFor="categories">Category</InputLabel>
                            <Field name="category" className={classes.dialogAutocomplete} defaultValue={"0"} type="select" as={Select}>
                            {
                                categories && categories.map(category =>
                                    <MenuItem key={category} value={category}> {category} </MenuItem>
                                )
                            }
                            </Field>
                            <ErrorMessage name={"category"} className={"validator"} component={"div"}/>
                        </Grid>
                        <Grid item>
                            <MyNumberInput name="availableCopies" InputProps={ { inputProps: { "min": "1","max": "10000"}}} />
                            <ErrorMessage
                                name={"availableCopies"}
                                component="div"
                                className="validator"
                            />
                        </Grid>
                        <Grid item>
                            {isSubmitting && <LinearProgress />}
                            <br />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<Icon>book</Icon>}
                                disabled={isSubmitting}
                            >
                                Add
                            </Button>
                        </Grid>
                        <pre>{JSON.stringify(values,null,2)}</pre>
                        <pre>{JSON.stringify(errors,null,2)}</pre>
                            </Paper>
                            </Grid>
                            <Grid item container xs={3} direction={"column"} alignItems={"center"}>
                            </Grid>
                        </Grid>
                        </Paper>
                    </Form>
                )
              }}
          </Formik>
          <Dialog open={openDialog} onClose={handleClose} aria-labelledby="dialog-title">
                  <DialogTitle id="dialog-title">Add a new author</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                          You haven't found the author you were searching for? Please, add it!
                      </DialogContentText>
                      <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="author-name"
                          value={authorDialogValue.name}
                          onChange={(event) => setAuthorDialogValue({ ...authorDialogValue, name: event.target.value })}
                          label="Name"
                          type="text"
                      />
                      <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="author-surname"
                          value={authorDialogValue.surname}
                          onChange={(event) => setAuthorDialogValue({ ...authorDialogValue, surname: event.target.value })}
                          label="Surname"
                          type="text"
                      />
                      <Autocomplete
                          id="grouped-countries"
                          options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                          groupBy={(option) => option.firstLetter}
                          getOptionLabel={(option) => option.country}
                          className={classes.dialogAutocomplete}
                          onChange={(event, newValue) => newValue ? setAuthorDialogValue({...authorDialogValue, country: newValue.country, continent: newValue.continent, countryId: newValue.id}):setAuthorDialogValue({...authorDialogValue, country: "", continent: "", countryId: "-1"})}
                          renderInput={(params) => <TextField {...params} required label="Country" variant="outlined" />}
                      />
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={handleClose} color="primary">
                          Cancel
                      </Button>
                      <Button onClick={addAuthor} color="primary">
                          Add
                      </Button>
                  </DialogActions>
          </Dialog>
          <Dialog open={openErr} onClose={handleCloseError} aria-labelledby="error-title">
              <DialogTitle id="error-title" style={{color: "red"}}>Can't add new author !</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Please make sure you fill all the information needed for the author.
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseError} color="secondary" variant="contained">
                      OK
                  </Button>
              </DialogActions>
          </Dialog>
      </div>
    );
}
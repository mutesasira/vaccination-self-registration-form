import { useHistory } from 'react-router-dom';

export const LandingPage = () => {
    let history = useHistory();
    return (
        <div className="px-16  my-2 text-xl justify-center block">
            <h2 className="font-bold block">Welcome to Uganda National COVID-19 Vaccination Pre-Registration Portal</h2>
            <p className="text-base block">
                The Ministry of Health, Uganda would like to invite all persons desiring to receive COVID-19 Vaccination to register for an appointment using this online self-registration Platform.
                <h1 className="text-lg font-bold text-red-500">Please Note:</h1>
                <ul className="text-base list-disc pl-4">
                    <li className=" ">Pre-registration is only for clients receiving 1st dose. </li>
                    <li>After registration, the booking will expire in five(5) days from the time of registration </li>
                    <li>All fields that have a red asterisck (<span className="text-red-500 font-xl">*</span>) are mandatory and have to be filled in or else
                        you will not be able to submit your Information for vaccination.</li>
                    <li>Vaccination schedules at most of vaccination sites are between 9am and 2pm</li>
                    <li>Please be kin on the Phone number format and the NIN number format, because a wrong format will stop you from submitting your information</li>
                    <li> After submitting your information, You will receive a notification of successfull submission of your information and a downloadable pdf file will be available for you to download</li>
                </ul>
            </p>
            <h1 className="text-lg font-bold block text-red-500">How to register</h1>
            <ul className="text-base list-disc pl-4">
                <li className=" ">Please click on the Register button on your right to take you to the registration form</li>
                <li>Fill in all the fields on the form and on completing, click on the Submit button to register</li>
                <h1 className="text-lg font-bold block">It is important to note that:</h1>
                <li>All fields that have a red asterisck (<span className="text-red-500 font-xl">*</span>) are mandatory and have to be filled in or else
                    you will not be able to submit your Information for vaccination.</li>
                <li>Please be kin on the Phone number format and the NIN number format, because a wrong format will stop you from submitting your information</li>
                <li> After submitting your information, You will receive a notification of successfull submission of your information and a downloadable pdf file will be available for you to download</li>
            </ul>
            <h1 className="text-lg block text-red-500 font-bold">Already fully vaccinated?</h1>
            <div className="flex items-center justify-between pb-8">
                <a className="font-bold text-blue-500" href="https://epivac.health.go.ug/certificates/#/">Get your vaccination certificate now</a>
                <button type="button" onClick={() => { history.push('/booking') }}
                    className=" ml-64 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 mb-4 text-sm rounded focus:outline-none focus:shadow-outline">
                    Register
                </button>
            </div>
        </div>
    )
}
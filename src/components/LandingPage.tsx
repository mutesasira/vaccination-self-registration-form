import React from 'react'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BookingForm } from './BookingForm';
import { useHistory } from 'react-router-dom';

export const LandingPage = () => {
    let history = useHistory();

    const [formstate, setFormstate] = useState();


    return (
        <div className="px-32  my-2 text-xl justify-center">
            <h2 className="font-bold">Welcome to Uganda National COVID-19 Self-Registration Portal</h2>
            <p className="text-base">
                The Portal is Uganda's Official online public COVID-19 Vaccination self registration Platform.
                If you need to register fo vaccination, access this portal and click on the register button to pre-register for vaccination at a health facility of your choice.
                <h1 className="text-lg">Please Note:</h1> That after registration, the booking will expire in five(5) days from the time of registration
            </p>
            <h1 className="text-lg">How to register</h1>
            <p className="text-base">Please click on the Register button on your right to take you to the registration form
                <h1>It is important to note that:</h1>All fields that have a red asterisck (<span className="text-red-500 font-xl">*</span>) are mandatory and have to be filled in or else
                you will not be able to submit your Information for vaccination. </p>
            <p className="text-base">After submitting your information, a downloadable pdf file will be available for you to download</p>

            <h1 className="text-lg">Already vaccinated?</h1> <a href="https://epivac.health.go.ug/certificates/#/">Get your vaccination certificate now</a> <button type="button" onClick={() => { history.push('/booking') }}
                className=" ml-64 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 text-sm rounded focus:outline-none focus:shadow-outline">
                Register
            </button>

        </div>
    )
}

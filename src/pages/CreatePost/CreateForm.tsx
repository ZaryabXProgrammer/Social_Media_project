import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth} from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'

//add doc adds document while creating new entry
//collection is used to speciy which collections you need to specfy if we have multiple

interface CreateFormData{
    title : string;
    description : string
}


export default function CreateForm() {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()



    const schema = yup.object().shape({
        title: yup.string().required('You must add a title'),
        description: yup.string().required('You must add a description'),

    }

    )
// pass the inerface datatypes to useForm to indicate the type of data being used there
    const { register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
        //resolver will be a yup resolver which will be used to merge both libraries.
    })

    const postsRef = collection(db, 'posts')

//we used CreateFormData to give what kind of datatype is the data
    const onCreatePost = async (data: CreateFormData) => {
//addDoc returns a promise, first pass reference to the document and then pass the data
       await addDoc(postsRef, {
        ...data, // we can use this so that we enure we are getting the data
        username: user?.displayName,
        userId: user?.uid,
       })
       navigate('/')

    }

// the handleSubmit function will be called to submit the form

    return (
        <form onSubmit={handleSubmit(onCreatePost)} className='form form-group text-center' action="">
            <div className="form-group">

                <label>Title</label>
                <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Title..." {...register('title')}/>
                <p style={{color: 'red'}}>{errors.title?.message}</p>

            </div>
            <div className="form-group mt-2">
                <label>Description</label>
                <textarea className="form-control" id="exampleInputPassword1" placeholder="Description.." {...register('description')} /><br />
                <p style={{ color: 'red' }}>{errors.description?.message}</p>
            </div>

            <button className="btn btn-primary">Submit</button>


        </form>
    )
}

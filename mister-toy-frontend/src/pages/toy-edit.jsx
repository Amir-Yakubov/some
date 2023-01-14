
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


import { Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { saveToy } from '../store/toy.action.js'

export function ToyEdit() {

    const [toy, setToy] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])


    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
            showSuccessMsg('load toy successfully')
        } catch (err) {
            showErrorMsg('Cannot load toy', err)
        }
    }

    async function onSubmit(values) {
        try {
            if (!values.createdAt) values.createdAt = Date.now()
            console.log(values)
            await saveToy(values)
            navigate('/toy')
        } catch (err) {
            showErrorMsg('Cannot save toy', err)
        }
    }

    const editSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        price: Yup.number()
            .min(1, 'Too Short!')
            .max(5000, 'Too Long!')
            .positive()
            .required('Required'),
        // inStock: Yup.boolean()
    })

    return (
        <>
            <section className="screen" onClick={() => navigate('/toy')}></section>
            <section className="toy-edit">

                <h2>Edit</h2>
                <Formik
                    initialValues={{ ...toy }}
                    enableReinitialize
                    validationSchema={editSchema}
                    onSubmit={onSubmit}>
                    {({ errors, touched }) => (

                        <Form className='formik grid'>

                            <label htmlFor="name">Name
                                <Field name="name"
                                    id="name"
                                    placeholder="Toy's name"
                                />
                            </label>

                            {errors.name && touched.name ? (<span>{errors.name}</span>) : null}
                            <label htmlFor="price">Price
                                <Field name="price"
                                    id="price"
                                    type="number"
                                    placeholder="Toy's price"
                                />
                            </label>

                            {errors.labels && touched.labels ? (<span>{errors.labels}</span>) : null}
                            <label>Labels
                                <Field name="labels[0]" />
                                <Field name="labels[1]" />
                            </label>

                            {errors.price && touched.price ? (<span>{errors.price}</span>) : null}
                            <label htmlFor="inStock">In stock
                                <Field name="inStock"
                                    id="inStock"
                                    type="checkbox"
                                />
                            </label>
                            {errors.inStock && touched.inStock ? <span>{errors.inStock}</span> : null}
                            <button className="btn" type="submit">Save</button>
                            <Link to={'/toy'}>Back</Link>
                        </Form>
                    )}
                </Formik>
            </section>
        </>
    )
}
import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import  {FaUser} from 'react-icons/fa'
import {ToastContainer, toast} from "react-toastify"
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Register() {
  const [fromData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    passwordConfirm:'',
  })
  const {name, email, password, passwordConfirm} = fromData
  
  const dispatch = useDispatch()
  const navigate =useNavigate()

  const { user, isLoading, isSuccess,isError, message} = useSelector(state => state.auth)

  useEffect(() => {
    if(isError) {
      return toast('Failed to register')
    }
    //Redirect to when logged in
    if(isSuccess || user) {

      navigate('/')
    }

     dispatch(reset())
  }, [isError,isSuccess,user,message,navigate,dispatch])

  const onChange = (e) =>{
    setFormData((prevState) =>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== passwordConfirm){
      toast.error('assword do not match')
    }else{
        const userData = {
            name,
            email,
            password,
        }

        dispatch(register(userData))
    }
  }

if (isLoading) {
  return <Spinner />
}

  return (

    <>
      <section className='headling'>
        <h1>
          <FaUser/> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
            type='text' 
            className='form-control' 
            id='name'
            name='name'
            value={name} 
            onChange={onChange}
            placeholder='Enter your name'
            required
            />
          </div>
          <div className="form-group">
            <input 
            type='email' 
            className='form-control' 
            id='email'
            name='email'
            value={email} 
            onChange={onChange}
            placeholder='Enter your email'
            required
            />
          </div>
          <div className="form-group">
            <input 
            type='password' 
            className='form-control' 
            id='password'
            name='password'
            value={password} 
            onChange={onChange}
            placeholder='Enter password'
            required
            />
          </div>
          <div className="form-group">
            <input 
            type='passwordConfirm' 
            className='form-control' 
            id='passwordConfirm'
            name='passwordConfirm'
            value={passwordConfirm} 
            onChange={onChange}
            placeholder='Confirm password'
            required
            />
          </div>
          <div className="form-group">
            <button className='btn btn-block'>
             Submit
            </button>
          </div>
          <ToastContainer/>
        </form>
      </section>
    </>
  )
}

export default Register
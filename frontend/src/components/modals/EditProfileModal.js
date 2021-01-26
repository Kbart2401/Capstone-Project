import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, useDisclosure, Link
} from "@chakra-ui/react";
import UpdateProfileForm from '../auth/UpdateProfileForm';
import * as sessionActions from '../../store/actions/session';
import '../../stylesheets/modals.css';

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const form = new FormData()
      form.append('username', username)
      form.append('email', email)
      form.append('city', city)
      form.append('state', state)
      form.append('country', country)
      form.append('password', password)
      form.append('image', image)
      dispatch(sessionActions.signUserUp(form))
        .catch(res => {
          if (res.errors) setErrors(res.errors)
        })
    }
    else setErrors(['Passwords do not match'])
  };

  return (
    <>
      <Button onClick={onOpen} variant="outline" mr={3} width='100%'>Edit Profile</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateProfileForm onSignUp={onSignUp} setUsername={setUsername}
              setEmail={setEmail} setCity={setCity} setState={setState}
              setCountry={setCountry} setPassword={setPassword}
              setRepeatPassword={setRepeatPassword} setImage={setImage} errors={errors} />
          </ModalBody>

          <ModalFooter className='modal-buttons'>
            <Button type='submit' onClick={onSignUp}>Update</Button>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProfileModal
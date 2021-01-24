import React from 'react';
import { useSelector } from 'react-redux';
import { FiMail } from 'react-icons/fi';
import {
  Popover, PopoverTrigger, Portal, PopoverContent,
  PopoverArrow, PopoverHeader, PopoverCloseButton,
  Button, PopoverFooter, PopoverBody, Image
} from '@chakra-ui/react';

const MailPopOver = () => {
  const friendReqs = useSelector(state => state.session.friendsWaiting)

  return (
    <Popover>
      <PopoverTrigger>
        <Button bgColor='white'> <FiMail size='30px' /></Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Inbox</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {friendReqs && !friendReqs.length && <div>No Messages</div>}
            {friendReqs?.map(friend => {
              return (
                <>
                  <div>{friend[0].username} <Image borderRadius='full' boxSize='50px' src={friend[0].image} /></div>
                  <div>{friend[1].message}</div>
                </>
              )
            })}
            <Button colorScheme="blue">Button</Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default MailPopOver

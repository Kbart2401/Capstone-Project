import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridItem, VStack, StackDivider, Image, Flex } from '@chakra-ui/react';
import Comments from './Comments';
import '../../stylesheets/feed.css';

const Feed = () => {
  const posts = useSelector(state => state.session.posts)

  const postCreated = (createdDate) => {
    return createdDate.slice(4, 16)
  }

  return (
    <>
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        <div className='feed-caps'>Recent Activity</div>
        {posts && posts.map((post, idx) => {
          return (
            <>
              <Grid key={idx} minH='120px' width='75%' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem className='feed-username-container' borderRadius='10px'
                  rowSpan={2} colSpan={1} bg='tomato' fontWeight='700'>
                  <Image borderRadius='10px' src={post.user.image} />
                  <Flex justifyContent='space-between' alignItems='center'>
                    <div className='feed-username'>{post.user.username}</div>
                    <br /><span>{postCreated(post.created_date)}</span>
                  </Flex>
                </GridItem>
                <GridItem borderRadius='10px' colSpan={2} bg='papayawhip'>{post.user.username} completed a task!
                <div>--------{post.category}--------</div>
                </GridItem>
                <GridItem borderRadius='10px' colSpan={2} bg='tomato'>{post.content}</GridItem>
              </Grid>
              <Flex width='40%' >
                <Comments post={post} />
              </Flex>
            </>
          )
        })
        }
      </VStack>
    </>
  )
}

export default Feed
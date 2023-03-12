import {useDisclosure,Button,Collapse,Box } from '@chakra-ui/react'
import { Children } from 'react'

function CollapseEx() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
        <Button onClick={onToggle}>{Children}</Button>
        <Collapse in={isOpen} animateOpacity>
          <Box
            p='40px'
            color='white'
            mt='4'
            bg='teal.500'
            rounded='md'
            shadow='md'
          >
            {Children}
          </Box>
        </Collapse>
      </>
    )
  }

  export default CollapseEx
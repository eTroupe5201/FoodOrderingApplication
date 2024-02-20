import { Button, Flex, Text } from "@chakra-ui/react";


export const BottomButton = ({ total, label, onClick }) => {
    return (
        <Flex position="fixed" bottom={0} right={0} left={0} zIndex="200" >
          <Button
            type="submit"
            w="100%"
            borderRadius={0}
            bg="linen"
            color="black"
            onClick={onClick}
            margin-bottom="100px"
            border="black 2px"
          >
            <Flex gap={4} w="100%">
              <Text>${total}</Text>
              <Flex justify="center" w="100%" borderLeftWidth={1}>
                <Text>{label}</Text>
              </Flex>
            </Flex>
          </Button>
        </Flex>
      );
};
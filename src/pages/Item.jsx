import { Text, Image, VStack, FormControl, FormLabel, Textarea, Input, Center, FormErrorMessage, CheckboxGroup, Checkbox, RadioGroup, Radio, Box, Flex} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"
import { useEffect } from "react";
import { BottomButton } from "../components/BottomButton";
import { calculationItemTotal } from "../utils/calculations";

/*
The following two variables determine whether to select a single or multiple box based on the Boolean values of allowmultiple and isrequired in firebase

Applying a checkbox group can better help manage the checked state of its children's checkbox components. 
For our design, some of our variant's isrequired values are true, so we must default to selecting them
*/
const Variant = ({ allowMultiple, defaultValue, ...props }) => 
  allowMultiple ? (
    <CheckboxGroup {...props} defaultValue={[defaultValue]} />
  ) : (
    <RadioGroup {...props} defaultValue={defaultValue} />
  );

const Choice = ({ allowMultiple, ...props }) =>
    allowMultiple ? (
        <Checkbox {...props} /> 
    ) : ( 
        <Radio {...props} />
    );


export const Item = () => {
    //here id is from the param of "navigate(`/item/${item.id}`)}""
    const { id } = useParams();
    const { getItemById, addToCart } = useDataProvider();
    const item = getItemById(id || "");

    /**
     * UseForm is one of the main hooks of react hook form. It is used to handle the status of forms, input registration forms, and submit forms.
       Register: This is a function used to register inputs (such as<input>,<select>) into the React Hook Form for verification and submission of form values.
       HandleSubmit: A function that receives the event of a form submission and processes it. If the form validation is successful, it will call the provided onSubmit callback function.
       Watch: This function can be used to subscribe to changes in form input in order to trigger rendering or logic when certain values change.
       Control: A hook used to control custom form components.
     */
    const { register, handleSubmit, formState, watch, control } = useForm({
        defaultValues: {
          quantity: 1,
          value: [],
          price: item.price || "",
          label: item.label || "",
        },
      });

      /**
       * UseFieldArray is a hook used to handle dynamic field sets in a form, such as input boxes that are dynamically added or deleted. 
       * When the form needs to allow users to add multiple input fields of the same type, such as adding multiple phone numbers 
       * or friends' names when submitting the form, useFieldArray is very useful.
       * 
       * fields: An array of objects representing the state of your field array, which you can traverse to render input controls.
         append: A function that allows you to add a new input control to the end of a field array.
         remove: A function that allows you to remove one or more input controls from a field array.

         In the code, useFieldArray is used to manage a field array named "value". 
         This means creating a set of fields that can be dynamically added and removed, and these fields are named value.
       */
      const { append, remove, fields } = useFieldArray({
        control,
        name: "value",
      });

    const onSubmit = async (values) => {
        const dataToSubmit = { ...values, id: id };
        await addToCart(dataToSubmit);
    }

    /**
     * If there is no item, we will return empty, but before that, let's first use useEffect to look at the value of variant in the item
     * In firebase, our data, in item, our variables are an array, and choices are also an array. Choice [0] has a label and price, 
     * choice [1] is isrequired, and so on. The details are as follows
     * 
     * variants(array)
        0
            allowMultiple：false

            choices(array)
                0
                label ："spicy saurce"
                price：1

            isRequired：false
            type："spicy"
     *  
     */

    useEffect(() => {
        //If the item does not exist or the variables array of the item is empty, return directly
        if (!item?.variants.length) return;

        //Filter the variables array of items and only retain variants where isRequired is true
        item.variants
            .filter((variant) => variant.isRequired)
            //Operate on each required variant
            .forEach((variant) =>
                //Add a new object to the field array using the append function
                append({
                    price: variant.choices[0].price,
                    value: variant.choices[0].label,
                    variant: variant.type,
                  })
                );

    }, [append, item.variants])

    if (!item) return null;

    /**
     * 1. When the form triggers a submission event, the handleSubmit specified by the onSubmit attribute of the<form>tag is called.
     * 2. The handleSubmit function will first perform validation on all registered fields internally.
     * 3. If all validations pass, handleSubmit will call the onSubmit callback function you provided to it 
     *    and pass the data in the form as parameter values to this callback function.
     * 4. After receiving values, the defined onSubmit function can perform further processing
     */
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Center>
            <VStack  mt="25px"  gap={4} pb={100}  width="90%" justifyContent={"center"}>
           <Text fontFamily="'Great Vibes', cursive" padding="15px"  
           fontSize={{base: "30px",sm: "35px", md:"40px"}}>{item.label}</Text>
                   
                <Image  
                border="tan 2px outset"
                borderRadius="25px"
                src={item.image?.src} 
                w={{base: "20em",sm: "20em", md:"20em", lg:"30em"}} 
                maxH={{base: "20em", sm: "20em", md:"30em",lg:"40em"}}   />
                
                <VStack gap={4}  p={4} w="100%">
                    <Text fontFamily="'Raleway', sans-serif" fontWeight="bold"> {item.description} </Text>
                    <Text textAlign="left" fontFamily="'Raleway', sans-serif" fontWeight="bold"> Dietary Needs: {item.dietaryNeeds} </Text>
                    {item.variants.map((variant, index) => (
                        <FormControl key={variant.type + index}>
                            <FormLabel >
                                {variant.type}
                                {variant.isRequired && (
                                <Text as="span" fontSize={12} color="gray.500">
                                    (Required)
                                </Text>
                                )}
                            </FormLabel>
                            <Variant
                                defaultValue={
                                    variant.isRequired ? `${variant.type}:0` : undefined
                                }
                                allowMultiple={variant.allowMultiple}
                                /*
                                The Variant custom component encapsulates CheckboxGroup or RadioGroup.
                                When the onChange event is triggered, for a CheckboxGroup, index is actually an array of values for all selected checkboxes;
                                For a RadioGroup, index is the value of a single selected radio button.
                                */
                                onChange={(index) => {
                                    // Use the reduce method to traverse the fields array and find all field indexes that need to be removed.
                                    const removeAll = fields.reduce((acc, field, index) => {
                                        // If the variant attribute of the current field is different from the variant type being processed, we do not take any action and only return the accumulator acc.
                                        if (field.variant !== variant.type) return acc;
                                        // If the variant attribute of the current field is the same as the variant type being processed,
                                        // We will add its index to the accumulator acc array.
                                        return [...acc, index];
                                      },[]);
                                      /*
                                      If field.variant matches variant. type, the index of the current field will be added to the accumulator array. 
                                      Finally, the removeAll variable will contain the index of all fields that should be removed. 
                                      Remove these fields from this index set using the remove method of useFieldArray
                                       */
                                      remove(removeAll);

                                    //If it is an array, that is, in the case of CheckboxGroup, each element represents the value of a checkbox.
                                    if (Array.isArray(index)) {
                                        //Use the 'filter' method to filter out all elements with true values
                                        const currIndexs = index
                                          .filter((i) => !!i) //Convert each item to a Boolean value, and the true value will be retained.
                                          .map((i) => parseInt(i.split(":")[1])); //Operate on each item in the array, split the string, and convert the second part to an integer
                    
                                        // Use the 'forEach' method to traverse the array processed above.
                                        currIndexs.forEach((i) =>
                                          append({
                                            price: variant.choices[i].price, //Get prices from the 'variant. choices' array
                                            value: variant.choices[i].label,  //obtain the label
                                            variant: variant.type, //obtain the variant
                                          })
                                        );
                                      } else {
                                        //If 'index' is not an array, then it should be a string, in the case of RadioGroup.

                                        //Split the string and convert the second part to an integer to obtain the index of the current option.
                                        const currIndex = parseInt(index.split(":")[1]);
                                        append({
                                          price: variant.choices[currIndex].price,
                                          value: variant.choices[currIndex].label,
                                          variant: variant.type,
                                        });
                                      }
                                }}
                            >
                                {/* the function of VStack is align all items in the center */}
                                <VStack border="1px solid" borderColor="gray.200" borderRadius={4}>
                                    {variant.choices.map((choice, index, arr) => (
                                        <Box 
                                            key={`${variant.type}_${choice.label}_${index}`} 
                                            px={4} 
                                            py={2} 
                                            w="100%" 
                                            borderColor="black" 
                                            borderBottomWidth={arr.length - 1 === index ? 0 : 1} 
                                            mt="0px !important"
                                        >
                                            {/* spicy: 0 */}
                                            <Choice value={`${variant.type}:${index}`} allowMultiple={variant.allowMultiple}>
                                                <Flex gap={3}>
                                                    <Text>{choice.label}</Text>
                                                    {/* Only when the price of choice. price is greater than 0 will it be rendered, with a+$symbol in front of it during rendering*/}
                                                    {choice.price > 0 && (
                                                        <Text color="gray.500" fontSize={12}>
                                                        +${choice.price.toFixed(2)}
                                                        </Text>
                                                    )}
                                                </Flex>
                                            </Choice>
                                        </Box>                                                                            
                                    ))}
                                </VStack>
                                
                            </Variant>
                        </FormControl>
                    ))}
                    <FormControl>
                        <FormLabel >Special Instructions</FormLabel>
                            <Textarea bg="black" color="white"
                            placeholder="pepper / salt / cutlery..."
                            {...register("instructions")}
                            />
                    </FormControl>

                    <FormControl isInvalid={!!formState.errors.quantity?.type}>
                        <FormLabel>Quantity</FormLabel>
                        <Input
                            type="number"
                            defaultValue={1}
                            bg="black" color="white"
                            {...register("quantity", { min: 1, valueAsNumber: true })}
                        />
                        {/*Optional Chaining is used here. Its function is to obtain the type attribute if errors. quantity exists. 
                        If it does not exist, it will not continue to attempt to access the type, but will directly return undefined. 
                        When used !!, it is to convert the value to a Boolean type, but maintain the original true and false values. 
                        Therefore, if the quantity has the wrong type,!!formState.errors.quantity?.type will be true, otherwise it will be false.*/}
                        {!!formState.errors.quantity?.type && (
                            <FormErrorMessage>Invalid</FormErrorMessage>
                        )}
                    </FormControl>
                </VStack>
            </VStack>
            </Center>
            <BottomButton 
                label="Add to Cart"
                total={calculationItemTotal(
                    fields,
                    item.price,
                    //adapt to ...register("quantity") 
                    //This function can be used to subscribe to changes in form input in order to trigger rendering or logic when certain values change.
                    watch("quantity")
                ).toFixed(2)}
            />
        </form>

    );
};

import {
    List,
    Datagrid,
    TextField,
    Create,
    SimpleForm,
    TextInput,
    required,
    DateField,
    ImageInput,
    ImageField,
    Edit,
    NumberInput,
    number,
    NumberField,
    ArrayInput,
    SimpleFormIterator,
    BooleanInput,
    ReferenceInput,
    SelectInput,
    ReferenceField,
    ChipField,
  } from "react-admin";
  import { MdOutlineFastfood } from "react-icons/md";

const ItemForm = () => {
    return (
      <SimpleForm sanitizeEmptyValues>
        <ImageInput source="image" label="Image">
          <ImageField source="src" title="title" />
        </ImageInput>
        <ReferenceInput source="category" reference="category">
          <SelectInput optionText="title" fullWidth validate={[required()]} />
        </ReferenceInput>
        <TextInput source="label" validate={[required()]} fullWidth />
        <NumberInput source="price" validate={[required(), number()]} fullWidth />
        <TextInput source="description" fullWidth />
        <TextInput source="dietaryNeeds" label="Dietary Needs" fullWidth />
        <ArrayInput source="variants">
            <SimpleFormIterator fullWidth>
                <TextInput source="type" helperText={false} fullWidth />
                <ArrayInput source="choices">
                    <SimpleFormIterator inline>
                        <TextInput source="label" />
                        <NumberInput source="price" defaultValue={0} />
                    </SimpleFormIterator>
                </ArrayInput>
                <BooleanInput source="allowMultiple" helperText={false} fullWidth />
                <BooleanInput source="isRequired" helperText={false} fullWidth />
            </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    );
  };

const ItemCreate = () => (
    <Create>
      <ItemForm />
    </Create>
  );

  const ItemEdit = () => (
    <Edit>
      <ItemForm />
    </Edit>
  );


const ItemList = () => (
    <List>
      <Datagrid rowClick="edit">
        <ImageField source="image.src" label="Image" />
        <TextField source="label" />
        <ReferenceField source="category" reference="category">
          <ChipField source="title" />
        </ReferenceField>
        <NumberField source="price" />
        <TextField source="description" />
        <DateField source="createdate" showTime label="Created At" />
        <DateField source="lastupdate" showTime label="Updated At" />
      </Datagrid>
    </List>
  );


export const ItemProps = {
    icon: MdOutlineFastfood,
    name: "item",
    list: ItemList,
    create: ItemCreate,
    edit: ItemEdit,
}
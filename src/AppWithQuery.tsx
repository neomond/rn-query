import {useRef} from 'react';
import {addProduct, deleteProduct, fetchProducts} from './utils';
import {useMutation, useQuery} from 'react-query';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const AppWithQuery = () => {
  const inputNameRef = useRef<TextInput | null>(null);
  const inputUnitPriceRef = useRef<TextInput | null>(null);
  const {data: products, refetch} = useQuery('products', fetchProducts, {
    refetchInterval: 20000,
  });
  const {mutate: addMutate} = useMutation(addProduct, {
    onSuccess: () => {
      refetch();
    },
  });
  const {mutate: deleteMutate} = useMutation(deleteProduct, {
    onSuccess: () => {
      refetch();
    },
  });

  function handleAddProduct() {
    const name = inputNameRef.current?.value;
    const unitPrice = inputUnitPriceRef.current?.value;
    addMutate({name, unitPrice});
    inputNameRef.current?.clear();
    inputUnitPriceRef.current?.clear();
  }

  const renderItem = ({item}: any) => (
    <View
      style={{
        padding: 10,
        backgroundColor: '#e1e1e1',
        margin: 5,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text key={item.id}>
        {item.name} - ${item.unitPrice}
      </Text>
      <View style={{marginLeft: 20}}>
        <Button title="x" onPress={() => deleteMutate(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.mainCont}>
      <Text>Add Product:</Text>
      <TextInput ref={inputNameRef} style={styles.input} placeholder="Name" />
      <TextInput
        ref={inputUnitPriceRef}
        style={styles.input}
        placeholder="Unit Price"
        keyboardType="numeric"
      />
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity onPress={handleAddProduct}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={refetch}>
          <Text>Refetch</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  input: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#e1e1e1',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 50,
    marginVertical: 10,
  },
});

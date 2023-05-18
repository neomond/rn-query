// import React from 'react';
// import {QueryClient, QueryClientProvider} from 'react-query';
// import SuppliersScreen from './SuppliersScreen';

// export const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <SuppliersScreen />
//     </QueryClientProvider>
//   );
// }

import React, {useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const API_URL = 'https://northwind.vercel.app/api/products';

const queryClient = new QueryClient();

const fetchProducts = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

const addProduct = async ({name, unitPrice}: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, unitPrice}),
  });
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
};

const deleteProduct = async id => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};

const App = () => {
  const inputNameRef = useRef();
  const inputUnitPriceRef = useRef();
  const {data: products, refetch} = useQuery('products', fetchProducts);
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

  const handleAddProduct = () => {
    const name = inputNameRef.current.value;
    const unitPrice = inputUnitPriceRef.current.value;
    addMutate({name, unitPrice});
    inputNameRef.current.clear();
    inputUnitPriceRef.current.clear();
  };

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
      {/* <Text style={{marginTop: 20, fontWeight: 'bold'}}>Product List:</Text> */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const AppWithQuery = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default AppWithQuery;

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

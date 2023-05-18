// import React, {useState} from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   ActivityIndicator,
//   SafeAreaView,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';
// import {useMutation, useQuery} from 'react-query';
// import {queryClient} from './App';

// const SuppliersScreen = () => {
//   const fetchData = async () => {
//     const response = await axios.get(
//       'https://northwind.vercel.app/api/suppliers',
//     );
//     return response.data;
//   };

//   const refetchData = async () => {
//     setIsRefetching(true);
//     await queryClient.refetchQueries('suppliers');
//     setIsRefetching(false);
//   };

//   const [newCompanyName, setNewCompanyName] = useState<any>('');
//   const [isRefetching, setIsRefetching] = useState(false);

//   const {isLoading, isError, data} = useQuery('suppliers', fetchData);

//   const addCompanyNameMutation = useMutation(companyName =>
//     axios.post('https://northwind.vercel.app/api/suppliers', {companyName}),
//   );
//   const handleAddCompanyName = () => {
//     addCompanyNameMutation.mutate(newCompanyName, {
//       onSuccess: () => {
//         setNewCompanyName('');
//         queryClient.invalidateQueries('suppliers');
//       },
//     });
//   };

//   if (isLoading) {
//     return <ActivityIndicator />;
//   }

//   if (isError) {
//     return <Text>Error fetching data</Text>;
//   }

//   return (
//     <SafeAreaView style={styles.mainCont}>
//       <TextInput
//         style={styles.input}
//         value={newCompanyName}
//         onChangeText={text => setNewCompanyName(text)}
//         placeholder="Enter company name"
//       />
//       <TextInput
//         style={styles.input}
//         value={newCompanyName}
//         onChangeText={text => setNewCompanyName(text)}
//         placeholder="Enter company name"
//       />
//       <View style={styles.buttonsWrapper}>
//         <TouchableOpacity onPress={handleAddCompanyName}>
//           <Text>Add</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={refetchData} disabled={isRefetching}>
//           <Text>Refetch</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={data}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({item}) => (
//           <View>
//             <Text>{item.companyName}</Text>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// };
// export default SuppliersScreen;

// const styles = StyleSheet.create({
//   mainCont: {
//     marginHorizontal: 20,
//   },
//   input: {
//     height: 40,
//     marginVertical: 8,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     borderColor: '#e1e1e1',
//   },
//   buttonsWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     columnGap: 20,
//   },
// });

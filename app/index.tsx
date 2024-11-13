import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import supabase from "@/DBconfig/supabaseClient";
import { useEffect, useState } from "react";
import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

type smoothieData = {
  id:number,
  created_at:Timestamp,
  title: string,
  method: string
}

export default function Index() {

  const [smoothies,setSmoothies] = useState<smoothieData[]>([]);
  const [title,setTitle] = useState<string>("");
  const [method,setMethod] = useState<string>("");
  const [orderby, setOrderBy ] = useState<string>("id");

  const router = useRouter();


  //for fetching smoothie
  const fetchSmoothies = async () => {
    const {data,error} = await supabase
    .from('smoothies')
    .select()
    .order(orderby,{ascending:true})

    if(error){
      console.log(error);
    }
    if(data){
      setSmoothies(data);
    }
  }

  //for adding smoothiey
  const createSmoothie = async () => {

    //handling if all fields have been filled
    if(!title || !method){
      alert("Please make sure all fields have been filled out");
      return;
    }

    const {data,error} = await supabase
    .from('smoothies')
    .insert([{
      title,
      method,
    }])

    alert("Smoothie has been added")

    if(error){
      console.log(error);
    }
    if(data){
      console.log(data);
      setTitle("");
      setMethod("");
    }

  }

  useEffect(() => {
    fetchSmoothies();
  },[orderby])



  return (
    <ScrollView>
      <Text>
     {smoothies.map((smoothie) => (
    <TouchableOpacity 
      onPress={() => router.push({
      pathname:"/smoothies",
      params:{
        Id:smoothie.id,
        title:smoothie.title,
        method:smoothie.method,
      }
      
    })}>
    <View key={smoothie.id} style={{borderBottomColor:'black',borderBottomWidth:3,margin:10}}>
      <Text>Smoothie ID: {smoothie.id}</Text>
      <Text>Title: {smoothie.title}</Text>
      <Text>Method: {smoothie.method}</Text>
      <Text>Created At: {smoothie.created_at}</Text>
    </View>
    </TouchableOpacity>
  ))}
      </Text>

      <View style={{display: "flex",flexDirection: "row"}}>
      <TouchableOpacity onPress={() => setOrderBy("method")}>
      <View>
        <View style={styles.submit}>
        <Text style={{color:'black'}}>Refresh</Text>
      </View>
       
      </View>
     </TouchableOpacity>

     <TouchableOpacity onPress={() => setOrderBy("id")}>
     <View style={styles.submit}>
        <Text style={{color:'black'}}>Order by ID</Text>
       </View>
     </TouchableOpacity>
     
     <TouchableOpacity onPress={() => setOrderBy("title")}>
     <View style={styles.submit}>
        <Text style={{color:'black'}}>Order by Name</Text>
       </View>
     </TouchableOpacity>

      </View>

      <Text style={styles.addHeader}>FILL HERE TO ADD DATA TO DATABASE</Text>

     <Text>Enter Title</Text>
     <TextInput
     value={title}
     onChangeText={setTitle}
     style={styles.input}
     />

     <Text>Enter Method</Text>
     <TextInput
     value={method}
     onChangeText={setMethod}
     style={styles.input}
     />
     

     <TouchableOpacity onPress={createSmoothie}>
      <View style={styles.submit}>
        <Text style={{color:'black'}}>Submit</Text>
      </View>
     </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input:{
    borderColor:'black',
    borderWidth:2,
    padding:4,
    margin:5,
    height:50,
    borderRadius:10,
    color:'black',
    
  },
  addHeader:{
    fontWeight:'bold',
    fontSize:20,
    margin:10,
  },
  submit:{
    borderColor:'black',
    borderWidth:2,
    margin:10,
    width:100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'lightblue',
  }

});

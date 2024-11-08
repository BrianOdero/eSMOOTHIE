import { StyleSheet, Text, TextInput, View } from "react-native";
import supabase from "@/DBconfig/supabaseClient";
import { useEffect, useState } from "react";
import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";
import { TouchableOpacity } from "react-native-gesture-handler";

type smoothieData = {
  id:number,
  created_at:Timestamp,
  title: string,
  method: string
}

export default function Index() {

  const [smoothies,setSmoothies] = useState<smoothieData[]>([]);
  const [title,setTitle] = useState<string>("")
  const [method,setMethod] = useState<string>("")
  const [rating,setRating] = useState<string>("")

  const fetchSmoothies = async () => {
    const {data,error} = await supabase
    .from('smoothies')
    .select()

    if(error){
      console.log(error);
    }
    if(data){
      setSmoothies(data);
      console.log(smoothies);
    }
  }

  const createSmoothie = async () => {
    const {data,error} = await supabase
    .from('smoothies')
    .insert([{
      title,
      method,
    }])

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
  },[])



  return (
    <View>
     <Text>Welcome</Text>
<Text>
  {smoothies.map((smoothie) => (
    <View key={smoothie.id} style={{borderBottomColor:'black',borderBottomWidth:3,borderTopColor:'black',borderTopWidth:3}}>
      <Text>Smoothie ID: {smoothie.id}</Text>
      <Text>Title: {smoothie.title}</Text>
      <Text>Method: {smoothie.method}</Text>
      <Text>Created At: {smoothie.created_at}</Text>
    </View>
  ))}
</Text>
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
      <View>
        <Text style={{color:'black'}}>Submit</Text>
      </View>
     </TouchableOpacity>

    </View>
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
    padding:20,
    margin:10,
    height:10,
    borderRadius:10,
    color:'black'
  }
});

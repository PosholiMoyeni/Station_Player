import  React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';

export default function App(Station, setStation) {
  const Stations = {
    name: 'Harvest',
    uri: 'http://node-08.zeno.fm/v0myu53ae3quv?zs=Qyh0r6OsRQ2IvATq1GO7Xw&zs=iJCqf_4VRoyHYF3Kw_5ZMw&rj-tok=AAABgXq4nFoAX6smAN5esSnQng&rj-ttl=5',

    name: 'Moafrika',
    uri: 'http://ca3.rcast.net:8040/;stream.mp3',
  
    name: 'Tsenolo',
    uri: 'http://onlineradiobox.com/ls/tsenolo/player/?cs=ls.tsenolo&played=1',
    
    name: "PC",
    uri: 'http://102.130.114.208:8000/pcfm',

  };

  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [radio, setRadio] = useState('')

  function async() {
    setCurrentIndex(currentIndex + 1)
    setStation(Station - 1)
  }

  const componentDidMount = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })

      this.loadAudio()
    } catch (problem) {
      console.log(problem)
    }
  }
  function harvest() {
    setRadio({ uri: 'http://node-08.zeno.fm/v0myu53ae3quv?zs=Qyh0r6OsRQ2IvATq1GO7Xw&zs=iJCqf_4VRoyHYF3Kw_5ZMw&rj-tok=AAABgXq4nFoAX6smAN5esSnQng&rj-ttl=5' })

  }

  function Moafrika() {
    setRadio({ uri: 'http://ca3.rcast.net:8040/;stream.mp3' })
  }


  function Tsenolo() {
    setRadio({ uri: 'http://onlineradiobox.com/ls/tsenolo/player/?cs=ls.tsenolo&played=1' })
  }

  function PC() {
    setRadio({ uri: 'http://102.130.114.208:8000/pcfm' })
  }


  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
  }, []);
  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      const status = await playbackObject.loadAsync(
        { uri: Stations.uri },
        { shouldPlay: true }
      );
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }

    if (playbackStatus.isPlaying) {
      const status = await playbackObject.pauseAsync();
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }


    if (!playbackStatus.isPlaying) {
      const status = await playbackObject.playAsync();
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
  };


  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <StatusBar style='light-content'/>
      <View style={styles.High}>
      <ImageBackground
            source={require("./assets/background.png")} style={styles.background}>
               <Text style={{fontWeight: "bold"}}>STATION-PLAYER</Text>
               <Text style={{fontWeight: 'bold'}}>choose your station and start listening</Text>
        </ImageBackground>


        <View style={styles.Options}>
        <TouchableOpacity onPress={Moafrika}>
             <Image style={styles.Photo}
                source={require("./assets/moafrika.png")}/>
                <Text style={styles.Desc}>moafrika fm</Text>
            </TouchableOpacity>
           <TouchableOpacity onPress={harvest}>
             <Image style={styles.Photo}
               source={require("./assets/Harvest.jpeg")}/>
               <Text style={styles.Desc}>Harvest fm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Tsenolo}>
              <Image style={styles.Photo}
                source={require("./assets/Tsenolo.jpg")}/>
                <Text style={styles.Desc}>Tsenolo fm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={PC}>
              <Image style={styles.Photo}
                source={require("./assets/PC.jpg")}/>
                <Text style={styles.Desc}>PC fm</Text>
            </TouchableOpacity> 


        </View>

        <View >
        <View style={styles.Radio}>
            <View>
                <Slider
                    style={styles.ProgressContainer}
                    value={10}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor='#ffd369'
                    maximumTrackTintColor="#ffd369"
                    onSlidingComplete={()=>{}}
                />
            </View>
        </View>
        <View style={styles.StationControls}>
          <TouchableOpacity >
                    <Image style={styles.point}
                    source={require("./assets/Left.png")}/>
                </TouchableOpacity>

            <TouchableOpacity >
              <View>
              <Ionicons style={{ alignSelf: 'center', backgroundColor: '#168e22', padding: 10, borderRadius: 50, }} name={isPlaying ? 'pause' : 'play'} size={30} color='white' onPress={handleAudioPlayPause}
                /> 
                </View>    
                </TouchableOpacity>

                <TouchableOpacity >      
                    <Image style={styles.point}
                    source={require("./assets/Right.png")}/>   
                </TouchableOpacity>

          </View>
        </View>
        <View style={styles.RadioView}>   
      
        <View style={styles.BottomContainer}>
            <View style={styles.BottomControls}> 
                <TouchableOpacity >
                    <FontAwesome5 name="heart" size={30} color="white" />
                </TouchableOpacity >
                <TouchableOpacity >
                    <Ionicons name="md-repeat" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Ionicons name="share-outline" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Ionicons name="ellipsis-horizontal" size={30} color="white" />
                </TouchableOpacity>
            </View>
           
        </View>    
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#231e2d',
},
High: {
  width:"100%",

},
background:{
  width:"100%",
  height: 350,
  alignItems:"center",
},
  Options:{
    marginVertical:10,
    flexDirection:"row",
    width: '100%',
    alignItems:"center",
    justifyContent:'space-evenly',
    height:79

  },
  Photo:{
    alignSelf:'center',
    height:50,
    width:50,
    borderRadius:50,
  },
  Desc:{
    alignSelf:"center",
    color:"white",
    fontWeight:"700",
  },
 
ProgressContainer:{
  width:350,
  flexDirection:'row',
},

  StationControls:{
    marginTop: 10,
    width:"100%",
    flexDirection: 'row',
    justifyContent:"space-evenly",
  },
  point:{
    height: 40,
    width:40,
    marginTop:8,

  },
  OnOff:{
    height: 70,
    width: 70,
    alignSelf:"center",
  },
  RadioView:{
    width:"100%",
    alignSelf:"center",
    marginBottom:100,
    margin: 20,
  },
  Radio:{
    alignContent:"center",
    alignSelf:'center',
    margin: 20,
},
  BottomContainer:{
    marginTop: 20,
    borderColor:"#ecc3",
    borderWidth:1,
    width: "100%",
    alignItems: "center",
    height: 50,
    alignSelf: 'center',
},
BottomControls:{
  margin:7,
    flexDirection:'row', 
    justifyContent:'space-between', 
    width:'80%',
},
}
);



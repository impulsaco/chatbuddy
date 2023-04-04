import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import { Button } from "@rneui/themed"
import { Audio } from "expo-av";
import FormData from "form-data";
import axios from "axios";
import Mode from './Mode';
import sentenceSpeak from '../lib/sentenceSpeak';
import TranscribedOutput from "./TranscribeOutput";
import { OPENAI_API_KEY } from "@env";
import * as FileSystem from 'expo-file-system';
import Microphone from "../../assets/microphone.svg";
import BigMike from "../../assets/bigMike.svg";
import Sound from '../../assets/Sound.svg';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

export default ({
  sentenceWhisper, 
  setSentenceWhisper, 
  lang, 
  langCode, 
  setTopText, 
  setBottomText, 
  setRecordingUri, 
  setAttempted, 
  setPlaySound, 
  sentenceText,
  closeVisible,
  setCloseVisible
}) => {
  console.log("sentenceWhisper before new is ", sentenceWhisper)
  const [recording, setRecording] = React.useState(false as any);
  const [recordingDone, setRecordingDone] = React.useState(false);
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [transcribedData, setTranscribedData] = React.useState([] as any);
  const [interimTranscribedData] = React.useState("");
  const [isRecording, setIsRecording] = React.useState(false);
  const [isTranscribing, setIsTranscribing] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(lang.toLowerCase());
  const [selectedModel, setSelectedModel] = React.useState(1);
  const [transcribeTimeout, setTranscribeTimout] = React.useState(5);
  const [stopTranscriptionSession, setStopTranscriptionSession] =
    React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [sound, setSound] = React.useState(null); // for audio playback
  const intervalRef: any = React.useRef(null);

  const stopTranscriptionSessionRef = React.useRef(stopTranscriptionSession);
  stopTranscriptionSessionRef.current = stopTranscriptionSession;

  const selectedLangRef = React.useRef(selectedLanguage);
  selectedLangRef.current = selectedLanguage;

  const selectedModelRef = React.useRef(selectedModel);
  selectedModelRef.current = selectedModel;

  const API_KEY = OPENAI_API_KEY;

  const supportedLanguages = [
    "english",
    "chinese",
    "german",
    "spanish",
    "russian",
    "korean",
    "french",
    "japanese",
    "portuguese",
    "turkish",
    "polish",
    "catalan",
    "dutch",
    "arabic",
    "swedish",
    "italian",
    "indonesian",
    "hindi",
    "finnish",
    "vietnamese",
    "hebrew",
    "ukrainian",
    "greek",
    "malay",
    "czech",
    "romanian",
    "danish",
    "hungarian",
    "tamil",
    "norwegian",
    "thai",
    "urdu",
    "croatian",
    "bulgarian",
    "lithuanian",
    "latin",
    "maori",
    "malayalam",
    "welsh",
    "slovak",
    "telugu",
    "persian",
    "latvian",
    "bengali",
    "serbian",
    "azerbaijani",
    "slovenian",
    "kannada",
    "estonian",
    "macedonian",
    "breton",
    "basque",
    "icelandic",
    "armenian",
    "nepali",
    "mongolian",
    "bosnian",
    "kazakh",
    "albanian",
    "swahili",
    "galician",
    "marathi",
    "punjabi",
    "sinhala",
    "khmer",
    "shona",
    "yoruba",
    "somali",
    "afrikaans",
    "occitan",
    "georgian",
    "belarusian",
    "tajik",
    "sindhi",
    "gujarati",
    "amharic",
    "yiddish",
    "lao",
    "uzbek",
    "faroese",
    "haitian creole",
    "pashto",
    "turkmen",
    "nynorsk",
    "maltese",
    "sanskrit",
    "luxembourgish",
    "myanmar",
    "tibetan",
    "tagalog",
    "malagasy",
    "assamese",
    "tatar",
    "hawaiian",
    "lingala",
    "hausa",
    "bashkir",
    "javanese",
    "sundanese",
  ];

  const modelOptions = ["tiny", "base", "small", "medium", "large"];

  React.useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleTranscribeTimeoutChange(newTimeout: any) {
    setTranscribeTimout(newTimeout);
  }

  async function startRecording() {    
    try {
      console.log("Requesting permissions..");
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        setTopText("Hit the stop button when done:")
        setBottomText("Recording...")
        const RECORDING_OPTIONS_PRESET_LOW_QUALITY: any = {
          android: {
            extension: ".mp4",
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
            sampleRate: 10000,
            numberOfChannels: 2,
            bitRate: 3000,
          },
          ios: {
            extension: ".wav",
            audioQuality: 0,
            //audioQuality: IOSAudioQuality.MIN,
            sampleRate: 44000,
            numberOfChannels: 2,
            bitRate: 12000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        };
        const { recording }: any = await Audio.Recording.createAsync(
          RECORDING_OPTIONS_PRESET_LOW_QUALITY
        );
        setRecording(recording);
        console.log("Recording started");
        setStopTranscriptionSession(false);
        setIsRecording(true);
        /*intervalRef.current = setInterval(
          transcribeInterim,
          transcribeTimeout * 1000
        );*/
        console.log("erer", recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error(" Failed to start recording", err);
    }
  }  

  React.useEffect(() => {
    console.log("close UseEffect")
    console.log("closeVisible is ", closeVisible)
  }, [closeVisible])

  async function stopRecording() {    
    console.log("Stopping recording..");
    //setRecording(undefined);
    console.log("recording is ", recording);
    console.log("recording uri is ", recording.getURI());

    // resets for audio playback
    Audio.setAudioModeAsync({ allowsRecordingIOS: false })

    // for audio playback
    setPlaySound(
      async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({ uri: recording });
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync();
      }
    )
    setRecordingUri(recording.getURI());
    // audio playback code ends here
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    const getFileSize = async uri => {
      let fileInfo = await FileSystem.getInfoAsync(uri)
      console.log("size is ", fileInfo.size)
    };
    getFileSize(uri);
    let updatedRecordings = [...recordings] as any;
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    setRecordings(updatedRecordings);
    setRecordingDone(true); // Added to change the button to play
    console.log("Recording stopped and stored at", uri);
    // Fetch audio binary blob data

    clearInterval(intervalRef.current);
    setStopTranscriptionSession(true);
    setIsRecording(false);
    setIsTranscribing(false);
    transcribeRecording()
  }

  function getDurationFormatted(millis: any) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round(minutes - minutesDisplay) * 60;
    const secondDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine: any, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            {" "}
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            onPress={() => recordingLine.sound.replayAsync()}
            title={index.toString()}
          ></Button>
        </View>
      );
    });
  }

  function transcribeInterim() {
    clearInterval(intervalRef.current);
    setIsRecording(false);
    console.log("transcribeInterim called");
  }
  
  


  async function transcribeRecording() {
    if (Platform.OS === "ios") {
      const url = 'https://api.openai.com/v1/audio/transcriptions';
      const token = API_KEY;
      // const fileUri = '/path/to/file/openai.mp3';
      const modelName = 'whisper-1';
  
      const uri = recording.getURI();
      const filetype = uri.split(".").pop();
      const filename = uri.split("/").pop();
      const prompt = `${sentenceText} in ${lang}`;
      setLoading(true);
      setBottomText("Analyzing...")
      setTopText("Please wait...")
      const formData: any = new FormData();
      //formData.append("language", lang.toLowerCase());
      // formData.append("model_size", "tiny");
      formData.append(
        "file",
        {
          uri,
          name: filename,
          type: "audio/wav"
        });
      formData.append('model', modelName)
      formData.append('prompt', prompt)
      console.log("formData sent is", formData)
  
      axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${API_KEY}`
          }
        })
        .then(function (response) {
          console.log("response is :", response.data);
          setTranscribedData((oldData: any) => [...oldData, response.data]);
          setLoading(false);
          setIsTranscribing(false);
          setRecordingDone(false)
          setSentenceWhisper(response.data.text) // Sets the sentence check to be shown
          setAttempted(true)
          setCloseVisible(true)
          console.log("sentenceWhisper in Response is ", sentenceWhisper)
          /*intervalRef.current = setInterval(
            transcribeInterim,
            transcribeTimeout * 1000
          );*/
        })
        .catch(function (error) {
          console.log("error : ", error);
        });
  
      if (!stopTranscriptionSessionRef.current) {
        setIsRecording(true);
      }
    }
    if (Platform.OS === "android") {
      async function transcribeRecording() {
  
        const uri = recording.getURI();
        const filetype = uri.split(".").pop();
        const filename = uri.split("/").pop();
        setLoading(true);    
        setBottomText("Analyzing...")
        setTopText("Please wait...")
        const formData: any = new FormData();
        formData.append("language", lang.toLowerCase());
        formData.append("model_size", "tiny");
        formData.append(
          "audio_data",
          {
            uri,
            type: `audio/${filetype}`,
            name: filename,
          },
          "temp_recording"
        );
        console.log("formData sent is", formData)
        axios({
          url: "https://backendsay-wkdnx77abq-uw.a.run.app/transcribe", // IMPORTANT! must equal current server
          method: "POST",
          data: formData,
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
          },
        })
          .then(function (response) {
            console.log("response is :", response.data);
            setTranscribedData((oldData: any) => [...oldData, response.data]);
            setLoading(false);
            setIsTranscribing(false);
            setRecordingDone(false)
            setSentenceWhisper(response.data) // Sets the sentence check to be shown
            setAttempted(true)
            setCloseVisible(true)
            console.log("sentenceWhisper in Response is ", sentenceWhisper)
            /*intervalRef.current = setInterval(
              transcribeInterim,
              transcribeTimeout * 1000
            );*/
          })
          .catch(function (error) {
            console.log("error : ", error);
          });
    
        if (!stopTranscriptionSessionRef.current) {
          setIsRecording(true);
        }
      }
    }
  }

  
  return (
    <View style={styles.container}>
        {!isRecording && !isTranscribing && !recordingDone && (
          <View style={styles.middleContainer}>
            <TouchableOpacity style={styles.playBack} onPress={() => sentenceSpeak(sentenceText, langCode)}>                
              <Sound/>                
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => {setCloseVisible(false); startRecording()} } >
              <BigMike/>                  
            </TouchableOpacity>
          </View>
        )}
        {(isRecording || isTranscribing) && !recordingDone && (
          <View>
            <TouchableOpacity
            onPress={() => stopRecording()}
            disabled={stopTranscriptionSessionRef.current}            
            style={styles.stopContainer}
            >
              <Text style = {styles.stopText}></Text>
              <View style = {styles.stopButton}></View>
            </TouchableOpacity>
          </View>
        )}

      { isLoading !== false ? (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          hidesWhenStopped={true}
          animating={true}
        />
      ) : (
        <View></View>
      ) }
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
  },
  container: {
  },
  title: {
    marginTop: 40,
    fontWeight: "400",
    fontSize: 30,
  },
  settingsSection: {
    flex: 1,
  },
  buttonsSection: {
    flex: 1,
    flexDirection: "row",
  },
  transcription: {
    flex: 1,
    flexDirection: "row",
  },
  recordIllustration: {
    width: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,

    width: 152,
    height: 35,

    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: PAGE_WIDTH,
    paddingRight: PAGE_WIDTH*.2,
  },
  playBack: {
    marginRight: PAGE_WIDTH*.1,
  },
  stopContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 152,
  },
  stopButton: {
    backgroundColor: "red",
    borderRadius: 2,
    width: 40,
    height: 40,
    marginRight: PAGE_WIDTH*.03,
  },
  stopText: {
    color: "white",
    fontSize: 20,
    paddingRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    height: 20,
    width: 50
  }
});
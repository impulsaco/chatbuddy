import * as React from "react";
import { Audio } from "expo-av";

const playRecording = recording => {
  if (!recording) {
    return null;
  }

  console.log("recording uri HERE is", recording);

  //const [sound, setSound] = React.useState(null);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: recording });
    //setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  playSound();
  /*
  React.useEffect(() => {
    return sound ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  React.useEffect(() => {
    playSound();
  }, []); */

  return null;
};

export default playRecording;

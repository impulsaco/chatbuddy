import * as React from 'react';
import { Audio } from 'expo-av';

export default function App(recording) {

    if (recording === null) {
        return;
    }

    // file:///var/mobile/Containers/Data/Application/96CFC3A8-74BE-4565-8BB9-7B6F20A91938/Library/Caches/ExponentExperienceData/%2540diegosalvatierra%252Fsay-app/AV/recording-FA0E72F2-B4A5-42F4-AD9B-332D4A08BBED.wav
    // file:///var/mobile/Containers/Data/Application/96CFC3A8-74BE-4565-8BB9-7B6F20A91938/Library/Caches/ExponentExperienceData/%2540diegosalvatierra%252Fsay-app/AV/recording-5D45BE1B-2DC7-4046-ABE7-01807D01C393.wav

    if (recording !== null) {
        console.log("recording uri is", recording)
        const [sound, setSound] = React.useState();

        async function playSound() {
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync(require(recording));
            setSound(sound);

            console.log('Playing Sound');
            await sound.playAsync();
        }

        React.useEffect(() => {
            return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
                }
            : undefined;
        }, [sound]);

        playSound() 
    }
}
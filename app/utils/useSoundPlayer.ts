import { Howl } from 'howler';

const ClickSounds = [
    "/sounds/click_1.wav",
    "/sounds/click_2.wav",
    "/sounds/click_3.wav",
    "/sounds/click_4.wav",
    "/sounds/click_5.wav",
    "/sounds/click_6.wav",
    "/sounds/click_11.wav",
    "/sounds/click_22.wav",
    "/sounds/click_33.wav",
    "/sounds/click_33.wav",
    "/sounds/click_44.wav",
    "/sounds/click_55.wav",
    "/sounds/click_66.wav",
]

const wrongSounds = [
    '/sounds/error_1.wav'
];

export const playRandomSound = (type: 'correct' | 'wrong' | 'click') => {
    let sounds: string[];
    if(type === 'correct') {
        sounds = ['/sounds/correct.wav'];
    }else{
        sounds = type === 'click' ? ClickSounds : wrongSounds;
    }
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

    const sound = new Howl({ src: [randomSound], volume: 0.5 });
    sound.play();
};

import { uuidv4 } from "src/utils/helper";
import { schemes } from 'src/theme/foundations/colors';

export type DataModel = {
    id: string;
    title: string;
    description: string;
    colorSchema: typeof schemes[ number ];
    backgroundColor: string;
    textColor: string;
};


function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//generate random text color that contrasts with the background color
const randomTextColor = (backgroundColor: string) => {

    const color = (backgroundColor.charAt(0) === '#') ? backgroundColor.substring(1, 7) : backgroundColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    const uicolors = [ r / 255, g / 255, b / 255 ];
    const c = uicolors.map((col) => {
        if (col <= 0.03928) {
            return col / 12.92;
        }
        return Math.pow((col + 0.055) / 1.055, 2.4);
    }
    );

    const l = 0.2126 * c[ 0 ] + 0.7152 * c[ 1 ] + 0.0722 * c[ 2 ];

    return (l > 0.179) ? '#000000' : '#ffffff';
}

const getData = (title: string, description: string): DataModel => {

    const bg = randomColor();
    const colorSchema = schemes[ Math.floor(Math.random() * schemes.length) ];

    const _d: DataModel = {
        id: uuidv4(),
        title: title,
        description: description,
        colorSchema: colorSchema,
        backgroundColor: bg,
        textColor: randomTextColor(bg)
    }
    return _d;
}


export const dataSet1: DataModel[] = [
    getData('The concept of decentralization has been lost', ''),
    getData('CAW began as nothing', ''),
    getData(`Freedom given to the people to discover CAW's meaning`, ''),
    getData('This is a only a specification', ''),
    getData('Burn CAW through a contract to mint an NFT', ''),
]

export const dataSet2: DataModel[] = [
    getData('Making a CAW', ''),
    getData(`Liking someone else's CAW`, ''),
    getData('ReCAWing', ''),
    getData('Follow an Account', ''),
    getData('Censorship resistant and self-policing', ''),
    getData(`DM's should be 'free' / a trustless handshake`, ''),
]

export const dataSet3: DataModel[] = [
    getData('Data storage must be completely trustless, and permanent', ''),
    getData('CAW is by design without design', ''),
    getData('It is up the CAWMmunity to shape CAW', ''),
    getData('It is up to the frontends to limit content', ''),
    getData('Anybody is free to make or host their own frontend', ''),
    getData('One who still dreams', ''),
]



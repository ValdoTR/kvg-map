/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import {bootstrapExtra} from '@workadventure/scripting-api-extra'

console.log('Script started successfully');

async function extendedFeatures() {
    try {
        await bootstrapExtra()
        console.log('Scripting API Extra loaded successfully');
    } catch (error) {
        console.error('Scripting API Extra ERROR',error);
    }
}
extendedFeatures();

// Manage popups
let currentLayer: string;
let currentPopup: any;

const hiddenTrophiesCodes = [
    {
        layer: 'hiddenTrophySchooldyard',
        code: 'R',
        number: 1
    },
    {
        layer: 'hiddenTrophyGymTop',
        code: 'E',
        number: 1
    },
    {
        layer: 'hiddenTrophyGymBottom',
        code: 'F',
        number: 1
    },
    {
        layer: 'hiddenTrophyClassroomLeft',
        code: 'O',
        number: 1
    },
    {
        layer: 'hiddenTrophyClassroomRight',
        code: 'U',
        number: 1
    },
    {
        layer: 'hiddenTrophySchoolTop',
        code: 'E',
        number: 1
    },
    {
        layer: 'hiddenTrophySchoolMiddle',
        code: 'D',
        number: 1
    },
    {
        layer: 'hiddenTrophySchoolBottom',
        code: 'R',
        number: 1
    },
]

WA.room.onEnterLayer('hiddenTrophySchooldyard').subscribe(() => openPopup('hiddenTrophySchooldyard'));
WA.room.onLeaveLayer('hiddenTrophySchooldyard').subscribe(closePopup);

WA.room.onEnterLayer('hiddenTrophyGymTop').subscribe(() => openPopup('hiddenTrophyGymTop'));
WA.room.onLeaveLayer('hiddenTrophyGymTop').subscribe(closePopup);

WA.room.onEnterLayer('hiddenTrophyGymBottom').subscribe(() => openPopup('hiddenTrophyGymBottom'));
WA.room.onLeaveLayer('hiddenTrophyGymBottom').subscribe(closePopup);

WA.room.onEnterLayer('hiddenTrophyClassroomLeft').subscribe(() => openPopup('hiddenTrophyClassroomLeft'));
WA.room.onLeaveLayer('hiddenTrophyClassroomLeft').subscribe(closePopup);

WA.room.onEnterLayer('hiddenTrophyClassroomRight').subscribe(() => openPopup('hiddenTrophyClassroomRight'));
WA.room.onLeaveLayer('hiddenTrophyClassroomRight').subscribe(closePopup);

WA.room.onEnterLayer('hiddenTrophySchoolTop').subscribe(() => openPopup('hiddenTrophySchoolTop'));
WA.room.onLeaveLayer('hiddenTrophySchoolTop').subscribe(closePopup);

WA.room.onEnterLayer('hiddenTrophySchoolMiddle').subscribe(() => openPopup('hiddenTrophySchoolMiddle'));
WA.room.onLeaveLayer('hiddenTrophySchoolMiddle').subscribe(closePopup);

WA.room.onEnterLayer('hiddenTrophySchoolBottom').subscribe(() => openPopup('hiddenTrophySchoolBottom'));
WA.room.onLeaveLayer('hiddenTrophySchoolBottom').subscribe(closePopup);

// Popup management functions
function openPopup(layerName: string) {
    currentLayer = layerName
    const popupName = layerName + 'Popup'
    const popupConfig = hiddenTrophiesCodes.find((item) => {
        return item.layer == layerName
    });

    if (typeof popupConfig !== 'undefined') {
        currentPopup = WA.ui.openPopup(popupName,
            `Herzlichen Glückwunsch!\n
            Sie haben einen Buchstaben gefunden: ${popupConfig?.code}.\n
            Finde insgesamt acht Buchstaben, um das Wort zusammenzusetzen.`, [
            {
                label: "Habe es!",
                className: "normal",
                callback: (popup => {
                    popup.close()
                })
            }]
        )
    }
}
function closePopup(){
    if (typeof currentPopup !== 'undefined') {
        currentPopup.close();
        currentPopup = undefined;
    }
}

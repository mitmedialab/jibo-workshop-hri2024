'use strict';

const ROSBRIDGE_ADDRESS = 'ws://10.99.0.1:9090/';
const DANCE_MOVES = {
    'motion-twerk': "Dances/Twerk_01_02.keys",
    'motion-robot': "Dances/Robotic_01_01.keys",
    'motion-rocking': "Dances/Rocking_Chair_01.keys",
    'motion-sidestep': "Dances/Side_Stepper_01_01.keys",
    'motion-samba': "Dances/Samba_01_01.keys",
    'motion-jazz': "Dances/Smooth_Music_Dance_01_01.keys",
    'motion-disco': "Dances/dance_disco_00.keys",
    'motion-feelings': "heart-beat.keys",
    'motion-backstepper': "Dances/Back_Stepper_01_01.keys",
    'motion-carlton1': "Dances/Carlton_01_01.keys",
    'motion-carlton2': "Dances/Carlton_02_01.keys",
    'motion-clockworker': "Dances/Clockworker_01_01.keys",
    'motion-doughkneader': "Dances/Doughkneader_01_01.keys",
    'motion-footstomper': "Dances/Footstomper_01_01.keys",
    'motion-happylucky': "Dances/Happy_Lucky_01_01.keys",
    'motion-headbanger': "Dances/Headbanger_01_01.keys",
    'motion-headdipper': "Dances/Headdipper_01_01.keys",
    'motion-pigeon': "Dances/Pigeon_01_01.keys",
};

class MC {
    init() {
        this.setupROS();
        this.setupSubscribers();
        this.setupButtonHighlighting();
    }

    setupROS() {
        this.ros = new ROSLIB.Ros({
            url: ROSBRIDGE_ADDRESS
        });

        this.ros.on('connection', () => {
            console.log('Connected to websocket server.');
        });

        this.ros.on('error', (error) => {
            console.log('Error connecting to websocket server: ', error);
        });

        this.ros.on('close', () => {
            console.log('Connection to websocket server closed.');
        });
    }

    setupSubscribers() {
        var listener = new ROSLIB.Topic({
            ros: this.ros,
            name: '/jibo_state',
            messageType: 'jibo_msgs/JiboState'
        });

        listener.subscribe((message) => {
            let jibostate_div = document.querySelector('#jibostate');
            if (!jibostate_div) {
                return;
            }

            last_state = message;
            last_state_cycle = last_state_cycle ? last_state_cycle + 1 : 1;

            let elements = Object.keys(message).map(key => {
                let element = document.createElement('div');
                element.textContent = `${key}: ${message[key]}`;
                return element;
            });
            let cycleElement = document.createElement('div');
            cycleElement.textContent = `${last_state_cycle}`;
            elements.push(cycleElement);

            jibostate_div.replaceChildren(...elements);
        });
    }

    setupButtonHighlighting() {
        const buttonsContainer = document.querySelector('#buttons-container');

        if (!buttonsContainer) {
            console.error('Buttons container not found');
            return;
        }

        Object.keys(DANCE_MOVES).forEach(danceKey => {
            let button = document.createElement('button');
            button.textContent = danceKey.replace('motion-', '').toUpperCase();
            button.addEventListener('click', () => this.handleButtonClick(button, danceKey));
            buttonsContainer.appendChild(button);
        });
    }

    handleButtonClick(button, danceKey) {
        this.resetButtonColors();
        button.style.backgroundColor = 'blue'; // Highlight clicked button
        this.dance(danceKey);
        this.speak(`Let's dance the ${button.textContent.toLowerCase()}!`);
    }

    resetButtonColors() {
        document.querySelectorAll('#buttons-container button').forEach(button => {
            button.style.backgroundColor = '';
        });
    }

    async dance(danceKey) {
        if (!danceKey) {
            console.error('must provide dance key');
            return;
        }

        const motionText = DANCE_MOVES[danceKey];
        if (!motionText) {
            console.error('unknown dance_key', danceKey);
            return;
        }

        await this.waitUntilNotDancing();
        console.log(`dancing "${motionText}"`);

        var jiboAction = new ROSLIB.Topic({
            ros: this.ros,
            name: '/jibo',
            messageType: '/jibo_msgs/JiboAction'
        });

        var dance = new ROSLIB.Message({
            do_motion: true,
            motion_text: motionText,
        });

        jiboAction.publish(dance);
        console.log('danced?');

        await this.waitUntilDancing();
        await this.waitUntilNotDancing();
    }

    speak(text) {
        console.log('Speaking:', text);
        // Add the logic here to send the speech request to Jibo or ROS.
    }

    async waitUntilDancing() {
        return new Promise((resolve) => {
            if (!last_state || last_state.is_dancing) {
                resolve();
            } else {
                console.log('waiting for dance to start...');
                let checkAgain = () => {
                    if (last_state.is_dancing) {
                        resolve();
                    } else {
                        setTimeout(checkAgain, 50);
                    }
                };
                checkAgain();
            }
        });
    }

    async waitUntilNotDancing() {
        return new Promise((resolve) => {
            if (!last_state || !last_state.is_dancing) {
                resolve();
            } else {
                console.log('waiting for dance to finish...');
                let checkAgain = () => {
                    if (!last_state.is_dancing) {
                        resolve();
                    } else {
                        setTimeout(checkAgain, 50);
                    }
                };
                checkAgain();
            }
        });
    }
}

const mc = new MC();
mc.init();

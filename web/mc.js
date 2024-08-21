'use strict';

// paste your rosbridge codespace port url into the next line replacing the example one
// be sure to edit the https:// and change it to wss://
//const ROSBRIDGE_ADDRESS = 'wss://fuzzy-cod-w6q94xgqv255gr-9090.app.github.dev/';
const ROSBRIDGE_ADDRESS = 'ws://10.99.0.1:9090/';

let last_state;
let last_state_cycle;
let last_state_timestamp;

const POSITIONS = {
    1: { x: 0, y: 3, z: 0.5 },
    2: { x: 3, y: 0, z: 0.9 },
};

const SPEECHES = {
    'emoji': "and the <anim cat='emoji' filter='!(hf), &(lightbulb)' nonBlocking='true' />other luminaries who have",
    'dance': "unlimited internet <es name='shift_13' endNaturnal='true' nonBlocking='true' /> data plan, and who likes to spend time with my friends, <break size='0.2' />and dance. <es name='shift_20' endNaturnal='true' />. But that doesn't mean I am not interested in STEM.",
    'hello': "hello linh and isabella",
};

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
        // Connecting to ROS

        this.ros = new ROSLIB.Ros({
            url : ROSBRIDGE_ADDRESS
        });

        this.ros.on('connection', function() {
            console.log('Connected to websocket server.');
        });

        this.ros.on('error', function(error) {
            console.log('Error connecting to websocket server: ', error);
        });

        this.ros.on('close', function() {
            console.log('Connection to websocket server closed.');
        });
    }


    setupSubscribers() {
        // Subscribing to a Topic

        //var listener = new ROSLIB.Topic({
        //    ros : this.ros,
        //    name : '/listener',
        //    messageType : 'std_msgs/String'
        //});
        var listener = new ROSLIB.Topic({
            ros : this.ros,
            name : '/jibo_state',
            messageType : 'jibo_msgs/JiboState'
        });

        listener.subscribe(function(message) {
            let jibostate_div = document.querySelector('#jibostate');
            if (!jibostate_div) {
                return;
            }

            last_state = message;
            if (last_state_cycle) {
                last_state_cycle++;
            } else {
                last_state_cycle = 1;
            }

            let elements = [];
            for (let key of Object.keys(message)) {
                let element = document.createElement('div');
                element.textContent = `${key}: ${message[key]}`;
                elements.push(element);
            }
            let element = document.createElement('div');
            element.textContent = `${last_state_cycle}`;
            elements.push(element);
            jibostate_div.replaceChildren(...elements);
        });
    }


    setupPublishers() {
        // Publishing a Topic

        var cmdVel = new ROSLIB.Topic({
            ros : this.ros,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
        });

        var twist = new ROSLIB.Message({
            linear : {
                x : 0.1,
                y : 0.2,
                z : 0.3
            },
            angular : {
                x : -0.1,
                y : -0.2,
                z : -0.3
            }
        });
        cmdVel.publish(twist);
    }


    async waitUntilSpeaking() {
        return new Promise( (resolve) => {
            if (!last_state || last_state.is_playing_sound) {
                resolve();
            } else {
                console.log('waiting for speech to start...');
                let checkAgain = () => {
                    if (last_state.is_playing_sound) {
                        resolve();
                    } else {
                        setTimeout(checkAgain, 50);
                    }
                };
                checkAgain();
            }
        });
    }


    async waitUntilNotSpeaking() {
        return new Promise( (resolve) => {
            if (!last_state || !last_state.is_playing_sound) {
                resolve();
            } else {
                console.log('waiting for speech to finish...');
                let checkAgain = () => {
                    if (!last_state.is_playing_sound) {
                        resolve();
                    } else {
                        setTimeout(checkAgain, 50);
                    }
                };
                checkAgain();
            }
        });
    }


    callService() {
        // Calling a service

        var addTwoIntsClient = new ROSLIB.Service({
            ros : this.ros,
            name : '/add_two_ints',
            serviceType : 'rospy_tutorials/AddTwoInts'
        });

        var request = new ROSLIB.ServiceRequest({
            a : 1,
            b : 2
        });

        addTwoIntsClient.callService(request, function(result) {
            console.log('Result for service call on '
                        + addTwoIntsClient.name
                        + ': '
                        + result.sum);
        });
    }


    manipulateParams() {
        // Getting and setting a param value

        this.ros.getParams(function(params) {
            console.log(params);
        });

        var maxVelX = new ROSLIB.Param({
            ros : this.ros,
            name : 'max_vel_y'
        });

        maxVelX.set(0.8);
        maxVelX.get(function(value) {
            console.log('MAX VAL: ' + value);
        });
    }


    enter_rosbridge() {
        console.log('entering rosbridge');
        var jiboAction = new ROSLIB.Topic({
            ros : this.ros,
            name : '/jibo_remote',
            messageType : '/jibo_msgs/JiboRemote'
        });

        var enter = new ROSLIB.Message({
            do_enter_rosbridge_skill: true,
        });

        jiboAction.publish(enter);
        console.log('entered?');
    }


    exit_rosbridge() {
        console.log('exiting rosbridge');
        var jiboAction = new ROSLIB.Topic({
            ros : this.ros,
            name : '/jibo_remote',
            messageType : '/jibo_msgs/JiboRemote'
        });

        var exit = new ROSLIB.Message({
            do_exit_rosbridge_skill: true,
        });

        jiboAction.publish(exit);
        console.log('exited?');
    }


    async speech(speech_key, embodied_text) {
        if ((!speech_key && !embodied_text) || (speech_key && embodied_text)) {
            console.error('must provide embodied text or speech key');
            return;
        }

        if (speech_key && !embodied_text) {
            embodied_text = SPEECHES[speech_key];
            if (!embodied_text) {
                console.error('unknown speech_key', speech_key);
                return;
            } else {
                console.log('speaking key', speech_key);
            }
        }

        embodied_text = `<duration stretch="1.11">${embodied_text}</duration>`;
        await this.waitUntilNotSpeaking();
        console.log(`speaking "${embodied_text}"`);
        var jiboAction = new ROSLIB.Topic({
            ros : this.ros,
            name : '/jibo',
            messageType : '/jibo_msgs/JiboAction'
        });

        var speak = new ROSLIB.Message({
            do_tts: true,
            tts_text: embodied_text,
        });

        jiboAction.publish(speak);
        console.log('spoke?');

        await this.waitUntilSpeaking();
        await this.waitUntilNotSpeaking();
        if (speech_key && speech_key !== 'backto') {
            this.position(1);
        }
    }


    play(name) {
        console.log('posture');
        //let embodied_text = `<es name='${name}' layers='!screen' endNaturnal='true' nonBlocking='true' />um`
        let embodied_text = `<es name='${name}' endNaturnal='true' nonBlocking='true' />.`;
        this.speech(undefined, embodied_text);
    }


    position(position_num) {
        let target_position;
        if (target_position = POSITIONS[position_num]) {
            console.log('moving to position', position_num);
            var jiboAction = new ROSLIB.Topic({
                ros : this.ros,
                name : '/jibo',
                messageType : '/jibo_msgs/JiboAction'
            });

            var lookat = new ROSLIB.Message({
                do_lookat: true,
                lookat: target_position,
            });

            jiboAction.publish(lookat);
            console.log('moved?');
        } else {
            console.error('undefined position num', position_num);
        }
    }


    setupButtonHighlighting() {
        document.addEventListener('click', (event) => {
            //console.log(event);
            //console.log(event.target);
            if (event.target instanceof HTMLButtonElement) {
                console.log('button click!');
                //target.style = "border: 20px solid lightgreen";
                event.target.style = 'background-color: lightgreen';
            }
        });
    }
}


window.MC = MC;

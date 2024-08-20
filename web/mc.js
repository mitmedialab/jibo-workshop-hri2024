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

    async dance(dance_key) {
        if (!dance_key) {
            console.error('must provide dance key');
            return;
        }

        const motion_text = DANCE_MOVES[dance_key];
        if (!motion_text) {
            console.error('unknown dance_key', dance_key);
            return;
        }

        await this.waitUntilNotDancing();
        console.log(`dancing "${motion_text}"`);
        var jiboAction = new ROSLIB.Topic({
            ros : this.ros,
            name : '/jibo',
            messageType : '/jibo_msgs/JiboAction'
        });

        var dance = new ROSLIB.Message({
            do_motion: true,
            motion_text: motion_text,
        });

        jiboAction.publish(dance);
        console.log('danced?');

        await this.waitUntilDancing();
        await this.waitUntilNotDancing();
    }
}

const mc = new MC();
mc.init();

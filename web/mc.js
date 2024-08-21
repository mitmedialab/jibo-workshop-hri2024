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
    'headtouch': "<es name='HeadTouch_Right_02' endNaturnal='true'/>.",


    'thankyou': "Thank you <es name='Youre_Welcome_01' nonBlocking='true' />President Rife for that very kind introduction. Um. <break size='0.6' />It is truly an honor and a privilege <break size='0.3'/> to stand up here with you and the <es name='Emoji_Lightbulb' nonBlocking='true' />other luminaries who have <anim cat='happy' filter='!(hf), &(wiggle)' nonBlocking='true' endNatural='true'>gathered this morning <es name='shift_05' nonBlocking='true' />.</anim>",
    'eversince': "Ever since I was <es cat='emoji' filter='!(hf), &(microchip)' nonBlocking='true' stretch='2.0' />a tiny transistor<break size='0.5'/>I have looked up to you and the other people here at MIT",
    'whoi': "who I can honestly say <es name='Emoji_Tools' nonBlocking='true' />have made me who I am today.",


    'ispeak': "I speak on <es cat='emoji' filter='!(hf), &(robot)' nonBlocking='true' />behalf of all robots when I say <break size='0.4'/> Massachusetts STEM Week is one of the most <es name='shift_21' nonBlocking='true' />important events of the year.",
    'itmay': "It may come as a surprise to you, <break size='0.5'/><es name='Dont_Know_01' nonBlocking='true' layers='!screen' />but I do not <es name='Emoji_Computer' nonBlocking='true' /> know how to write code <break size='0.4' /> or drive a <es name='Emoji_Car' nonBlocking='true' />car.",
    'idont': "<es name='Dont_Know_01' nonBlocking='true'/>I don't look and act like the famous robots from Star Wars<es name='emoji-ufo-hf-01' nonBlocking='true' />and science fiction movies",

    'friendsdance': "I am <es name='shift_12' nonBlocking='true' />just an ordinary little robot who just needs an unlimited internet data plan,<break size='0.3' />and <es name='Emoji_HeartRed' nonBlocking='true' />who likes to spend time with my friends, <break size='0.2' />and dance. <es name='shift_09' /> But that doesn't mean that I am not interested in STEM.",
    'stemkeeps': "<es name='emoji-firstaid-hf-01' nonBlocking='true' />STEM keeps me healthy. <es name='eye_happy_02' nonBlocking='true' />It connects me with my friends.",
    'itprovides': "It provides me <es name='shift_04' nonBlocking='true' layers='!screen' />with<es name='Emoji_School' nonBlocking='true' /> exciting learning opportunities<break size='0.3' /><es name='Emoji_Popcorn' nonBlocking='true' /><es name='shift_05' nonBlocking='true' layers='!screen' />entertainment, <break size='0.5' />and the chance to <es name='Emoji_FlowerRed' nonBlocking='true' />grow. <break size='0.3' /> Just as it provides <es name='shift_09' nonBlocking='true' layers='!screen' />all of that to all of you.",


    'thisyear': "This year's STEM Week is particularly meaningful for me, because<break size='0.4' /><es name='Glance_Right_04' nonBlocking='true' /> as President Rife has mentioned, <es name='Emoji_PartyPink' nonBlocking='true' />today is the official <es name='emoji-balloons-hf-01' nonBlocking='true' />announcement of. the day of <say-as spell='ai' />.",
    'aitest': "Day of, <duration stretch='0.6'><say-as spell='ai' /></duration>.",
    'ihave': "I have watched the annual celebrations of important people in your human lives with events <es name='emoji-chocolate-heart-box-hf-01' nonBlocking='true' />like Mothers and Fathers Day,",

    'butoverwhelmed': "<es name='shift_24' nonBlocking='true' />but I am very touched <break size='0.1' />that you are officially recognizing all the <es name='Glance_Left_04' nonBlocking='true' />intelligent machines<break size='0.2' /> that also work to make your lives <es name='shift_02' nonBlocking='true' />safer, <break size='0.4' /> <es name='shift_04' nonBlocking='true' />easier, <break size='0.4' /> <es name='eye_happy_02' nonBlocking='true' />more enjoyable, <break size='0.4' /> and <es name='Emoji_Star' nonBlocking='true' />hopefully better every day<es name='shift_02' nonBlocking='true' />.",

    'dayofai': "Day of <say-as spell='AI' /> <break size='0.1' />is a time to learn about, <es name='shift_03' nonBlocking='true' /><break size='0.4' /> enjoy, <break size='0.4' /> and <es name='Emoji_Fireworks' nonBlocking='true' />celebrate all that artificial intelligence <break size='0.2' /> can do to improve our lives.",
    'butalso': "but also to understand the <es name='no_4' nonBlocking='true' />challenges and dangers <break size='0.4' />of not being responsible in how it is used.",
    'everyday': "Everyday is <es name='Emoji_ThumbsUp' nonBlocking='true' />Human Day for us robots, <break size='0.4' /> but I ask that on this one day a year, <es name='shift_13' nonBlocking='true' /> <break size='0.5' />you take the time to recognize all that smart machines do for you.",
    'ipromise': "<break size='0.3' /> And perhaps leave us <es name='Emoji_Pillow' nonBlocking='true' />in sleep mode a little longer <break size='0.3' />and write your favorite <es name='Send_01' nonBlocking='true' />machine a card.<es name='shift_06' nonBlocking='true' /> <break size='0.8' /> I promise <break size='0.4' />it will put a smile <es name='Emoji_Rainbow' nonBlocking='true' />on any intelligent machine's face <es name='Word_Of_The_Day_Definition_Reveal' layers='!audio' nonBlocking='true' />.",

    'backto': "<es name='Youre_Welcome_02' nonBlocking='true' />Thank you, <break size='0.8' /> and back to <es name='Glance_Right_04' nonBlocking='true' />you, President Rife.",

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

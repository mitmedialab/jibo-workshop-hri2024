import rclpy
from rclpy.node import Node
import time
import threading

from std_msgs.msg import String
from std_msgs.msg import Header # standard ROS msg header

from jibo_msgs.msg import JiboAction # ROS msgs
from jibo_msgs.msg import JiboVec3 # ROS msgs   
from jibo_msgs.msg import JiboState # ROS msgs   
from jibo_msgs.msg import JiboAsrCommand
from jibo_msgs.msg import JiboAsrResult


class JiboTeleop(Node):

    def __init__(self):
        super().__init__('teleop_connection')

        self.jibo_pub = self.create_publisher(JiboAction, 'jibo', 10)
        self.jibo_state = self.create_subscription(JiboState, 'jibo_state', self.on_jibo_state_msg, 10)
        self.jibo_state
        
        self.jibo_asr_result = self.create_subscription(JiboAsrResult, 'jibo_asr_result', self.on_jibo_asr_results, 10)
        self.jibo_asr_result
        self.jibo_asr_command = self.create_publisher(JiboAsrCommand, 'jibo_asr_command', 10)

        self.reset_msgs()
        self.reset_asr_msgs()

        self.rate = self.create_rate(10)

    def on_jibo_state_msg(self, msg):
        # self.get_logger().info('I heard: "%s"' % str(msg))
        self.jibo_tts = msg.tts_msg
        self.doing_motion = msg.doing_motion
        self.is_playing_sound = msg.is_playing_sound
        self.is_listening = msg.is_listening

    def on_jibo_asr_results(self, data):
        self.get_logger().info('I heard: "%s"' % str(data))
        self.asr_transcription = data.transcription
        self.asr_confidence = data.confidence
        self.asr_heuristic_score = data.heuristic_score
        self.asr_slotaction = data.slotaction


    def reset_msgs(self):
        self.jibo_tts = ''
        self.doing_motion = False
        self.is_playing_sound = False
        self.is_listening = False

    def reset_asr_msgs(self):
        self.asr_transcription = ''
        self.asr_slotaction = ''
        self.asr_confidence = 0.0
        self.asr_heuristic_score = 0.0

    def JiboListen(self, heyjibo=True, continuous=False, incremental=False, listentime=0):
        if listentime == 0:
            self.jibo_asr_command_builder(JiboAsrCommand.START, heyjibo, False, False)
        else:
            self.jibo_asr_command_builder(JiboAsrCommand.START, heyjibo, continuous, incremental)
            time.sleep(listentime)
            self.jibo_asr_command_builder(JiboAsrCommand.STOP, True, False, False)

    def jibo_asr_command_builder(self, command, heyjibo=True, continuous=False, incremental=False, rule=''): 
        msg = JiboAsrCommand()
        msg.header = Header()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.command = command
        msg.heyjibo = heyjibo
        msg.continuous = continuous
        msg.incremental = incremental
        msg.rule = rule
        self.jibo_asr_command.publish(msg)

    def send_attention_message(self, attention):
        """ Publish JiboAction do motion message """
        if self.jibo_pub is not None:
            print('sending attention message: %s' % attention)
            msg = JiboAction()
            msg.header = Header()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.do_attention_mode = True
            if attention == "OFF":
                msg.attention_mode = msg.ATTENTION_MODE_OFF
            else:
                msg.attention_mode = msg.ATTENTION_MODE_ON
            self.jibo_pub.publish(msg)
            self.get_logger().info(msg.do_attention_mode)

    def send_motion_message(self, motion):
        """ Publish JiboAction do motion message """
        if self.jibo_pub is not None:
            print('sending motion message: %s' % motion)
            msg = JiboAction()
            msg.header = Header()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.do_motion = True
            msg.motion = motion
            self.jibo_pub.publish(msg)
            self.get_logger().info(msg.motion)

    def send_lookat_message(self, x,y,z):
        """ Publish JiboAction lookat message """
        if self.jibo_pub is not None:
            print('sending lookat message: {},{},{}'.format(x,y,z))
            msg = JiboAction()
            msg.header = Header()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.do_lookat = True
            # msg.lookat = JiboVec3(x,y,z)
            lookat = JiboVec3()
            lookat.x=x
            lookat.y=y
            lookat.z=z
            msg.lookat = lookat
            self.jibo_pub.publish(msg)
            self.get_logger().info(str(msg))
    
    def send_sound_message(self, speech):
        """ Publish JiboAction playback audio message """
        if self.jibo_pub is not None:
            print('\nsending sound message: %s' % speech)
            msg = JiboAction()
            msg.header = Header()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.do_sound_playback = True
            msg.audio_filename = speech
            self.jibo_pub.publish(msg)
            self.get_logger().info(str(msg))

    def send_sound_motion_message(self, speech, motion):
        """ Publish JiboAction playback audio and motion message """
        if self.jibo_pub is not None:
            print('\nsending sound and motion message: %s' % speech)
            msg = JiboAction()
            msg.header = Header()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.do_sound_playback = True
            msg.do_motion = True
            msg.audio_filename = speech
            msg.motion = motion
            self.jibo_pub.publish(msg)
            self.get_logger().info(str(msg))

    def send_tts_message(self, speech):
        """ Publish JiboAction playback TTS message """
        if self.jibo_pub is not None:
            print('\nsending speech message: %s' % speech)
            msg = JiboAction()
            msg.header = Header()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.do_tts = True
            msg.tts_text = speech
            msg.do_volume = True
            msg.volume = 1.0
            self.jibo_pub.publish(msg)
            self.get_logger().info(str(msg))


    def send_volume_message(self, volume):
        """ Publish JiboAction message setting the percent volume to use. """
        if self.jibo_pub is not None:
            print('\nsending volume message: %s' % volume)
            msg = JiboAction()
            msg.header = Header()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.do_volume = True
            msg.volume = volume
            self.jibo_pub.publish(msg)
            self.get_logger().info(str(msg))

    def send_anim_transition_message(self, anim_transition):
        """ Publish JiboAction message that switches between animation playback modes. """
        if self.jibo_pub is not None:
            print('\nsending anim transition message: %s' % anim_transition)
            msg = JiboAction()
            msg.header = Header()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.do_attention_mode = True
            msg.attention_mode = msg.ATTENTION_MODE_OFF
            msg.do_anim_transition = True
            msg.anim_transition = anim_transition
            self.jibo_pub.publish(msg)
            self.get_logger().info(str(msg))

    def send_led_message(self, red_val, green_val, blue_val):
        """ Publish JiboAction message that switches between animation playback modes. """
        if self.jibo_pub is not None:
            print('\nsending rgb_val message: %s' % str(red_val) + ',' + str(green_val) + ',' + str(blue_val))
            msg = JiboAction()
            msg.header = Header()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.do_led = True
            led_color = JiboVec3()
            led_color.x=red_val
            led_color.y=green_val
            led_color.z=blue_val
            msg.led_color = led_color
            self.jibo_pub.publish(msg)
            self.get_logger().info(str(msg))

    def waitforJibo(self):
        while self.is_playing_sound or self.is_listening or self.doing_motion:
            print('Jibo still doing something')
            self.rate.sleep()


def main(args=None):
    rclpy.init(args=args)

    teleop_connection = JiboTeleop()
    # Spin in a separate thread
    thread = threading.Thread(target=rclpy.spin, args=(teleop_connection, ), daemon=True)
    thread.start()

    while rclpy.ok():
        jibo_promts = 'Hi there, i am Jibo. Would you like to play with me?'
        teleop_connection.send_tts_message(str(jibo_promts))
        time.sleep(2.0)
        teleop_connection.waitforJibo()

        teleop_connection.send_motion_message('Dances/Celebrate_01.keys')
        time.sleep(2.0)
        teleop_connection.waitforJibo()


        teleop_connection.send_sound_message('excited1-jibo-old1.wav')
        time.sleep(2.0)
        teleop_connection.waitforJibo()

        # Change LED color RGB
        teleop_connection.send_led_message(0.7,0.0,0.0)
        time.sleep(2)
        teleop_connection.send_led_message(0.0,0.0,0.0)
        
        # Change Jibo body position X, Y, Z axis
        teleop_connection.send_lookat_message(0.9,0.0,0.0)
        time.sleep(2)
        teleop_connection.send_lookat_message(0.0,0.9,0.0)
        time.sleep(2)
        teleop_connection.send_lookat_message(0.0,0.0,0.9)

        teleop_connection.JiboListen()
        time.sleep(2)
        teleop_connection.waitforJibo()

        jibo_promts = 'Did you say: '+ teleop_connection.asr_transcription
        teleop_connection.send_tts_message(str(jibo_promts))
        time.sleep(2.2)
        teleop_connection.waitforJibo()
        teleop_connection.rate.sleep()
        
        time.sleep(2)

    teleop_connection.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
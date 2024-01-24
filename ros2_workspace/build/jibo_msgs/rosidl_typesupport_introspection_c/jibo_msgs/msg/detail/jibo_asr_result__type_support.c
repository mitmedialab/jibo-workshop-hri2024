// generated from rosidl_typesupport_introspection_c/resource/idl__type_support.c.em
// with input from jibo_msgs:msg/JiboAsrResult.idl
// generated code does not contain a copyright notice

#include <stddef.h>
#include "jibo_msgs/msg/detail/jibo_asr_result__rosidl_typesupport_introspection_c.h"
#include "jibo_msgs/msg/rosidl_typesupport_introspection_c__visibility_control.h"
#include "rosidl_typesupport_introspection_c/field_types.h"
#include "rosidl_typesupport_introspection_c/identifier.h"
#include "rosidl_typesupport_introspection_c/message_introspection.h"
#include "jibo_msgs/msg/detail/jibo_asr_result__functions.h"
#include "jibo_msgs/msg/detail/jibo_asr_result__struct.h"


// Include directives for member types
// Member `header`
#include "std_msgs/msg/header.h"
// Member `header`
#include "std_msgs/msg/detail/header__rosidl_typesupport_introspection_c.h"
// Member `transcription`
// Member `slotaction`
#include "rosidl_runtime_c/string_functions.h"

#ifdef __cplusplus
extern "C"
{
#endif

void jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_init_function(
  void * message_memory, enum rosidl_runtime_c__message_initialization _init)
{
  // TODO(karsten1987): initializers are not yet implemented for typesupport c
  // see https://github.com/ros2/ros2/issues/397
  (void) _init;
  jibo_msgs__msg__JiboAsrResult__init(message_memory);
}

void jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_fini_function(void * message_memory)
{
  jibo_msgs__msg__JiboAsrResult__fini(message_memory);
}

static rosidl_typesupport_introspection_c__MessageMember jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_message_member_array[6] = {
  {
    "header",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    NULL,  // members of sub message (initialized later)
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(jibo_msgs__msg__JiboAsrResult, header),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "transcription",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_STRING,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(jibo_msgs__msg__JiboAsrResult, transcription),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "heyjibo",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_BOOLEAN,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(jibo_msgs__msg__JiboAsrResult, heyjibo),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "confidence",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_DOUBLE,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(jibo_msgs__msg__JiboAsrResult, confidence),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "heuristic_score",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_DOUBLE,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(jibo_msgs__msg__JiboAsrResult, heuristic_score),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "slotaction",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_STRING,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(jibo_msgs__msg__JiboAsrResult, slotaction),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  }
};

static const rosidl_typesupport_introspection_c__MessageMembers jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_message_members = {
  "jibo_msgs__msg",  // message namespace
  "JiboAsrResult",  // message name
  6,  // number of fields
  sizeof(jibo_msgs__msg__JiboAsrResult),
  jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_message_member_array,  // message members
  jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_init_function,  // function to initialize message memory (memory has to be allocated)
  jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_fini_function  // function to terminate message instance (will not free memory)
};

// this is not const since it must be initialized on first access
// since C does not allow non-integral compile-time constants
static rosidl_message_type_support_t jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_message_type_support_handle = {
  0,
  &jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_message_members,
  get_message_typesupport_handle_function,
  &jibo_msgs__msg__JiboAsrResult__get_type_hash,
  &jibo_msgs__msg__JiboAsrResult__get_type_description,
  &jibo_msgs__msg__JiboAsrResult__get_type_description_sources,
};

ROSIDL_TYPESUPPORT_INTROSPECTION_C_EXPORT_jibo_msgs
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, jibo_msgs, msg, JiboAsrResult)() {
  jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_message_member_array[0].members_ =
    ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, std_msgs, msg, Header)();
  if (!jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_message_type_support_handle.typesupport_identifier) {
    jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_message_type_support_handle.typesupport_identifier =
      rosidl_typesupport_introspection_c__identifier;
  }
  return &jibo_msgs__msg__JiboAsrResult__rosidl_typesupport_introspection_c__JiboAsrResult_message_type_support_handle;
}
#ifdef __cplusplus
}
#endif

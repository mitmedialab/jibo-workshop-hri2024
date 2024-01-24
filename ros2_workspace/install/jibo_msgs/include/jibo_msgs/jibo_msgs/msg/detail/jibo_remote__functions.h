// generated from rosidl_generator_c/resource/idl__functions.h.em
// with input from jibo_msgs:msg/JiboRemote.idl
// generated code does not contain a copyright notice

#ifndef JIBO_MSGS__MSG__DETAIL__JIBO_REMOTE__FUNCTIONS_H_
#define JIBO_MSGS__MSG__DETAIL__JIBO_REMOTE__FUNCTIONS_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stdlib.h>

#include "rosidl_runtime_c/action_type_support_struct.h"
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "rosidl_runtime_c/service_type_support_struct.h"
#include "rosidl_runtime_c/type_description/type_description__struct.h"
#include "rosidl_runtime_c/type_description/type_source__struct.h"
#include "rosidl_runtime_c/type_hash.h"
#include "rosidl_runtime_c/visibility_control.h"
#include "jibo_msgs/msg/rosidl_generator_c__visibility_control.h"

#include "jibo_msgs/msg/detail/jibo_remote__struct.h"

/// Initialize msg/JiboRemote message.
/**
 * If the init function is called twice for the same message without
 * calling fini inbetween previously allocated memory will be leaked.
 * \param[in,out] msg The previously allocated message pointer.
 * Fields without a default value will not be initialized by this function.
 * You might want to call memset(msg, 0, sizeof(
 * jibo_msgs__msg__JiboRemote
 * )) before or use
 * jibo_msgs__msg__JiboRemote__create()
 * to allocate and initialize the message.
 * \return true if initialization was successful, otherwise false
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
bool
jibo_msgs__msg__JiboRemote__init(jibo_msgs__msg__JiboRemote * msg);

/// Finalize msg/JiboRemote message.
/**
 * \param[in,out] msg The allocated message pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
void
jibo_msgs__msg__JiboRemote__fini(jibo_msgs__msg__JiboRemote * msg);

/// Create msg/JiboRemote message.
/**
 * It allocates the memory for the message, sets the memory to zero, and
 * calls
 * jibo_msgs__msg__JiboRemote__init().
 * \return The pointer to the initialized message if successful,
 * otherwise NULL
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
jibo_msgs__msg__JiboRemote *
jibo_msgs__msg__JiboRemote__create();

/// Destroy msg/JiboRemote message.
/**
 * It calls
 * jibo_msgs__msg__JiboRemote__fini()
 * and frees the memory of the message.
 * \param[in,out] msg The allocated message pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
void
jibo_msgs__msg__JiboRemote__destroy(jibo_msgs__msg__JiboRemote * msg);

/// Check for msg/JiboRemote message equality.
/**
 * \param[in] lhs The message on the left hand size of the equality operator.
 * \param[in] rhs The message on the right hand size of the equality operator.
 * \return true if messages are equal, otherwise false.
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
bool
jibo_msgs__msg__JiboRemote__are_equal(const jibo_msgs__msg__JiboRemote * lhs, const jibo_msgs__msg__JiboRemote * rhs);

/// Copy a msg/JiboRemote message.
/**
 * This functions performs a deep copy, as opposed to the shallow copy that
 * plain assignment yields.
 *
 * \param[in] input The source message pointer.
 * \param[out] output The target message pointer, which must
 *   have been initialized before calling this function.
 * \return true if successful, or false if either pointer is null
 *   or memory allocation fails.
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
bool
jibo_msgs__msg__JiboRemote__copy(
  const jibo_msgs__msg__JiboRemote * input,
  jibo_msgs__msg__JiboRemote * output);

/// Retrieve pointer to the hash of the description of this type.
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
const rosidl_type_hash_t *
jibo_msgs__msg__JiboRemote__get_type_hash(
  const rosidl_message_type_support_t * type_support);

/// Retrieve pointer to the description of this type.
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
const rosidl_runtime_c__type_description__TypeDescription *
jibo_msgs__msg__JiboRemote__get_type_description(
  const rosidl_message_type_support_t * type_support);

/// Retrieve pointer to the single raw source text that defined this type.
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
const rosidl_runtime_c__type_description__TypeSource *
jibo_msgs__msg__JiboRemote__get_individual_type_description_source(
  const rosidl_message_type_support_t * type_support);

/// Retrieve pointer to the recursive raw sources that defined the description of this type.
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
const rosidl_runtime_c__type_description__TypeSource__Sequence *
jibo_msgs__msg__JiboRemote__get_type_description_sources(
  const rosidl_message_type_support_t * type_support);

/// Initialize array of msg/JiboRemote messages.
/**
 * It allocates the memory for the number of elements and calls
 * jibo_msgs__msg__JiboRemote__init()
 * for each element of the array.
 * \param[in,out] array The allocated array pointer.
 * \param[in] size The size / capacity of the array.
 * \return true if initialization was successful, otherwise false
 * If the array pointer is valid and the size is zero it is guaranteed
 # to return true.
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
bool
jibo_msgs__msg__JiboRemote__Sequence__init(jibo_msgs__msg__JiboRemote__Sequence * array, size_t size);

/// Finalize array of msg/JiboRemote messages.
/**
 * It calls
 * jibo_msgs__msg__JiboRemote__fini()
 * for each element of the array and frees the memory for the number of
 * elements.
 * \param[in,out] array The initialized array pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
void
jibo_msgs__msg__JiboRemote__Sequence__fini(jibo_msgs__msg__JiboRemote__Sequence * array);

/// Create array of msg/JiboRemote messages.
/**
 * It allocates the memory for the array and calls
 * jibo_msgs__msg__JiboRemote__Sequence__init().
 * \param[in] size The size / capacity of the array.
 * \return The pointer to the initialized array if successful, otherwise NULL
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
jibo_msgs__msg__JiboRemote__Sequence *
jibo_msgs__msg__JiboRemote__Sequence__create(size_t size);

/// Destroy array of msg/JiboRemote messages.
/**
 * It calls
 * jibo_msgs__msg__JiboRemote__Sequence__fini()
 * on the array,
 * and frees the memory of the array.
 * \param[in,out] array The initialized array pointer.
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
void
jibo_msgs__msg__JiboRemote__Sequence__destroy(jibo_msgs__msg__JiboRemote__Sequence * array);

/// Check for msg/JiboRemote message array equality.
/**
 * \param[in] lhs The message array on the left hand size of the equality operator.
 * \param[in] rhs The message array on the right hand size of the equality operator.
 * \return true if message arrays are equal in size and content, otherwise false.
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
bool
jibo_msgs__msg__JiboRemote__Sequence__are_equal(const jibo_msgs__msg__JiboRemote__Sequence * lhs, const jibo_msgs__msg__JiboRemote__Sequence * rhs);

/// Copy an array of msg/JiboRemote messages.
/**
 * This functions performs a deep copy, as opposed to the shallow copy that
 * plain assignment yields.
 *
 * \param[in] input The source array pointer.
 * \param[out] output The target array pointer, which must
 *   have been initialized before calling this function.
 * \return true if successful, or false if either pointer
 *   is null or memory allocation fails.
 */
ROSIDL_GENERATOR_C_PUBLIC_jibo_msgs
bool
jibo_msgs__msg__JiboRemote__Sequence__copy(
  const jibo_msgs__msg__JiboRemote__Sequence * input,
  jibo_msgs__msg__JiboRemote__Sequence * output);

#ifdef __cplusplus
}
#endif

#endif  // JIBO_MSGS__MSG__DETAIL__JIBO_REMOTE__FUNCTIONS_H_

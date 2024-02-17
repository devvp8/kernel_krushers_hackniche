import psutil
import time


def measure_usage(func, *args, **kwargs):
    """Measures memory and CPU usage of a function call.

    Args:
        func: The function to measure.
        *args: Arguments to pass to the function.
        **kwargs: Keyword arguments to pass to the function.

    Returns:
        A dictionary with the following keys:
            memory_peak: Peak memory usage in bytes.
            cpu_percent: Average CPU usage as a percentage during the function call.
            execution_time: Execution time in seconds.
    """

    try:
        # Get initial memory usage
        initial_memory = psutil.Process().memory_info().rss

        # Measure execution time
        start_time = time.time()
        result = func(*args, **kwargs)
        execution_time = time.time() - start_time

        # Get peak memory usage after function call
        peak_memory = psutil.Process().memory_info().rss - initial_memory

        # Get average CPU usage during execution
        cpu_time = (
            psutil.Process().cpu_times().system + psutil.Process().cpu_times().user
        )
        cpu_percent = cpu_time / execution_time * 100

        return {
            "memory_peak": peak_memory,
            "cpu_percent": cpu_percent,
            "execution_time": execution_time,
        }

    except Exception as e:
        print(f"Error during measurement: {e}")
        return None


def is_anagram(str1, str2, **kwargs):
    # Check if the lengths of the strings are equal
    if len(str1) != len(str2):
        return False

    # Create a dictionary to store the count of each character in the first string
    char_count1 = {}
    for char in str1:
        if char not in char_count1:
            char_count1[char] = 0
        char_count1[char] += 1

    # Create a dictionary to store the count of each character in the second string
    char_count2 = {}
    for char in str2:
        if char not in char_count2:
            char_count2[char] = 0
        char_count2[char] += 1

    # Check if the two dictionaries have the same keys and values
    return char_count1 == char_count2

print(is_anagram('listen','silent'))
results = measure_usage(is_anagram, "listen", "silent")
print(results)
if results:
    print(f"Memory peak: {results['memory_peak']} bytes")
    print(f"CPU usage: {results['cpu_percent']:.2f}%")
    print(f"Execution time: {results['execution_time']:.4f} seconds")
else:
    print("Measurement failed.")

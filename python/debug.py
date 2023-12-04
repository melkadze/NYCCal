# Imports
import sys # to send printout to Node
import platform # for platform (OS and host) information
import socket # for network (hostname) information

# Print header
print("ENVIRONMENT DEBUG INFORMATION")


# Print Host CPU information
print("\nHost CPU:")

arch = platform.architecture()[0]
archname = arch[0]

print(" - Architecture: ", arch)
print(" - Machine: ", platform.machine())
print(" - Processor: ", platform.processor())


# Print Host OS information
print("\nHost Operating System:")

os = platform.system()
# other platform texts are Windows and Linux which are
# self explanatory, so only edit Darwin to be macOS
if os == "Darwin":
	os = "macOS"

print(" - System: ", os)
print(" - Platform: ", platform.platform())

uname = platform.uname()
kernel = uname.version

print(" - Kernel: ", kernel)


# Print Network information
print("\nNetwork:")
print(" - Hostname: ", socket.gethostname())


# Print Python information
print("\nPython:")
print(" - Version: ", platform.python_version())


# Print parting message
print("\nHave a nice day!")


# Send everything we printed back to Node
sys.stdout.flush()

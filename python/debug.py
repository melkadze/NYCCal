import sys
import platform
import socket

print("ENVIRONMENT DEBUG INFORMATION")



print("\nHost CPU:")

arch = platform.architecture()[0]
archname = arch[0]

print(" - Architecture: ", arch)
print(" - Machine: ", platform.machine())
print(" - Processor: ", platform.processor())



print("\nHost Operating System:")

os = platform.system()
# other platform text is Windows and Linux which are
# self explanatory, so only edit Darwin to be macOS
if os == "Darwin":
	os = "macOS"

print(" - System: ", os)
print(" - Platform: ", platform.platform())

uname = platform.uname()
kernel = uname.version

print(" - Kernel: ", kernel)


print("\nNetwork:")
print(" - Hostname: ", socket.gethostname())



print("\nPython:")
print(" - Version: ", platform.python_version())



print("\nHave a nice day!")



# Send everything we printed back to Node
sys.stdout.flush()

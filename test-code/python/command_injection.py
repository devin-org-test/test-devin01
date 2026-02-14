import os
import subprocess
import sys


def ping_host_unsafe(hostname):
    os.system("ping -c 1 " + hostname)


def lookup_dns_unsafe(domain):
    result = subprocess.check_output("nslookup " + domain, shell=True)
    return result.decode()


def list_files_unsafe(directory):
    output = os.popen("ls -la " + directory).read()
    return output


if __name__ == "__main__":
    if len(sys.argv) > 1:
        ping_host_unsafe(sys.argv[1])

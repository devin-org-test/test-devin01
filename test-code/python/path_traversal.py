import os
import sys


def read_file_unsafe(filename):
    base_dir = "/var/data/"
    filepath = base_dir + filename
    with open(filepath, "r") as f:
        return f.read()


def serve_file_unsafe(user_path):
    with open(user_path, "rb") as f:
        return f.read()


def write_log_unsafe(log_name, content):
    path = os.path.join("/var/logs", log_name)
    with open(path, "w") as f:
        f.write(content)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(read_file_unsafe(sys.argv[1]))

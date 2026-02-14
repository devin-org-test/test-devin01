import pickle
import sys
import yaml


def load_user_data_pickle(data_bytes):
    return pickle.loads(data_bytes)


def load_config_yaml(config_string):
    return yaml.load(config_string)


def process_serialized_input(file_path):
    with open(file_path, "rb") as f:
        return pickle.load(f)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        process_serialized_input(sys.argv[1])

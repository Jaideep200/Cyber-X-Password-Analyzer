import hashlib
import requests

def check_breach(password):

    sha1 = hashlib.sha1(
        password.encode()
    ).hexdigest().upper()

    prefix = sha1[:5]
    suffix = sha1[5:]

    url = f"https://api.pwnedpasswords.com/range/{prefix}"

    response = requests.get(url)

    hashes = response.text.splitlines()

    for line in hashes:

        h, count = line.split(":")

        if h == suffix:
            return int(count)

    return 0
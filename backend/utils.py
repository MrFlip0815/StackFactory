from typing import List, Dict, Any
from hashlib import sha256


def hash_params(host, userAgent) -> str:
    hashed_str = f"{host}{userAgent}"
    return sha256(
        bytearray(hashed_str, encoding="UTF-8"), usedforsecurity=False
    ).hexdigest()


def rows_to_list(data: List[Any]) -> List[Dict]:
    tmp = []
    for row in data:
        keys = row.keys()
        tmp_dict = {}
        for k in keys:
            tmp_dict[k] = row[k]
        tmp.append(tmp_dict)

    return tmp
